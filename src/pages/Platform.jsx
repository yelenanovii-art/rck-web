import SectionHead from '../components/SectionHead'
import CTABand from '../components/CTABand'
import TransformMark from '../components/TransformMark'
import Photo from '../components/Photo'
import ValueSignal from '../components/charts/ValueSignal'
import Disclose from '../components/Disclose'
import TabbedPair from '../components/TabbedPair'
import { ArrowRight } from '../components/Icons'
import { scrollToId } from '../hooks/useRoute'

const PRINCIPLES = [
  ['Build on what exists', 'Operates directly on your existing Objective, Key Result, Initiative, Sprint and Gate structure, no parallel workflow to adopt.'],
  ['Intelligence as a peer capability', 'Quantitative delivery telemetry and behavioural signal sit side by side, behind one interface.'],
  ['Additive behavioural signal', "Measures real human execution, communication and alignment alongside hard delivery metrics, it adds a signal, it doesn't replace the ones you already track."],
  ['Materiality before mechanism', 'Data residency, explicit consent and verified evidence are enforced before any signal is generated.'],
]

const MODULES = [
  ['Pre-Initiative (M&A)', 'Foresight', 'Pre-acquisition target evaluation & deal alignment', 'Deal go/no-go record'],
  ['Strategy', 'Direction', 'Intent cascaded through OKRs', 'Strategic theme → key result'],
  ['Delivery', 'Momentum', 'Programme, initiative, sprint & milestone execution', 'Multi-speed delivery backbone'],
  ['Governance', 'Assurance', 'Stage-gate reviews across the full lifecycle', 'Audit-ready gate criteria'],
  ['Insight', 'Intelligence', 'Shared quantitative & behavioural insight engine', 'Multi-mode value signals'],
  ['Benefit', 'Value', 'Confidence-scored, risk-adjusted value tracking', 'Benefit realisation record'],
  ['Trust', 'Seal', 'Cryptographic, tamper-evident record of decisions', 'Independently verifiable audit trail'],
]

