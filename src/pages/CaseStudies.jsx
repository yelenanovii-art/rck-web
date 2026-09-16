import CTABand from '../components/CTABand'
import { Check } from '../components/Icons'

// Resource page — /case-studies
// Uses the approved anonymised engagement figures already on the site. Swap in
// full write-ups when cleared for publication.
const CASES = [
  {
    tag: 'Cost transformation · 31 markets',
    stat: '$128M',
    h: 'Opex unlocked through operating-model redesign',
    p: 'US$128M delivered against a US$120M target (107%), independently verified by the client’s external auditor. Span of control widened from 5.1 to 5.8 across 31 markets, with the saving tracked on the EBITDA bridge.',
  },
  {
    tag: 'Synergy recovery · €15M programme',
    stat: '42 → 91%',
    h: 'A stalled synergy programme recovered',
    p: '27 late milestones cleared under new governance after RCK mobilised on the engagement.',
  },
  {
    tag: 'Carve-out · $250M',
    stat: 'Week 1',
    h: 'Senior partners mobilised on a carve-out',
    p: 'Pre-vetted partners across 12+ workstreams, in seat in Week 1 of engagement.',
  },
  {
    tag: 'Carve-out · working capital',
    stat: '£1.5M',
    h: 'Working capital realised within 90 days',
    p: 'TSA execution and stranded-cost removal delivered against agreed exit gates.',
  },
  {
    tag: 'Pharma carve-out · 7 sites',
    stat: 'Zero',
    h: 'Separations completed with no contractual penalties',
    p: 'A $250M pharma carve-out delivered across 7 sites, on time and on the agreed terms.',
  },
  {
    tag: 'PMI · revenue integration',
    stat: '85%+',
    h: 'Revenue protected through the integration',
    p: 'Sales-force and go-to-market alignment held customer retention through the close.',
  },
  {
    tag: 'Industrial carve-out · €450M',
    stat: '€8.2M',
    h: 'TSA run-rate cost removed on a carve-out',
    p: 'A €450M industrial carve-out separated four months ahead of schedule, eliminating €8.2M of TSA run-rate cost.',
  },
  {
    tag: 'PE portfolio integration · 14 entities',
    stat: '£18M',
    h: 'Verified EBITDA improvement across a portfolio',
    p: 'A £200M-revenue group realised £18M of GL-verified EBITDA improvement across 14 European operating entities.',
  },
]

export default function CaseStudies() {
  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Case studies</p>
          <h1 className="hero__title">Verified outcomes, not testimonials.</h1>
          <p className="hero__sub">
            Representative, anonymised engagements across UK, EU and US portfolios. Each figure was
            measured and signed off in the client&rsquo;s ledger. Full detail available
            under NDA.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case-grid">
            {CASES.map((c, i) => (
              <article className="case-card reveal" style={{ '--delay': `${(i % 3) * 70}ms` }} key={i}>
                <span className="case-card__tag">{c.tag}</span>
                <div className="case-card__stat">{c.stat}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <span className="case-card__verified"><Check size={13} /> Verified outcome</span>
              </article>
            ))}
          </div>
          <p className="stats-footnote" style={{ marginTop: 30 }}>
            Anonymised and representative of engagement type. Full detail available under NDA.
          </p>
        </div>
      </section>

      <CTABand
        eyebrow="Your deal next"
        title="See what this looks like on your deal."
        copy="Bring your thesis. We will scope the milestones and the 40/60 model against it."
        secondary={{ label: 'Why partner-led beats matrix', href: '/about/partner-led-model' }}
      />
    </>
  )
}
