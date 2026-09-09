import { useEffect, useRef } from 'react'

// Mobile-only disclosure. Long, scannable blocks (comparison tables, the
// side-by-side model breakdown) blow up page length on phones, so on screens
// ≤640px we collapse them behind a tap-to-expand summary. At ≥641px the block
// renders fully open and the summary is hidden — the section's real heading
// already labels it.
//
// Implementation notes:
//  • Native <details>, so it's keyboard- and screen-reader-accessible for free,
//    and its content stays in the DOM/markup even when collapsed (Google indexes
//    collapsed <details>, so SEO is unaffected).
//  • Rendered with `open` in JSX → the prerendered HTML and the no-JS/desktop
//    view show the content (no FOUC, fully crawlable). A breakpoint effect then
//    closes it on phones. No React state → no re-render, so the ref mutation and
//    the user's own toggling are never clobbered.
export default function Disclose({ label = 'Show details', children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    // Collapsed on phones, open everywhere else. Re-applies if the viewport
    // crosses the breakpoint (e.g. device rotation), but never on user toggle.
    const apply = () => { if (ref.current) ref.current.open = !mq.matches }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return (
    <details ref={ref} className={`mdisc ${className}`} open>
      <summary className="mdisc__summary">
        <span className="mdisc__label">{label}</span>
        <span className="mdisc__icon" aria-hidden="true" />
      </summary>
      <div className="mdisc__body">{children}</div>
    </details>
  )
}
