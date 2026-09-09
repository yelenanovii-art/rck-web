import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ArrowRight } from './Icons'
import { BOOKING_URL } from '../config'

const bookHref = BOOKING_URL || '/contact'
const bookExternal = Boolean(BOOKING_URL)
const bookAttrs = bookExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

// Primary nav, in order. Items are a plain 'link', a single-column dropdown
// 'group', or the 3-column Services mega-menu (mega: true, with columns).
const NAV = [
  {
    type: 'group',
    label: 'Expertise',
    mega: true,
    columns: [
      {
        heading: 'Advisory & Transformation',
        items: [
          { to: '/services/deal-advisory-carve-outs', label: 'Deal Advisory & Carve-Outs', desc: 'Diligence, Day-1 separation & TSA exits' },
          { to: '/services/value-creation-cost-transformation', label: 'Value Creation & Cost Transformation', desc: 'OPEX, PMI & synergy capture' },
          { to: '/services/restructuring-turnaround', label: 'Restructuring & Turnaround', desc: 'Liquidity, cash governance, recovery' },
          { to: '/services/erp-enterprise-applications', label: 'ERP & Enterprise Applications', desc: 'Selection, assurance & implementation' },
        ],
      },
      {
        heading: 'Interim Leadership (CxO Bench)',
        items: [
          { to: '/services/interim-management', label: 'Interim CFO & Finance Ops' },
          { to: '/services/interim-management', label: 'Interim COO & Operations' },
          { to: '/services/interim-management', label: 'Interim CIO/CTO & Tech' },
          { to: '/services/interim-management', label: 'Interim CTrO & Programme Leadership' },
        ],
      },
      {
        heading: 'Products & Diagnostics',
        items: [
          { to: '/products/transform-plus', label: 'TRANSFORM+ Execution Platform' },
          { to: '/diagnostics/deal-value-modeller', label: 'Deal Value Modeller' },
          { to: '/diagnostics/value-at-risk', label: 'Value-at-Risk Assessment' },
          { to: '/diagnostics/readiness-score', label: 'RCK Readiness Score' },
        ],
      },
    ],
    featured: { to: '/diagnostics/readiness-score', label: 'New — find the squeeze in your value creation plan with the RCK Readiness Score' },
  },
  { type: 'link', to: '/the-outcome-circle', label: 'Outcome Circle' },
  {
    type: 'group',
    label: 'Approach',
    items: [
      { to: '/advisory', label: 'How We Work' },
      { to: '/about/outcomes-vs-advisory', label: 'The 40/60 Fee Model' },
      { to: '/about/partner-led-model', label: 'Why Partner-Led Beats Matrix' },
      { to: '/services/integrated-interim', label: 'Why Interim Should Be Integrated' },
      { to: '/about/founder-built-playbooks', label: 'Founder-Built Playbooks' },
    ],
  },
  {
    type: 'group',
    label: 'Insights',
    items: [
      { to: '/insights', label: 'All Insights' },
      { to: '/case-studies', label: 'Case Studies' },
      { to: '/resources/playbooks', label: 'Outcomes-Based PMI Playbook' },
    ],
  },
  {
    type: 'group',
    label: 'About Us',
    items: [
      { to: '/about/our-firm', label: 'About RCK' },
      { to: '/about/team', label: 'Meet Our Team' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

function Caret() {
  return (
    <svg className="caret" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav({ path }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (to) => path === to
  const flatItems = (g) => (g.mega ? g.columns.flatMap((c) => c.items) : g.items)
  const groupActive = (g) => flatItems(g).some((it) => it.to === path)

  const MenuLink = ({ it, i }) => (
    <a key={it.to + i} href={it.to} role="menuitem" className={`nav__menu-link ${isActive(it.to) ? 'is-active' : ''}`}>
      <span className="nav__menu-label">{it.label}</span>
      {it.desc && <span className="nav__menu-desc">{it.desc}</span>}
    </a>
  )

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <Logo compact onDark={!scrolled || open} />

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) =>
            n.type === 'link' ? (
              <a key={n.to} href={n.to} className={`nav__link ${isActive(n.to) ? 'is-active' : ''}`}>
                {n.label}
              </a>
            ) : (
              <div className={`nav__group ${n.mega ? 'nav__group--mega' : ''}`} key={n.label}>
                <button type="button" className={`nav__link nav__trigger ${groupActive(n) ? 'is-active' : ''}`} aria-haspopup="true">
                  {n.label}
                  <Caret />
                </button>

                {n.mega ? (
                  <div className="nav__menu nav__menu--mega" role="menu">
                    <div className="nav__menu-inner">
                      <div className="nav__mega">
                        {n.columns.map((col) => (
                          <div className="nav__mega-col" key={col.heading}>
                            <div className="nav__mega-h">{col.heading}</div>
                            {col.items.map((it, i) => <MenuLink it={it} i={i} key={it.label + i} />)}
                          </div>
                        ))}
                      </div>
                      {n.featured && (
                        <a href={n.featured.to} className="nav__mega-featured">
                          {n.featured.label} <ArrowRight />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="nav__menu" role="menu">
                    <div className="nav__menu-inner">
                      {n.items.map((it, i) =>
                        it.divider ? (
                          <span className="nav__menu-div" key={`d${i}`}>{it.divider}</span>
                        ) : (
                          <MenuLink it={it} i={i} key={it.to + i} />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        <div className="nav__actions">
          <a className="btn btn-navy btn-sm nav__cta" href={bookHref} {...bookAttrs}>
            Book a Strategy Call <ArrowRight />
          </a>
          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className="nav__drawer" role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="nav__drawer-scroll">
          {NAV.map((n) =>
            n.type === 'link' ? (
              <div className="nav__drawer-group" key={n.to}>
                <a href={n.to} className={`nav__drawer-link nav__drawer-link--solo ${isActive(n.to) ? 'is-active' : ''}`} style={{ '--i': 0 }}>
                  {n.label}
                </a>
              </div>
            ) : n.mega ? (
              n.columns.map((col) => (
                <div className="nav__drawer-group" key={col.heading}>
                  <div className="nav__drawer-h">{col.heading}</div>
                  {col.items.map((it, i) => (
                    <a key={it.label + i} href={it.to} className={`nav__drawer-link ${isActive(it.to) ? 'is-active' : ''}`} style={{ '--i': i }}>
                      {it.label}
                    </a>
                  ))}
                </div>
              ))
            ) : (
              <div className="nav__drawer-group" key={n.label}>
                <div className="nav__drawer-h">{n.label}</div>
                {n.items
                  .filter((it) => !it.divider)
                  .map((it, i) => (
                    <a key={it.to + i} href={it.to} className={`nav__drawer-link ${isActive(it.to) ? 'is-active' : ''}`} style={{ '--i': i }}>
                      {it.label}
                    </a>
                  ))}
              </div>
            )
          )}
        </div>
        <a className="btn btn-gold nav__drawer-cta" href={bookHref} {...bookAttrs}>
          Book a Strategy Call <ArrowRight />
        </a>
        <div className="nav__drawer-meta">London · Barcelona</div>
      </div>
      <button className="nav__scrim" aria-hidden={!open} tabIndex={-1} onClick={() => setOpen(false)} />
    </header>
  )
}
