import { FORM_ENDPOINT, FORM_EXTRA } from '../config'

// Posts a form submission to the configured endpoint (Formspree, Web3Forms,
// or any URL that accepts a JSON POST). Returns { ok, configured }.
// When no endpoint is configured, resolves ok:true so the preview still shows
// the success state — nothing is sent until you set FORM_ENDPOINT.
// `data` may be a plain object (sent as JSON) or a FormData instance (sent as
// multipart/form-data, which is required when the form includes a file upload).
export async function submitForm(data) {
  if (!FORM_ENDPOINT) return { ok: true, configured: false }
  const isMultipart = typeof FormData !== 'undefined' && data instanceof FormData
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