export default function Platform() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--platform">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">TRANSFORM+ Execution Platform</p>
            <h1 className="hero__title">The Execution OS Built Directly into Your Business Intelligence Layer.</h1>
            <p className="hero__sub">
              Not a disconnected SaaS tool. TRANSFORM+ embeds pre-configured milestone governance,
              risk heat maps, and automated audit trails into Tableau, Power BI, Looker, or Sisense,
              with zero external data storage.
            </p>
            <div className="hero__actions">
              <a className="btn btn-gold btn-lg" href="/contact">
                Schedule an Executive Briefing <ArrowRight />
              </a>
              <a className="btn btn-outline-light btn-lg" href="#architecture" onClick={(e) => scrollToId(e, 'architecture')}>
                Explore the architecture
              </a>
            </div>
            <p className="hero__payoff">
              Built on a complete <code>Strategy → OKR → Programme → Initiative → Sprint</code>{' '}
              execution spine, an RCK platform.
            </p>
          </div>
          <div className="hero__tmark">
            <div className="hero__tmark-ring">
              <TransformMark size={120} />
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Principles"
            title="Built on four principles"
            lede="Transformations fail in the hand-offs between strategy consultants, delivery tools and governance spreadsheets. TRANSFORM+ replaces them with four architectural rules."
          />
          <div className="principles-grid">
            {PRINCIPLES.map(([h, p], i) => (
              <div className="principle-card reveal" style={{ '--delay': `${i * 70}ms` }} key={h}>
                <div className="pnum">{i + 1}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE STACK */}
      <section className="section" id="architecture" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Architecture"
            title="Seven modules. One execution spine."
            lede="One name across the enterprise, integrating every step of the value lifecycle."
          />
          <Disclose label="View the seven-module architecture">
          <div className="table-scroll reveal">
            <table className="stack">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Module</th>
                  <th>Capability</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {MODULES.map(([layer, mod, cap, out]) => (
                  <tr key={mod}>
                    <td><span className="chip">{layer}</span></td>
                    <td><strong>{mod}</strong></td>
                    <td>{cap}</td>
                    <td>{out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Disclose>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Product"
            title="A look inside TRANSFORM+"
            lede="One interface across the whole spine, the OKR cascade, live stage-gates, and the sealed audit trail behind every decision."
          />
          <Photo
            className="reveal photo--band"
            tone="dark"
            suggest="A clean screenshot of the TRANSFORM+ interface, the OKR cascade, a stage-gate review, the Value Signal dashboard, or the Seal audit trail. Dark UI to match this page; consider a subtle laptop/browser frame."
          />
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Intelligence"
            title="Dual-mode intelligence, four capability dimensions"
            lede="TRANSFORM+ Intelligence combines hard telemetry with real human execution signal in one engine, not a static dashboard."
          />
          <div className="chart-grid chart-grid--single" style={{ marginBottom: '28px' }}>
            <ValueSignal />
          </div>
          <div className="intel-grid">
            <div className="intel-card reveal">
              <div className="when">Fires at initial OKR &amp; sponsor definition</div>
              <h3>1 · Strategy Baseline</h3>
              <p>Sets a behavioural alignment baseline for sponsors alongside standard Key Result targets, before the first stage gate.</p>
            </div>
            <div className="intel-card reveal" style={{ '--delay': '80ms' }}>
              <div className="when">Fires continuously across active sprints</div>
              <h3>2 · Value Signal</h3>
              <p>Combines delivery telemetry with a weighted behavioural confidence term:</p>
              <ul>
                <li>Sprint completion % (delivery telemetry)</li>
                <li>Milestone RAG status (programme reporting)</li>
                <li>Tooling velocity (Jira / ADO integration)</li>
                <li>+ Behavioural confidence term (sponsor / team signal)</li>
              </ul>
            </div>
            <div className="intel-card reveal" style={{ '--delay': '160ms' }}>
              <div className="when">Fires during execution &amp; benefit realisation</div>
              <h3>3 · Value Creation (pattern detection)</h3>
              <p>Flags specific execution risks and auto-generates a rolling 30/60/90-day action plan. Outcomes are captured and sealed into the audit trail at realisation.</p>
            </div>
            <div className="intel-card reveal" style={{ '--delay': '240ms' }}>
              <div className="when">Restricted to pre-close diligence &amp; post-acquisition validation</div>
              <h3>4 · Gated M&amp;A Mode</h3>
              <p>Kept separate from standard enterprise OKR cascades. Feeds go/no-go decisions during diligence and validates target value on a Day 30/100/200/365 post-close cadence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Packages"
            title="Two ways to deploy"
            lede="The exact capability you need, for standard enterprise governance or high-stakes M&A integration."
          />
          <TabbedPair className="pkg-grid" ariaLabel="TRANSFORM+ packages" labels={['Foundations', 'Continuity']}>
            <div className="pkg-card reveal">
              <div className="pkg-tag">Delivery Governance Package</div>
              <h3>TRANSFORM+ Foundations</h3>
              <div className="pkg-sub">Best for standard enterprise delivery governance and OKR cascade.</div>
              <div className="pkg-price">Custom <small>scoped to programme</small></div>
              <ul>
                <li>Four milestone gates, scoped to org size &amp; number of OKR cascades</li>
                <li>Deployed on existing systems, zero new infrastructure</li>
                <li>Full stage-gate &amp; strategy spine</li>
              </ul>
            </div>
            <div className="pkg-card hi reveal" style={{ '--delay': '90ms' }}>
              <div className="pkg-tag">M&amp;A Integration Package</div>
              <h3>TRANSFORM+ Continuity</h3>
              <div className="pkg-sub">Best for PE sponsors, corporate development, and M&amp;A integration management offices.</div>
              <div className="pkg-price">Custom <small>scoped to deal size</small></div>
              <ul>
                <li>Full M&amp;A-gated intelligence mode</li>
                <li>Day 30 / 100 / 200 / 365 read cadence</li>
                <li>Deal-close-anchored value creation tracking</li>
              </ul>
            </div>
          </TabbedPair>
        </div>
      </section>

      {/* BENCHMARKING */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Benchmarking" title="Where TRANSFORM+ sits" />
          <div className="stat-callout reveal">
            Unmanaged culture and behavioural mismatches cut post-merger net income by an average{' '}
            <strong>$200M a year</strong>, and by more than <strong>$600M a year</strong> in severe
            cases (Gelfand, University of Maryland; via Gallup). TRANSFORM+ closes that blind spot
            without abandoning the strategy-execution discipline enterprises already run on.
          </div>

          <div className="bench-block">
            <p className="bench-label">Against enterprise strategy-execution platforms</p>
            <Disclose label="View the comparison">
            <div className="table-scroll reveal" style={{ marginTop: 0 }}>
              <table className="bench">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Enterprise Strategy-Execution Platforms</th>
                    <th className="hi">TRANSFORM+</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Core claim', 'One golden thread from strategy to delivery, board-ready', 'Same spine, plus a native M&A-gated mode and sealed audit trail'],
                    ['M&A-specific mode', 'Not offered', 'Gated diligence-to-post-close mode, isolated from standard OKR cascade'],
                    ['Audit trail', 'Dashboarding and reporting', 'Cryptographically sealed, independently verifiable record of every decision'],
                    ['Behavioural signal', 'Not offered', 'Native behavioural confidence term alongside delivery telemetry'],
                  ].map(([l, a, b]) => (
                    <tr key={l}>
                      <th>{l}</th>
                      <td>{a}</td>
                      <td className="hi">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Disclose>
          </div>

          <div className="bench-block">
            <p className="bench-label">Against M&amp;A-specific behavioural intelligence tools</p>
            <Disclose label="View the comparison">
            <div className="table-scroll reveal" style={{ marginTop: 0 }}>
              <table className="bench">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Culture-Scoring<br />(e.g. Grodivo)</th>
                    <th>Post-Close Pulse<br />(e.g. NayaDaya)</th>
                    <th>NLP Alignment<br />(e.g. Humanaq)</th>
                    <th className="hi">TRANSFORM+</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Primary focus', 'Culture-fit scoring pre-close', 'Post-close emotional / retention risk', 'Executive communication alignment', 'Execution alignment across the full lifecycle'],
                    ['Integration', 'Standalone tool', 'Standalone tool', 'Standalone tool', 'Native to your Strategy / OKR / Stage-Gate spine'],
                    ['Auditability', 'None stated', 'None stated', 'None stated', 'Cryptographically sealed, independently verifiable'],
                    ['Turnaround', 'Not stated', 'Recurring pulse', 'Not stated', 'Rapid 7-day baseline delivery'],
                  ].map(([l, a, b, c, d]) => (
                    <tr key={l}>
                      <th>{l}</th>
                      <td>{a}</td>
                      <td>{b}</td>
                      <td>{c}</td>
                      <td className="hi">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Disclose>
          </div>
        </div>
      </section>

      {/* SEAL */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Security & audit"
            title="Cryptographic decision integrity: TRANSFORM+ Seal"
            lede="Every gate decision, objective change and benefit calculation is recorded, an immutable log built with strict data residency and privacy-first consent boundaries."
          />
          <div className="seal-flow reveal">
            <div className="seal-node"><div className="dot">1</div><h4>Strategy Defined</h4><p>Objective &amp; OKR set</p></div>
            <div className="seal-arrow" />
            <div className="seal-node"><div className="dot">2</div><h4>Gate Approved</h4><p>Stage-gate review cleared</p></div>
            <div className="seal-arrow" />
            <div className="seal-node"><div className="dot">3</div><h4>Value Realised</h4><p>Benefit calculated</p></div>
            <div className="seal-arrow" />
            <div className="seal-node final"><div className="dot">✓</div><h4>Sealed</h4><p>Permanent, verifiable record</p></div>
          </div>
          <div className="seal-points">
            {[
              ['Tamper-evident record', 'An immutable log of every strategic decision, approval and risk assessment.'],
              ['Board & audit ready', 'An independently verifiable trail for investors, auditors and directors, from deal thesis to realised EBITDA.'],
              ['Enterprise security', 'Strict data residency, privacy-first consent boundaries, and gated external capability controls.'],
            ].map(([h, p], i) => (
              <div className="seal-point reveal" style={{ '--delay': `${i * 80}ms` }} key={h}>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        variant="platform"
        eyebrow="Get started"
        title="Ready to turn strategic intent into sealed value?"
        copy="Join the enterprises, PE sponsors and transformation leaders running their execution spine on TRANSFORM+."
        primary={{ label: 'Book your TRANSFORM+ briefing', href: '/contact' }}
        secondary={{ label: 'Talk to deal advisory', href: '/advisory' }}
      />
    </>
  )
}
