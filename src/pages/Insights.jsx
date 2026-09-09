import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'

// /insights — Section 6.1. Category chips are static for now (a filterable
// content engine can be wired later); articles link to the relevant pieces.
const CATEGORIES = ['M&A Diligence', 'Carve-Outs & TSAs', 'The 40/60 Model', 'ERP Governance', 'Interim Management']

const ARTICLES = [
  { tag: 'The 40/60 Model', h: 'Why Traditional Consulting Incentives Guarantee Scope Bloat', href: '/about/outcomes-vs-advisory' },
  { tag: 'Value Creation', h: 'The CFO’s Guide to Audit-Ready Synergy Realization in the General Ledger', href: '/services/value-creation-cost-transformation' },
  { tag: 'Carve-Outs & TSAs', h: 'Quantifying the Real Cost of TSA Delay in Cross-Border Deals', href: '/diagnostics/deal-value-modeller' },
]

const MORE = [
  { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
  { tag: 'Model', h: 'The 40/60 fee model & verification', href: '/about/outcomes-vs-advisory' },
  { tag: 'Service', h: 'Why interim should be integrated', href: '/services/integrated-interim' },
  { tag: 'Playbooks', h: 'Founder-built playbooks', href: '/about/founder-built-playbooks' },
  { tag: 'Proof', h: 'Case studies: verified outcomes', href: '/case-studies' },
  { tag: 'Firm', h: 'Our firm & story', href: '/about/our-firm' },
]

function Cards({ items }) {
  return (
    <div className="related-grid" style={{ marginTop: 22 }}>
      {items.map((a, i) => (
        <a className="related-card reveal" style={{ '--delay': `${(i % 3) * 70}ms` }} href={a.href} key={i}>
          <span className="related-card__tag">{a.tag}</span>
          <h4>{a.h}</h4>
          <span className="related-card__go">Read <ArrowRight /></span>
        </a>
      ))}
    </div>
  )
}

export default function Insights() {
  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Insights</p>
          <h1 className="hero__title">Insights & Thought Leadership</h1>
          <p className="hero__sub">
            Operator-written analysis on M&amp;A diligence, carve-outs and TSAs, the 40/60 model, ERP
            governance and interim leadership.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="insight-cats reveal">
            {CATEGORIES.map((c) => <span className="insight-cat" key={c}>{c}</span>)}
          </div>
          <Cards items={ARTICLES} />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <p className="eyebrow">More insights</p>
          <Cards items={MORE} />
        </div>
      </section>

      <CTABand
        eyebrow="Apply the thinking"
        title="Want this analysis applied to your deal?"
        copy="Talk to the partner who would run it, on the 40/60 model."
        secondary={{ label: 'The Outcome Circle™', href: '/the-outcome-circle' }}
      />
    </>
  )
}
