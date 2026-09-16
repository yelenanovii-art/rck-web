import SectionHead from '../components/SectionHead'
import FeeBar from '../components/FeeBar'
import Stat from '../components/Stat'
import CTABand from '../components/CTABand'
import Photo from '../components/Photo'
import EbitdaBridge from '../components/charts/EbitdaBridge'
import SynergyTrajectory from '../components/charts/SynergyTrajectory'
import Disclose from '../components/Disclose'
import { ArrowRight } from '../components/Icons'
import { scrollToId } from '../hooks/useRoute'

const PRACTICE = [
  {
    tag: '01 · Due Diligence',
    h: 'Operational, Technology, AI & Commercial',
    p: 'Rapid red-flag reviews and sell-side readiness that set the integration baseline before controls bite.',
  },
  {
    tag: '02 · PMI',
    h: 'Post-Merger Integration',
    p: 'Day 1 / Day 100 cutover planning, Integration Management Office stand-up, functional alignment across HR, Finance, IT and GTM.',
  },
  {
    tag: '03 · Carve-Outs',
    h: 'Carve-Outs & TSA Execution',
    p: 'NewCo IT stand-up, Transition Services Agreement design, and stranded-cost removal against agreed exit-kill-gates.',
    milestone: 'Realised £1.5M working capital within 90 days',
  },
  {
    tag: '04 · Value Creation',
    h: 'Value Creation & AI Transformation',
    p: 'Target Operating Model redesign and AI-enabled process optimisation, tracked against the EBITDA bridge, not just activity metrics.',
    milestone: 'Synergy recovery lifted 42% → 91%',
  },
]

