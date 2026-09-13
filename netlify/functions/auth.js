// Step 1 of the Decap CMS GitHub login.
//
// Decap opens this in a popup; we hand the visitor to GitHub's consent screen.
// The client secret never leaves the server — that is the whole reason this
// function exists rather than Decap talking to GitHub directly.
//
// Replaces Netlify Identity + Git Gateway, which Netlify is winding down. The
// repo's own GitHub -> Netlify build hook is untouched by any of this.
import { randomBytes } from 'node:crypto'

export default async (req) => {
  const clientId = process.env.GITHUB_OAUTH_ID
  if (!clientId) {
    return new Response('GITHUB_OAUTH_ID is not set on this site.', { status: 500 })
  }

  // Derived from the request, so this keeps working when the site moves to
  // www.rckpm.es without anyone remembering to edit a hard-coded URL.
  const origin = new URL(req.url).origin
  // CSRF guard: the callback only accepts a code accompanied by this value.
  const state = randomBytes(16).toString('hex')

  const authorize = new URL('https://github.com/login/oauth/authorize')
  authorize.searchParams.set('client_id', clientId)
  authorize.searchParams.set('redirect_uri', `${origin}/.netlify/functions/callback`)
  authorize.searchParams.set('scope', 'repo,user')
  authorize.searchParams.set('state', state)

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
      'Cache-Control': 'no-store',
    },
  })
}
