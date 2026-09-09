import SectionHead from '../../src/components/SectionHead'
import FeeBar from '../../src/components/FeeBar'
import Stat from '../../src/components/Stat'
import LeadForm from '../../src/components/LeadForm'
import { Mark } from '../../src/components/Logo'
import TransformMark from '../../src/components/TransformMark'
import Photo from '../../src/components/Photo'
import BorderBeamPanel from '../../src/components/BorderBeamPanel'
import Faq from '../../src/components/Faq'
import Disclose from '../../src/components/Disclose'
import TabbedPair from '../../src/components/TabbedPair'
import { ArrowRight } from '../../src/components/Icons'

// Single source for the hero positioning line — the eyebrow and the H1 both
// render from this, so they can never drift apart again (see P1-4).
const POSITIONING = 'Strategic Transformation · M&A Advisory · Interim & Fractional Leadership'

const HOME_FAQ = [
  {
    q: 'What is the 40/60 fee model?',
    a: 'RCK charges 40% of the fee as a fixed, time-billed baseline and puts the remaining 60% at risk against agreed outcomes. That 60% is unlocked only when the integration, carve-out, cost or synergy milestones are met and independently verified in your General Ledger. If the outcomes are missed, we forfeit that portion of our fee.',
  },
  {
    q: 'How are outcomes verified?',
    a: 'Before work begins we lock a signed Baseline Schedule that defines each target and its measurement source. Achievement is then confirmed against source data in your own General Ledger and finance systems, and signed off by the deal sponsor — not self-reported by us. This removes ambiguity about whether value was actually realised.',
  },
  {
    q: 'What happens if the targets are not met?',
    a: 'We forfeit the at-risk portion of our fee. Across representative engagements, roughly 85% hit 90%+ of target, about 10% land between 75–89%, and the remaining 5% fall below 75% — the band where we write off the outcome-linked fee entirely. Our downside is tied directly to yours.',
  },
  {
    q: 'How quickly can you deploy an interim CFO, COO or CIO?',
    a: 'We identify a pre-vetted interim leader from our bench within 48 hours and typically deploy in Week 1. Pricing is published and all-in — roughly £8K–£25K per month depending on the role — with a replacement guarantee if a placement departs early.',
  },
  {
    q: 'What kinds of deals and situations do you work on?',
    a: 'Post-merger integration, carve-outs and TSA execution, cost and value-creation programmes, restructuring and turnaround, and ERP / enterprise application transformation — most often for private-equity-backed portfolio companies. Detail on specific engagements is available under NDA.',
  },
  {
    q: 'Where is RCK based and where do you operate?',
    a: 'RCK is headquartered in London with an office in Barcelona, and delivers execution across the UK, Europe and the UAE.',
  },
]