export default function Advisory() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--sub">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">How We Work</p>
          <h1 className="hero__title">Stop paying for slide decks. Start paying for outcomes.</h1>
          <p className="hero__sub">
            Partner-led deal advisory and interim execution, one team, one contract, from diligence
            to value realisation, with 60% of our fee tied to the outcomes we verify in your ledger.
          </p>
          <div className="hero__actions">
            <a className="btn btn-gold btn-lg" href="/contact">
              Book an Executive Strategy Call <ArrowRight />
            </a>
            <a className="btn btn-outline-light btn-lg" href="#model" onClick={(e) => scrollToId(e, 'model')}>
              See the 40/60 model
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="The problem"
            title="Deal advisory and transformation are sold broken"
            lede="Value leaks at every hand-off, and the standard commercial models make sponsors and C-suite leaders carry all the delivery risk while paying by the hour."
          />
          <div className="problem-grid">
            {[
              ['1', 'Hand-off leakage', 'Diligence, integration and exit prep typically sit with three different firms. The deal thesis gets diluted in translation between them.'],
              ['2', 'The pyramid model', 'Partners sell the engagement; delivery is handed to a team of juniors logging hours against it.'],
              ['3', 'Advice without accountability', "Large retainers buy reports and recommendations, then your team executes alone, with no one else's fee riding on the result."],
            ].map(([n, h, p], i) => (
              <div className="problem-card reveal" style={{ '--delay': `${i * 80}ms` }} key={n}>
                <div className="num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <div className="problem-note reveal">
            <strong>Our view:</strong> diligence and delivery should sit in the same room, under the
            same commercial incentive.
          </div>
        </div>
      </section>

      {/* MODEL — B2: one sentence, the split graphic, and a link. The
          mechanism itself lives on /approach/40-60-fee-model. */}
      <section className="section" id="model" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)' }}>
        <div className="container">
          <SectionHead
            eyebrow="The model"
            title="The RCK Outcome Fee Model"
            lede="40% is billed on time spent from kickoff. The 60% is billed through rolling sprints and is not earned until the agreed outcomes are met."
          />
          <div className="model-panel reveal">
            <FeeBar />
          </div>
          <div className="model-cta reveal">
            <a className="btn btn-navy btn-lg" href="/approach/40-60-fee-model">
              How the RCK Outcome Fee Model works <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Comparison"
            title="How the three models actually compare"
            lede="Facts a buyer can verify, not adjectives."
          />
          <Disclose label="View the comparison table">
          <div className="table-scroll reveal">
            <table className="compare">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Volume Consultancies</th>
                  <th>Pure-Play PMI Shops</th>
                  <th className="hi">RCK 40/60 Model</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Commercial structure', '100% time & materials', 'Fixed day rates, minor bonus', '40% on time spent / 60% performance-tied'],
                  ['Contract structure', 'Separate contracts across diligence, integration, exit firms', 'One firm for delivery, disconnected from diligence', 'Single contract, diligence to value realisation'],
                  ['Team seniority', 'Partner-sold, junior-delivered', 'Delivery team assigned after diligence closes', 'Senior partner in direct operational control from day one'],
                  ['Deployment speed', 'Weeks of onboarding and discovery', 'Standard agency lead times', 'Senior leader in seat in Week 1'],
                  ['Delivery risk', 'Borne entirely by the client', 'Shared only if separately negotiated', 'Structurally shared through the fee model itself'],
                ].map(([label, a, b, c]) => (
                  <tr key={label}>
                    <th className="rowlabel">{label}</th>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td className="hi">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Disclose>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="One team. Five practice areas."
            lede="Illustrative milestones from representative, anonymised engagements (detail available under NDA)."
          />
          <div className="practice-grid">
            {PRACTICE.map((c, i) => (
              <div className="practice-card reveal" style={{ '--delay': `${i * 70}ms` }} key={c.tag}>
                <div className="tag">{c.tag}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                {c.milestone && <div className="milestone">{c.milestone}</div>}
              </div>
            ))}
            <div className="practice-card full reveal">
              <div className="tag">05 · Interim Management &amp; CxO Bench</div>
              <h3>Fractional or full-time CFO / COO / CIO / CTrO</h3>
              <p>Senior leaders from our own network, in seat in Week 1, never sub-contracted.</p>
              <div className="milestone">$250M pharma carve-out completed across 7 sites, zero contractual penalties</div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section results">
        <div className="container">
          <SectionHead
            light
            eyebrow="Verified results"
            title="Value delivered, confidence priced in"
            lede="Representative anonymised engagements across UK, EU and US portfolios."
          />
          <div className="stats-row">
            <div className="stat-card reveal">
              <Stat staticText="$128M" dark label="Opex unlocked vs a US$120M target (107%), independently verified by the client’s external auditor — operating-model redesign across 31 markets, span of control 5.1 → 5.8" />
            </div>
            <div className="stat-card reveal" style={{ '--delay': '90ms' }}>
              <Stat staticText="42→91%" dark label="Synergy recovery on a stalled €15M programme, clearing 27 late milestones under new governance" />
            </div>
            <div className="stat-card reveal" style={{ '--delay': '180ms' }}>
              <Stat staticText="<72 hrs" dark label="Deployment of pre-vetted senior partners across 12+ workstreams on a $250M carve-out" />
            </div>
          </div>
          <p className="stats-footnote">Anonymised, representative of engagement type. Full detail available under NDA.</p>
        </div>
      </section>

      {/* VALUE, VISUALISED (charts) */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Value, visualised"
            title="What value creation actually looks like"
            lede="Two representative engagements — how the EBITDA bridge is built lever by lever, and how a stalled synergy programme was recovered once RCK mobilised."
          />
          <div className="chart-grid">
            <EbitdaBridge />
            <SynergyTrajectory />
          </div>
        </div>
      </section>

      {/* PARTNER BAND */}
      <section className="section">
        <div className="container partnerband">
          <div className="partnerband__copy reveal">
            <p className="eyebrow">Who you work with</p>
            <h2 className="section-title">Senior partners in the room, not a pyramid behind them.</h2>
            <p className="lead">
              Every engagement is led by a partner in direct operational control from day one. The
              same people who scope the milestones during diligence are the ones accountable for
              hitting them, with 60% of their own fee riding on the result.
            </p>
          </div>
          <Photo
            className="reveal"
            ratio="4 / 5"
            suggest="A senior partner / operator portrait, or a candid working shot in a meeting room. Real people, natural light, confident but not corporate-glossy. Ideally your actual managing partners."
          />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead eyebrow="Engagement process" title="How we mobilise" />
          <div className="timeline">
            {[
              ['Days 1–5', 'Audit & align', 'Agree 3–5 value milestones against your VCP.'],
              ['Days 6–10', 'Sign SOW', 'Single Statement of Work with sponsor-agreed baselines.'],
              ['Day 11+', 'Mobilise', 'Senior partner takes direct operational control.'],
              ['Ongoing', 'Verify & release', 'Milestone tranches of the 60% released as each is verified.'],
            ].map(([r, h, p], i) => (
              <div className="tstep reveal" style={{ '--delay': `${i * 70}ms` }} key={r}>
                <div className="trange">{r}</div>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to de-risk your next deal or transformation?"
        copy="Partner-led execution on a commercial model built around your outcomes, not our billable hours."
        secondary={{ label: 'See the platform', href: '/products/transform-plus' }}
        note="Prefer a direct conversation? Contact our Managing Partner via the contact page."
      />
    </>
  )
}
