import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { POSTS, formatDate } from '../lib/posts'

// /insights — the blog index. Posts come from src/content/posts/*.md (edited at
// /admin), newest first. The curated links below the list point at the
// evergreen model/service pages that pair with the articles.
const MORE = [
  { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
  { tag: 'Model', h: 'The 40/60 fee model & verification', href: '/about/outcomes-vs-advisory' },
  { tag: 'Service', h: 'Why interim should be integrated', href: '/services/integrated-interim' },
  { tag: 'Playbooks', h: 'Founder-built playbooks', href: '/about/founder-built-playbooks' },
  { tag: 'Proof', h: 'Case studies: verified outcomes', href: '/case-studies' },
  { tag: 'Firm', h: 'Our firm & story', href: '/about/our-firm' },
]

export default function Insights() {
  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Insights</p>
          <h1 className="hero__title">Insights &amp; Thought Leadership</h1>
          <p className="hero__sub">
            Operator-written analysis on M&amp;A diligence, carve-outs and TSAs, the 40/60 model, ERP
            governance and interim leadership.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="post-list">
            {POSTS.map((p, i) => (
              <a
                className="post-list__item reveal"
                style={{ '--delay': `${(i % 3) * 70}ms` }}
                href={p.href}
                key={p.slug}
              >
                <span className="post-list__meta">
                  {formatDate(p.date)} · {p.readingTime} min read
                </span>
                <h2 className="post-list__title">{p.title}</h2>
                {p.description && <p className="post-list__dek">{p.description}</p>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <h2 className="section-head__title">Explore the model</h2>
          <div className="related-grid" style={{ marginTop: 22 }}>
            {MORE.map((a, i) => (
              <a
                className="related-card reveal"
                style={{ '--delay': `${(i % 3) * 70}ms` }}
                href={a.href}
                key={i}
              >
                <span className="related-card__tag">{a.tag}</span>
                <h4>{a.h}</h4>
                <span className="related-card__go">Read <ArrowRight /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Talk to a partner"
        title="Turn analysis into realised value"
        copy="A partner will respond within one business day to arrange a strategy call."
      />
    </>
  )
}
