// ── Where form submissions are sent ─────────────────────────────────────────
// Paste your Formspree endpoint between the quotes, e.g.
//   export const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz'
// (You can also set VITE_FORM_ENDPOINT in a .env file instead of editing here.)
//
// Until this is set, forms show the success state WITHOUT sending anything,
// which is safe for preview. See the README section "Wiring the forms".
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

// ── Canonical site origin (no trailing slash) ───────────────────────────────
// Used for canonical URLs, Open Graph URLs, sitemap.xml and structured data.
// PLACEHOLDER — set this to the real production domain before launch.
export const SITE_URL = 'https://www.rckpm.es'

// ── "Book a Strategy Call" destination (Pipedrive Meeting Scheduler) ─────────
// Set RCK's real Pipedrive scheduler URL here (or VITE_BOOKING_URL in a .env).
// The Web Developer Briefing shipped "your-firm" as an example slug, which
// resolves to Pipedrive's generic login screen — never a booking page. Until a
// real URL is configured, we treat any placeholder as "not set" so every
// "Book a Strategy Call" CTA falls back to the working /contact page.
// Interim booking link — RCK's Calendly (confirmed 2 Sep 2026). Swap for the
// Pipedrive Meeting Scheduler here (or VITE_BOOKING_URL) when that's ready.
const BOOKING_URL_RAW = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/shaunmt-rck/30min'
const isBookingPlaceholder = (u) => !u || /your-firm|your-slug|example|placeholder/i.test(u)
export const BOOKING_URL = isBookingPlaceholder(BOOKING_URL_RAW) ? '' : BOOKING_URL_RAW

// ── Social profiles (footer icons) ──────────────────────────────────────────
// Paste RCK's real profile URLs between the quotes when ready (or set
// VITE_SOCIAL_* in a .env). Until a real URL is set, the footer still shows the
// icon but renders it inert ("link coming soon") rather than shipping a dead
// link — it goes live automatically once filled in.
const cleanSocial = (u) => (!u || /your-|example|placeholder/i.test(u) ? '' : u)
export const SOCIAL = {
  // e.g. 'https://www.linkedin.com/company/rck-outcome-partners'
  linkedin: cleanSocial(import.meta.env.VITE_SOCIAL_LINKEDIN || ''),
  // e.g. 'https://x.com/rckoutcome'
  twitter: cleanSocial(import.meta.env.VITE_SOCIAL_TWITTER || ''),
}

// ── Company / legal identity (LSSI-CE Art. 10 + GDPR data controller) ────────
// Used by the Legal Notice, Privacy Policy, Cookie Policy and Terms pages so the
// legal identity lives in one place. Trading name is stated alongside the legal
// name per the P0-2 fix. registeredAddress is the one field that cannot be
// invented — add the full Barcelona registered street address before launch
// (the source Legal Notice leaves it as "[Insert Physical Address]").
export const COMPANY = {
  legalName: 'RCK Programme Methods S.L.',
  tradingName: 'RCK Outcome Partners',
  nif: 'B67505313',
  registeredCity: 'Barcelona, Spain',
  registeredAddress: 'Avenida Diagonal 317, Barcelona, Spain', // add postal code if required
  email: 'info@rckpm.es',
  supervisoryAuthority: 'Agencia Española de Protección de Datos (AEPD, www.aepd.es)',
}

// Optional: extra fields merged into every submission.
// For Web3Forms instead of Formspree, set FORM_ENDPOINT to
// 'https://api.web3forms.com/submit' and put your access key here:
//   export const FORM_EXTRA = { access_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }
export const FORM_EXTRA = {}
