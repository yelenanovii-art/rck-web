import { SOCIAL } from '../config'
import { LinkedIn, XTwitter } from './Icons'

// One footer social button. Renders a live link when its URL is configured in
// src/config.js; until then it stays visible but inert ("link coming soon") so
// no dead link ships — it activates automatically once the URL is set.
function Social({ href, label, children }) {
  if (!href) {
    return (
      <span className="footer__social-btn is-pending" aria-disabled="true" title="Link coming soon" aria-label={`${label} — link coming soon`}>
        {children}
      </span>
    )
  }
  return (
    <a className="footer__social-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

// Global footer (Section 8). The three link columns mirror the Services
// mega-menu so header/footer navigation parity is maintained.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="/" className="footer__logo" aria-label="RCK — Outcome Partners home">
            <img className="footer__logo-img" src="/brand/rck-logo-white.png" alt="RCK — Outcome Partners" />
          </a>
          <div className="footer__top-right">
            <p className="footer__hqline">
              London Headquarters · Barcelona Office · Specialist Execution Across 9 Jurisdictions
            </p>
            <div className="footer__social" role="group" aria-label="RCK on social media">
              <Social href={SOCIAL.linkedin} label="RCK Outcome Partners on LinkedIn"><LinkedIn /></Social>
              <Social href={SOCIAL.twitter} label="RCK Outcome Partners on X"><XTwitter /></Social>
            </div>
          </div>
        </div>

        <div className="footer__cols footer__cols--3">
          <div className="footer__col">
            <h4>Advisory &amp; Services</h4>
            <a href="/services/deal-advisory-carve-outs">Deal Advisory &amp; Carve-Outs</a>
            <a href="/services/value-creation-cost-transformation">Value Creation &amp; Cost Transformation</a>
            <a href="/services/restructuring-turnaround">Restructuring &amp; Turnaround</a>
            <a href="/services/erp-enterprise-applications">ERP &amp; Enterprise Applications</a>
            <a href="/about/outcomes-vs-advisory">The 40/60 Commercial Model</a>
          </div>
          <div className="footer__col">
            <h4>Interim &amp; Operators</h4>
            <a href="/services/interim-management">Interim CFO &amp; Finance</a>
            <a href="/services/interim-management">Interim COO &amp; Operations</a>
            <a href="/services/interim-management">Interim CIO &amp; Tech Cutover</a>
            <a href="/services/interim-management">Interim CTrO &amp; Programme</a>
            <a href="/the-outcome-circle">The Outcome Circle™</a>
          </div>
          <div className="footer__col">
            <h4>Diagnostics &amp; Platform</h4>
            <a href="/diagnostics/deal-value-modeller">Deal Value Modeller</a>
            <a href="/diagnostics/value-at-risk">Value-at-Risk Assessment</a>
            <a href="/diagnostics/readiness-score">RCK Readiness Score</a>
            <a href="/products/transform-plus">TRANSFORM+ Execution OS</a>
            <a href="/resources/playbooks">Outcomes-Based PMI Playbook</a>
          </div>
        </div>

        <div className="footer__gov">
          <span className="footer__gov-h">Company &amp; Governance</span>
          <nav className="footer__gov-links" aria-label="Company">
            <a href="/about/our-firm">About RCK</a>
            <a href="/about/team">Managing Partners</a>
            <a href="/advisory">How We Work</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/insights">Insights</a>
            <a href="/legal">Legal Notice</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookie Policy</a>
            <a href="/terms">Terms of Use</a>
            <button
              type="button"
              className="footer__cookie-link"
              onClick={() => window.dispatchEvent(new CustomEvent('rck:cookie-settings'))}
            >
              Cookie Settings
            </button>
          </nav>
        </div>
      </div>

      <div className="container footer__base">
        <span>© 2026 RCK Outcome Partners. All rights reserved.</span>
        <span className="footer__base-note">
          Operating under Chatham House &amp; verified GL outcome standards.
        </span>
      </div>
    </footer>
  )
}