export default function Home() {
  return (
    <>
      {/* ---------- HERO (spec 1.1 — outcomes-based rewrite) ---------- */}
      <section className="hero hero--home hero--v2">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">{POSITIONING}</p>
            <h1 className="hero__title">{POSITIONING}</h1>
            <p className="hero__sub">
              <b className="hero__sub-hl">We deliver measurable outcomes, not theories in slideware.</b>{' '}
              Under our 40/60 model, 60% of our fee is at risk and unlocked only when your
              integration, carve-out, or transformation milestones are fully verified.
            </p>
            <div className="hero__actions">
              <a
                className="btn btn-gold btn-lg"
                href="/diagnostics/value-at-risk"
                data-utm-source="homepage"
                data-utm-medium="hero"
                data-utm-campaign="readiness_score"
              >
                Calculate your Value-at-Risk <ArrowRight />
              </a>
              <a
                className="btn btn-paper btn-lg"
                href="/resources/playbooks"
                data-utm-source="homepage"
                data-utm-medium="hero"
                data-utm-campaign="playbook_download"
              >
                Download: Outcomes-Based PMI Playbook (Free)
              </a>
            </div>
            <div className="hero__meta">7 named partners · 200+ engagements · London &amp; Barcelona</div>
          </div>

          <BorderBeamPanel className="hero__panel reveal" radius={22} thickness={2}>
            <div className="hero__panel-top">
              <img className="hero__panel-logo" src="/brand/rck-logo-white.png" alt="RCK" />
              <span className="hero__panel-model">Value‑Anchored Contingent Fee</span>
              <div className="hero__panel-fig">60%</div>
            </div>
            <p className="hero__panel-cap">
              of our fee is paid <strong>only</strong> once milestones are independently verified.
            </p>
            <div className="mini-bar">
              <span className="mini-bar__base">40%</span>
              <span className="mini-bar__out">60%</span>
            </div>
            <div className="mini-bar-legend">
              <span>Retained baseline</span>
              <span>Performance-tied</span>
            </div>
          </BorderBeamPanel>
        </div>
      </section>

      {/* ---------- DIFFERENTIATOR (spec 1.1 hero body copy) ---------- */}
      <section className="section diff">
        <div className="container">
          <div className="diff__head reveal">
            <p className="eyebrow">Why Commercial Alignment Matters</p>
            <h2 className="diff__title">
              Most advisory firms bill for advice regardless of value realization. RCK ties fee
              recovery directly to P&amp;L outcomes.
            </h2>
            <p className="diff__lead">
              Traditional firms hand over strategy decks and exit before the operational friction
              begins. We built RCK to unify M&amp;A advisory, complex transformation, and hands-on
              interim execution under a single, shared-risk commercial model.
            </p>
          </div>

          <Disclose label="See the side-by-side comparison" className="diff-disc">
          <div className="diff-compare">
            <div className="diff-col diff-col--old reveal">
              <span className="diff-col__tag">Traditional Advisory &amp; Interim Partners</span>
              <ul className="diff-list diff-list--old">
                <li><b>Junior Matrix Pyramid:</b> Leveraged staffing models where senior partners sell and junior generalists execute.</li>
                <li><b>Diluted Attention:</b> Managing 8&ndash;10 concurrent client accounts per workstream lead.</li>
                <li><b>Deliverable-Centric:</b> Paid 100% on the delivery of slides and roadmaps, regardless of financial impact.</li>
                <li><b>Separation of Strategy &amp; Execution:</b> Strategy teams leave before integration, carve-outs, or turnaround challenges hit the ground.</li>
                <li><b>Zero Skin in the Game:</b> Fee realization is completely decoupled from your Value Creation Plan (VCP).</li>
              </ul>
            </div>
            <div className="diff-col diff-col--rck reveal" style={{ '--delay': '90ms' }}>
              <span className="diff-col__tag">The RCK Outcome Model</span>
              <ul className="diff-list diff-list--rck">
                <li><b>Partner-Led Execution:</b> Named, seasoned operators and interim CxOs embedded directly into your leadership team.</li>
                <li><b>High Focus &amp; Bandwidth:</b> Capped at 3&ndash;4 concurrent mandates per partner.</li>
                <li><b>Integrated Strategy &amp; Leadership:</b> We don&rsquo;t just design the playbook, our fractional/interim leaders execute it alongside you.</li>
                <li><b>The 40/60 Fee-at-Risk Structure:</b> 40% fixed baseline; 60% unlocked only when milestones are verified in your General Ledger.</li>
                <li><b>Shared Downside:</b> If your target EBITDA, carve-out separation, or synergy outcomes are missed, we forfeit our fee.</li>
              </ul>
            </div>
          </div>
          </Disclose>

          <div className="diff__foot reveal">
            <div className="diff__foot-copy">
              <p className="diff__close">
                <b>Shared Risk from Strategy to In-Seat Execution.</b> Most firms fragment
                accountability: advisors hand over decks without risk, while recruiters place interims
                who bill daily regardless of performance. RCK operates on <b>dual alignment</b>.
              </p>
              <a className="link-arrow diff__foot-link" href="/about/partner-led-model">
                Total partner ownership, explained <ArrowRight />
              </a>
            </div>
            <div className="diff__stats">
              <div className="diff-stat">
                <div className="diff-stat__n">200+</div>
                <div className="diff-stat__t">engagements delivered</div>
              </div>
              <div className="diff-stat">
                <div className="diff-stat__n">85%+</div>
                <div className="diff-stat__t">of programmes delivered on or above synergy targets</div>
              </div>
              <p className="diff-stat__note">No One Sits on the Sidelines. No One Gets Paid for Effort Alone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DUAL-TRACK (spec 1.2) ---------- */}
      <section className="section dualtrack">
        <div className="container">
          <div className="dualtrack__head reveal">
            <p className="eyebrow">How to work with us</p>
            <h2 className="dualtrack__title">Two Core Ways to Drive Transformation Outcomes</h2>
          </div>
          <TabbedPair className="dualtrack__grid" ariaLabel="Two core ways to work with us" labels={['Track 1', 'Track 2']}>
            <article className="track-card reveal">
              <span className="track-card__tag">Track 1</span>
              <h3>Outcomes-Based Transformation Advisory</h3>
              <dl className="track-card__meta">
                <div><dt>For</dt><dd>PMI, cost reduction, revenue synergy, capability uplift</dd></div>
                <div><dt>Model</dt><dd>40% fixed time-billed + 60% outcome-at-risk</dd></div>
                <div><dt>Timeline</dt><dd>12&ndash;18 months</dd></div>
              </dl>
              <p>
                We execute alongside you, measure outcomes in your GL, and release fees proportional
                to achievement.
              </p>
              <a className="link-arrow track-card__link" href="/services/transformation-outcomes">
                Learn More <ArrowRight />
              </a>
            </article>

            <article className="track-card reveal" style={{ '--delay': '90ms' }}>
              <span className="track-card__tag">Track 2</span>
              <h3>Interim Leadership &amp; CxO Bench</h3>
              <dl className="track-card__meta">
                <div><dt>For</dt><dd>Interim CFO, COO, CIO when you need leadership now</dd></div>
                <div><dt>Model</dt><dd>£8K&ndash;£25K / month + 40% placement fee (one-time)</dd></div>
                <div><dt>Timeline</dt><dd>48-hour identification, Week 1 deployment</dd></div>
              </dl>
              <p>
                We deploy pre-vetted interim leaders from our bench, pre-aligned to your
                transformation strategy.
              </p>
              <a className="link-arrow track-card__link" href="/services/interim-management">
                Learn More <ArrowRight />
              </a>
            </article>
          </TabbedPair>
        </div>
      </section>

      {/* ---------- PROOF (headline results + per-track metrics) ---------- */}
      <section className="section metrics">
        <div className="container">
          <SectionHead
            center
            eyebrow="The proof"
            title="Value delivered, confidence priced in"
            lede="Representative anonymised engagements: two tracks, one accountability structure. Detail available under NDA."
          />
          <div className="proof-results reveal">
            <div className="stats-row">
              <div className="stat-card">
                <Stat staticText="$128M" dark label="Opex unlocked vs a US$120M target (107%), independently verified by the client’s external auditor — operating-model redesign across 31 markets, span of control 5.1 → 5.8" />
              </div>
              <div className="stat-card" style={{ '--delay': '90ms' }}>
                <Stat staticText="42→91%" dark label="Synergy recovery on a stalled €15M programme, clearing 27 late milestones under new governance" />
              </div>
              <div className="stat-card" style={{ '--delay': '180ms' }}>
                <Stat staticText="<72 hrs" dark label="Deployment of pre-vetted senior partners across 12+ workstreams on a $250M carve-out" />
              </div>
            </div>
          </div>
          <div className="metrics-tracks">
            <div className="metrics-col reveal">
              <div className="metrics-col__head">
                <span className="metrics-col__tag">Track 1</span>
                <h3>Transformation Outcomes</h3>
              </div>
              <ul className="metrics-list">
                {[
                  ['40/60', 'Model', '40% fixed base + 60% earned on GL-verified outcomes.'],
                  ['85%+', 'Achievement rate', '85% of engagements hit 90%+ of target. 10% hit 75–89%. 5% under 75%, where we write off the fee.'],
                  ['$200–600M', 'Culture-friction risk', 'Post-merger culture friction exposure addressed (Gelfand / Gallup research).'],
                  ['Week 1–3', 'Baseline lockdown', 'Outcome definition and lockdown, on a signed Baseline Schedule.'],
                  ['175+', 'Combined partner years', '7 named partners, 25+ years average in deal advisory.'],
                ].map(([n, h, p]) => (
                  <li key={h}>
                    <div className="metrics-list__n">{n}</div>
                    <div className="metrics-list__c"><b>{h}.</b> {p}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="metrics-col metrics-col--alt reveal" style={{ '--delay': '90ms' }}>
              <div className="metrics-col__head">
                <span className="metrics-col__tag">Track 2</span>
                <h3>Interim Management</h3>
              </div>
              <ul className="metrics-list">
                {[
                  ['48 hrs', 'Deployment', 'Team on-site, intake complete; the first day of interim starts Week 1.'],
                  ['12+', 'Active placements', 'Full-time and fractional interim roles currently managed across PE portfolio.'],
                  ['£8K–£25K', 'Per month', 'Published pricing for interim CFO / COO / CIO, all-in, including benefits and taxes.'],
                  ['90%+', 'Retention rate', 'Placements stay for the full agreed duration; replacement guaranteed on departure.'],
                  ['9', 'Jurisdictions active', 'Execution across the UK, Europe and the UAE.'],
                ].map(([n, h, p]) => (
                  <li key={h}>
                    <div className="metrics-list__n">{n}</div>
                    <div className="metrics-list__c"><b>{h}.</b> {p}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
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

      {/* ---------- 40/60 MODEL TEASER ---------- */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <div className="model-split">
            <div>
              <SectionHead
                eyebrow="The model"
                title="The 40/60 risk-share fee model"
                lede="We replace time-and-materials billing with a structured model that puts our own fee at risk against the outcomes we agree with you."
              />
              <a className="link-arrow reveal" href="/advisory" style={{ marginTop: '8px' }}>
                See how the model works <ArrowRight />
              </a>
            </div>
            <div className="model-panel reveal">
              <FeeBar />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- IMAGE BAND ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="London · Barcelona"
            title="Senior operators, on the ground where the value is."
          />
          <Photo
            className="reveal photo--wide"
            tone="dark"
            suggest="Wide, understated hero shot, the London or Barcelona financial district at dusk, or a quiet, well-lit boardroom. Muted and desaturated, navy-toned; no stock-photo handshakes."
          />
        </div>
      </section>

      {/* ---------- TWO PATHS (routing) ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Two ways to work with us"
            title="Hands-on when it matters. Instrumented for the long run."
            lede="Bring us in to run the deal or the turnaround directly, or run your whole execution spine on the platform that grew out of it."
          />
          <TabbedPair className="paths-grid" ariaLabel="Two ways to work with us" labels={['Deal Advisory', 'TRANSFORM+']}>
            <div className="path-card reveal">
              <div className="path-card__mark"><Mark size={46} navy="#14284a" /></div>
              <span className="path-card__tag">RCK · Deal Advisory</span>
              <h3>Deal Advisory &amp; Interim Execution</h3>
              <p>
                One partner-led team from diligence to value realisation, on the 40/60 model , 
                senior operators in direct control, never sub-contracted.
              </p>
              <ul>
                <li>Due diligence, PMI, carve-outs &amp; TSA execution</li>
                <li>Value creation &amp; AI transformation</li>
                <li>Interim CFO / COO / CIO / CTrO, deployed in 72 hours</li>
              </ul>
              <div className="path-card__foot">
                <a className="btn btn-navy" href="/advisory">
                  Explore Deal Advisory <ArrowRight />
                </a>
              </div>
            </div>

            <div className="path-card path-card--platform reveal" style={{ '--delay': '90ms' }}>
              <div className="path-card__mark"><TransformMark size={48} /></div>
              <span className="path-card__tag">TRANSFORM+ · Platform</span>
              <h3>The Strategy-to-Value Platform</h3>
              <p>
                An independently verifiable trail from deal thesis to realised EBITDA, built on your
                existing Strategy → OKR → Sprint spine, with a cryptographically sealed audit trail.
              </p>
              <ul>
                <li>Seven modules on one execution spine</li>
                <li>Dual-mode delivery &amp; behavioural intelligence</li>
                <li>Gated M&amp;A mode with sealed, verifiable decisions</li>
              </ul>
              <div className="path-card__foot">
                <a className="btn btn-gold" href="/products/transform-plus">
                  Explore TRANSFORM+ <ArrowRight />
                </a>
              </div>
            </div>
          </TabbedPair>
        </div>
      </section>

      {/* ---------- ASSESSMENT INVITE ---------- */}
      <section className="section">
        <div className="container">
          <div className="assess-invite reveal">
            <div className="assess-invite__copy">
              <p className="eyebrow">Value-at-Risk Assessment</p>
              <h2>Not sure where you stand? Find out in two minutes.</h2>
              <p>
                Answer six quick questions and get a tailored Value-at-Risk report, your recommended
                path, where to focus first, and a mobilisation plan.
              </p>
            </div>
            <a className="btn btn-gold btn-lg" href="/diagnostics/value-at-risk">
              Take the Value-at-Risk Assessment <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ (FAQPage schema for rich results + AEO) ---------- */}
      <Faq
        id="home-faq"
        eyebrow="Common questions"
        title="The 40/60 model, answered"
        items={HOME_FAQ}
      />

      {/* ---------- GET IN TOUCH (contact form) ---------- */}
      <section className="section home-contact" id="contact-home">
        <div className="container home-contact__grid">
          <div className="home-contact__copy">
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <h2 className="home-contact__title">Ready to de-risk your next deal or transformation?</h2>
            <p className="home-contact__lede">
              Partner-led execution on a commercial model built around your outcomes, not our
              billable hours. Tell us where value is leaking; we&rsquo;ll reply within one business day.
            </p>
            <ul className="home-contact__facts">
              <li><strong>London</strong> · 117 Piccadilly, Mayfair · <a href="tel:+447812162288">+44 7812 162288</a></li>
              <li><strong>Barcelona</strong> · Avenida Diagonal 317 · <a href="tel:+34671779991">+34 671 77 9991</a></li>
              <li><a href="mailto:info@rckpm.es">info@rckpm.es</a></li>
            </ul>
            <p className="home-contact__alt">
              Prefer to start with a quick read of your exposure?{' '}
              <a className="link-arrow link-arrow--light" href="/diagnostics/value-at-risk">Take the Value-at-Risk Assessment <ArrowRight /></a>
            </p>
          </div>
          <div className="home-contact__form">
            <LeadForm
              fields={['name', 'company', 'email', 'message']}
              submitLabel="Book an executive strategy call"
              successTitle="Thank you, your request is in."
              successBody="A partner will be in touch within one business day."
            />
          </div>
        </div>
      </section>
    </>
  )
}
