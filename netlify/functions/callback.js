// Step 2 of the Decap CMS GitHub login.
//
// GitHub sends the visitor back here with a short-lived code. We swap it for an
// access token server-side, then hand the token to the CMS window using the
// handshake Decap expects: it posts "authorizing:github" to the popup, and the
// popup replies with "authorization:github:success:<json>".
//
// The token goes straight to the browser that started the login and is never
// logged or stored here.

const page = (status, payload) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font:14px system-ui;padding:2rem">
<p>${status === 'success' ? 'Signed in. You can close this window.' : 'Sign-in failed.'}</p>
<script>
(function () {
  var message = 'authorization:github:${status}:' + ${JSON.stringify(JSON.stringify(payload))};
  function reply(e) {
    if (!window.opener) return;
    window.opener.postMessage(message, e.origin);
  }
  window.addEventListener('message', reply, false);
  if (window.opener) window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`

const html = (status, payload, extraHeaders = {}) =>
  new Response(page(status, payload), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders },
  })

export default async (req) => {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  const cookie = req.headers.get('cookie') || ''
  const expected = /(?:^|;\s*)decap_oauth_state=([^;]+)/.exec(cookie)?.[1]
  // Clear the one-shot state cookie whatever happens next.
  const clear = { 'Set-Cookie': 'decap_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0' }

  if (!code) return html('error', { message: 'No code returned by GitHub.' }, clear)
  if (!state || !expected || state !== expected) {
    return html('error', { message: 'State mismatch — the login was not started here.' }, clear)
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_ID,
        client_secret: process.env.GITHUB_OAUTH_SECRET,
        code,
        redirect_uri: `${url.origin}/.netlify/functions/callback`,
      }),
    })
    const data = await res.json()
    if (!data.access_token) {
      return html('error', { message: data.error_description || 'GitHub did not return a token.' }, clear)
    }
    return html('success', { token: data.access_token, provider: 'github' }, clear)
  } catch {
    return html('error', { message: 'Could not reach GitHub to exchange the code.' }, clear)
  }
}
