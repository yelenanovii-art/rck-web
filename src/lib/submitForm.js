import { FORM_ENDPOINT, FORM_EXTRA } from '../config'

// Posts a form submission and returns { ok, configured }.
//
// Two delivery paths, picked automatically:
//
//   1. FORM_ENDPOINT set  → POST there (Formspree, Web3Forms, any JSON endpoint).
//   2. Otherwise          → Netlify Forms: POST back to the site itself with a
//                           `form-name` field matching one of the static form
//                           declarations in index.html. Netlify intercepts the
//                           POST at the edge and records the submission.
//
// Netlify Forms only exists on a deployed Netlify site — the plain Vite dev
// server has nothing to intercept the POST — so in dev we skip the request and
// report configured:false rather than reporting a failure that isn't real. Use
// `netlify dev` (or a deploy preview) to exercise the real path locally.
//
// `data` may be a plain object or a FormData instance; FormData is required
// when the form includes a file upload (the Outcome Circle CV field), because
// only multipart/form-data can carry the file.
export async function submitForm(data, { formName = 'rck-lead' } = {}) {
  const isMultipart = typeof FormData !== 'undefined' && data instanceof FormData

  if (FORM_ENDPOINT) {
    try {
      let body
      let headers
      if (isMultipart) {
        // Merge any extra fields, then let the browser set the multipart boundary.
        Object.entries(FORM_EXTRA).forEach(([k, v]) => data.append(k, v))
        body = data
        headers = { Accept: 'application/json' }
      } else {
        body = JSON.stringify({ ...FORM_EXTRA, ...data })
        headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      }
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers, body })
      return { ok: res.ok, configured: true }
    } catch {
      return { ok: false, configured: true }
    }
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[submitForm] Netlify Forms can't run on the Vite dev server — "${formName}" ` +
        'was NOT sent. Use `netlify dev` or a deploy preview to test delivery.'
    )
    return { ok: true, configured: false }
  }

  try {
    let body
    let headers
    if (isMultipart) {
      data.append('form-name', formName)
      Object.entries(FORM_EXTRA).forEach(([k, v]) => data.append(k, v))
      body = data
      headers = undefined // browser sets multipart boundary
    } else {
      // Netlify expects urlencoded for non-file forms, not JSON.
      body = new URLSearchParams({ 'form-name': formName, ...FORM_EXTRA, ...data }).toString()
      headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    const res = await fetch('/', { method: 'POST', headers, body })
    return { ok: res.ok, configured: true }
  } catch {
    return { ok: false, configured: true }
  }
}
