import { useEffect, useState } from 'react'

// GDPR-style cookie consent. The choice is stored in localStorage so returning
// visitors aren't nagged, and re-openable from the footer ("Cookie settings")
// because consent must be withdrawable. A `rck:consent` event is broadcast so
// analytics (GA/GTM, when wired) can gate on the analytics flag.
const KEY = 'rck-cookie-consent'

export function getCookieConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!getCookieConsent()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('rck:cookie-settings', reopen)
    return () => window.removeEventListener('rck:cookie-settings', reopen)
  }, [])

  const decide = (analytics) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics, ts: Date.now() }))
    } catch {}
    window.dispatchEvent(new CustomEvent('rck:consent', { detail: { analytics } }))
    setOpen(false)
  }

  // Ticket 5 — the banner is fixed to the bottom, so on first paint it sits on
  // top of whatever is at the foot of the viewport (on the fee page, the
  // comparison cards the hero CTA jumps to). Reserving its height at the bottom
  // of the document means nothing is ever permanently covered, at any width.
  useEffect(() => {
    const el = document.documentElement
    if (open) el.classList.add('has-cookie-banner')
    else el.classList.remove('has-cookie-banner')
    return () => el.classList.remove('has-cookie-banner')
  }, [open])

  if (!open) return null

  return (
    <div className="cookie" role="region" aria-label="Cookie consent">
      <div className="cookie__inner">
        <div className="cookie__copy">
          <p className="cookie__title">We value your privacy</p>
          <p className="cookie__text">
            We use essential cookies to run this site and optional analytics cookies to understand
            how it’s used. You decide what we set — see our{' '}
            <a href="/cookies">Cookie Policy</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="cookie__actions">
          <button className="btn btn-outline-light cookie__btn" type="button" onClick={() => decide(false)}>
            Necessary only
          </button>
          <button className="btn btn-gold cookie__btn" type="button" onClick={() => decide(true)}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
