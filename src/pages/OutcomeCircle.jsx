import { useState } from 'react'
import { scrollToId } from '../hooks/useRoute'
import { submitForm } from '../lib/submitForm'
import { ArrowRight, Check } from '../components/Icons'

// /the-outcome-circle — invitation-only operator collective (dark-mode page).
const STATS = [
  ['200+', 'Vetted C-Suite Bench'],
  ['£4.5B+', 'Value Supported'],
]

const PILLARS = [
  ['01', 'High-Value PE Mandates', 'Direct access to complex carve-outs, PMI, and transformation programmes without agency friction or intermediary markups.'],
  ['02', 'Shared Execution Playbooks', 'Deploy using RCK’s proprietary TRANSFORM+ operating system and proven playbooks rather than inventing frameworks from scratch.'],
  ['03', 'Closed-Door Peer Clinics', 'Confidential Chatham House roundtables in London and Barcelona to pressure-test live deal bottlenecks with fellow C-suite operators.'],
]

const STANDARDS = [
  'Minimum 10+ years in C-suite, Board, or Managing Director operational roles.',
  'Proven track record in PE value creation, carve-outs, M&A integration, or turnarounds.',
  'Commitment to milestone-verified, fee-at-risk commercial models.',
]

const DEAL_EXPERIENCE = ['PE-Backed Portfolio', 'Carve-Outs & TSAs', 'Post-Merger Integration', 'Turnaround & Restructuring']

function ApplicationForm() {
  const [status, setStatus] = useState('idle') // idle | sending | error | done

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    // Consolidate the checkbox group into a single field.
    fd.set('deal_experience', fd.getAll('deal_experience').join(', '))
    fd.set('outcome_aligned', fd.get('outcome_aligned') ? 'Yes' : 'No')
    // Drop the file input entirely if no CV was attached.
    const cv = fd.get('cv')
    if (!cv || (cv.size === 0 && cv.name === '')) fd.delete('cv')
    fd.append('_subject', 'The Outcome Circle — application to join')
    fd.append('source', 'outcome-circle-application')
    setStatus('sending')
    const res = await submitForm(fd, { formName: 'outcome-circle' })
    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="oc-success">
        <span className="oc-success__check"><Check size={22} /></span>
        <h3>Application Received</h3>
        <p>
          Thank you for your interest in The Outcome Circle™. An RCK Managing Partner will review
          your credentials against our upcoming portfolio mandates and deal clinics within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="oc-form" onSubmit={handleSubmit}>
      <div className="oc-field-row">
        <label className="oc-field">
          <span>Full name <i>*</i></span>
          <input name="name" type="text" required placeholder="Jane Doe" />
        </label>
        <label className="oc-field">
          <span>Executive email <i>*</i></span>
          <input name="email" type="email" required placeholder="jane@company.com" />
        </label>
      </div>

      <div className="oc-field-row">
        <label className="oc-field">
          <span>Phone / WhatsApp <i>*</i></span>
          <input name="phone" type="tel" required placeholder="+44 …" />
        </label>
        <label className="oc-field">
          <span>Primary location <i>*</i></span>
          <select name="location" required defaultValue="">
            <option value="" disabled>Select…</option>
            <option>UK</option>
            <option>Spain</option>
            <option>Other EU</option>
          </select>
        </label>
      </div>

      <label className="oc-field">
        <span>LinkedIn profile URL <i>*</i></span>
        <input name="linkedin" type="url" required placeholder="https://linkedin.com/in/…" />
      </label>

      <label className="oc-field">
        <span>Primary role <i>*</i></span>
        <select name="primary_role" required defaultValue="">
          <option value="" disabled>Select…</option>
          <option>Interim CFO</option>
          <option>Interim COO</option>
          <option>Interim CIO/CTO</option>
          <option>Transformation Director</option>
          <option>Carve-Out Specialist</option>
        </select>
      </label>

      <fieldset className="oc-field oc-checkgroup">
        <legend>Deal experience</legend>
        <div className="oc-checks">
          {DEAL_EXPERIENCE.map((d) => (
            <label className="oc-check" key={d}>
              <input type="checkbox" name="deal_experience" value={d} />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="oc-field">
        <span>Availability <i>*</i></span>
        <select name="availability" required defaultValue="">
          <option value="" disabled>Select…</option>
          <option>Immediate (72h–2w)</option>
          <option>30 Days</option>
          <option>60–90 Days</option>
          <option>Currently on Mandate</option>
        </select>
      </label>

      <label className="oc-field">
        <span>Recent mandate <em>(optional)</em></span>
        <textarea name="recent_mandate" maxLength={300} rows={3} placeholder="Briefly describe your most recent PE / transformation mandate (max 300 characters)." />
      </label>

      <label className="oc-field">
        <span>Attach your CV <em>(optional · PDF or Word)</em></span>
        <input
          className="oc-file"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        <small className="oc-file-hint">Confidential. Reviewed only by an RCK Managing Partner.</small>
      </label>

      <label className="oc-check oc-check--gate">
        <input type="checkbox" name="outcome_aligned" required />
        <span>I am willing to operate under milestone-linked, fee-at-risk compensation structures. <i>*</i></span>
      </label>

      <button className="btn btn-gold btn-lg oc-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Submit Application for Peer Review'}
        {status !== 'sending' && <ArrowRight />}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong sending your application. Please try again, or email{' '}
          <a href="mailto:info@rckpm.es">info@rckpm.es</a>.
        </p>
      )}
    </form>
  )
}

