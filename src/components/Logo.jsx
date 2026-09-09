import { useState } from 'react'

// Secondary "verified-outcome" mark (open ring + copper check). Kept for
// decorative use in a few places; the primary identity is now the RCK wordmark.
export function Mark({ size = 40, className = '', navy = 'currentColor', gold = '#c47a3a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="RCK">
      <circle cx="32" cy="32" r="22" fill="none" stroke={navy} strokeWidth="5" strokeDasharray="112 26" transform="rotate(52 32 32)" />
      <path d="M22,34 L30,42 L46,20" stroke={gold} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Primary logo. Loads the RCK wordmark image (navy letters + copper ribbon) that
// you drop into public/brand/. Until the file exists, it falls back to a clean
// text wordmark — navy "RC" + copper "K" — that adapts to light/dark automatically.
// Candidate files per background, tried in order (svg → png). Drop any one of
// these into public/brand/ and it appears automatically.
const LIGHT_SRCS = ['/brand/rck-logo.svg', '/brand/rck-logo.png']
const DARK_SRCS = ['/brand/rck-logo-white.svg', '/brand/rck-logo-white.png']

export default function Logo({ compact = false, light = false, onDark = false, onNav }) {
  const [i, setI] = useState(0)
  const dark = onDark || light
  const list = dark ? DARK_SRCS : LIGHT_SRCS
  const imgOk = i < list.length
  const src = list[i]

  return (
    <a href="/" className="logo" aria-label="RCK — Outcome Partners home" onClick={onNav}>
      {imgOk ? (
        <img className="logo__img" src={src} alt="RCK — Outcome Partners" onError={() => setI((n) => n + 1)} />
      ) : (
        <span className="logo__word">
          <span className="logo__mark-txt">
            <span className="logo__rc">RC</span><span className="logo__k">K</span>
          </span>
          {!compact && <span className="logo__desc">Outcome Partners</span>}
        </span>
      )}
    </a>
  )
}
