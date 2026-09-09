import { useEffect, useState } from 'react'
import CTABand from '../components/CTABand'
import { LinkedIn } from '../components/Icons'
import { SITE_URL } from '../config'

// LinkedIn badge pinned to the corner of a partner's photo. Renders a live
// link when that partner's `linkedin` URL is set in their JSON; until then it
// stays visible but inert ("link coming soon") so no dead link ships.
function TeamLinkedIn({ href, name }) {
  if (!href) {
    return (
      <span className="team-linkedin is-pending" aria-disabled="true" title="LinkedIn — link coming soon" aria-label={`${name} on LinkedIn — link coming soon`}>
        <LinkedIn size={16} />
      </span>
    )
  }
  return (
    <a className="team-linkedin" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>
      <LinkedIn size={16} />
    </a>
  )
}

// Partners are edited in the CMS (/admin → Partners). Each partner is a JSON
// file in src/content/partners/; this loads them all and sorts by `order`.
const modules = import.meta.glob('../content/partners/*.json', { eager: true })
const PARTNERS = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

// Round headshot (or a blank placeholder until the photo is supplied), with a
// LinkedIn badge pinned to its lower-right corner.
function Avatar({ src, name, linkedin }) {
  const [ok, setOk] = useState(Boolean(src))
  return (
    <div className="team-avatar-wrap">
      {ok ? (
        <div className="team-avatar">
          <img src={src} alt={name} loading="lazy" onError={() => setOk(false)} />
        </div>
      ) : (
        <div className="team-avatar team-avatar--empty" role="img" aria-label={`${name}, photo to follow`}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 19c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <TeamLinkedIn href={linkedin} name={name} />
    </div>
  )
}

export default function Team() {
  // Person structured data for each named partner — E-E-A-T + knowledge-graph signal.
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'rck-team-schema'
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PARTNERS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Person',
          name: p.name,
          jobTitle: p.role,
          ...(p.bio ? { description: p.bio } : {}),
          ...(p.photo ? { image: SITE_URL + p.photo } : {}),
          worksFor: { '@id': SITE_URL + '/#organization' },
        },
      })),
    })
    document.getElementById('rck-team-schema')?.remove()
    document.head.appendChild(el)
    return () => document.getElementById('rck-team-schema')?.remove()
  }, [])

  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">The partners</p>
          <h1 className="hero__title">RCK Partners, Operators in the Room, 100% Client-Aligned.</h1>
          <p className="hero__sub">
            In traditional matrix consultancies, you pay partner-level rates for junior analysts to
            learn on your asset.
          </p>
          <p className="hero__lead-bold">At RCK, partner-led means true operational risk-sharing:</p>
          <ul className="hero__points">
            <li><b>Zero Delivery Delegation:</b> The senior partner who pitches the strategy is the operator governing execution on the ground.</li>
            <li><b>Direct Downside Protection:</b> 60% of our fee is at-risk, unlocked only when planned outcomes are met.</li>
            <li><b>Single-Point Accountability:</b> Zero junior layers between operational bottlenecks and the operator who can resolve them.</li>
          </ul>
          <p className="hero__tagline">
            Named Engagement Partners. Direct operational governance. Aligned entirely with your
            outcomes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container team-list">
          {PARTNERS.map((p, i) => (
            <article className="team-card reveal" style={{ '--delay': `${(i % 2) * 80}ms` }} key={p.name}>
              <Avatar src={p.photo} name={p.name} linkedin={p.linkedin} />
              <div className="team-card__body">
                <h3 className="team-card__name">{p.name}</h3>
                <p className="team-card__role">{p.role}</p>
                {p.bio && <p className="team-card__bio">{p.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand
        eyebrow="Work with a partner"
        title="Talk to the partner who would run your deal."
        copy="No matrix, no hand-off. The person you meet is the person accountable for your outcome."
        secondary={{ label: 'Take the Value-at-Risk Assessment', href: '/diagnostics/value-at-risk' }}
      />
    </>
  )
}