export default function OutcomeCircle() {
  return (
    <div className="oc">
      {/* ---------- HERO ---------- */}
      <section className="oc-hero" id="hero">
        <div className="container oc-hero__inner">
          <div className="oc-hero__copy">
            <p className="oc-badge">An invitation-only operator collective</p>
            <h1 className="oc-h1">
              The Outcome Circle™: A Curated Collective of Elite Interim CxOs and{' '}
              <em>PE Operators</em>.
            </h1>
            <p className="oc-lead">
              We do not operate a generalist talent pool or an unvetted recruitment database. The
              Outcome Circle™ is a curated collective of 200+ battle-tested European Interim CFOs,
              COOs, CIOs, and Transformation Leaders.
            </p>
            <a className="btn btn-gold btn-lg" href="#application-form" onClick={(e) => scrollToId(e, 'application-form')}>
              Apply to Join <ArrowRight />
            </a>
          </div>

          <div className="oc-stats">
            {STATS.map(([n, l]) => (
              <div className="oc-stat" key={l}>
                <div className="oc-stat__n">{n}</div>
                <div className="oc-stat__l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VALUE PILLARS ---------- */}
      <section className="oc-sec oc-pillars-sec" id="pillars">
        <div className="container">
          <div className="oc-pillars">
            {PILLARS.map(([n, h, p]) => (
              <article className="oc-pillar reveal" key={n}>
                <span className="oc-pillar__n">{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- QUALIFICATION GATE ---------- */}
      <section className="oc-sec oc-standards-sec" id="standards">
        <div className="container">
          <div className="oc-gate reveal">
            <h3>The Standard for Admission</h3>
            <p className="oc-gate__sub">
              Joining is strictly restricted to seasoned practitioners with a proven track record
              of board-level execution.
            </p>
            <ul className="oc-gate__list">
              {STANDARDS.map((s) => (
                <li key={s}><span className="oc-gate__mark"><Check size={14} /></span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- INTAKE FORM ---------- */}
      <section className="oc-sec oc-form-sec" id="application-form">
        <div className="container oc-form-wrap">
          <div className="oc-form-head">
            <p className="oc-badge">Associate intake</p>
            <h2 className="oc-form-title">Apply to The Outcome Circle™</h2>
            <p className="oc-form-note">
              Reviewed by an RCK Managing Partner. Confidential — your details are never shared.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </div>
  )
}
