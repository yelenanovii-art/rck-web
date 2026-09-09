import { useState } from 'react'
import LeadForm from '../components/LeadForm'
import { ArrowRight } from '../components/Icons'

// /diagnostics/readiness-score — the RCK Readiness Score.
// Reads an organisation against the Adizes corporate lifecycle across four
// mandate-specific tracks. The intro, score bands and track chooser below are
// final; the browser-side six-question run + per-stage scoring wires in once
// the question bank / weightings / result screen are signed off (see note).

const BANDS = [
  { key: 'low', dot: '#5b8def', range: '0 to 33 · Low alignment', body: 'Stage passed, or not yet reached. Its pressures are not active.', action: 'Maintain foundation' },
  { key: 'transition', dot: '#e0a83c', range: '34 to 67 · Transition', body: 'Operating within or moving through this stage. Execution can be inconsistent here.', action: 'Build capability' },
  { key: 'pressure', dot: '#d1553f', range: '68 to 100 · Pressure zone', body: "Strong alignment with this stage's pressures. Decisions stall and value creation slows.", action: 'Redesign leadership' },
]

const TRACKS = [
  { key: 'ma', title: 'M&A: Diligence, PMI & Carve-Outs', body: 'Where value leaks between diligence, integration and exit.', meta: '6 questions · Deal and integration language' },
  { key: 'value', title: 'Value Creation & Cost Transformation', body: 'Whether the savings in the plan will reach the ledger.', meta: '6 questions · Cost and margin language' },
  { key: 'restructuring', title: 'Restructuring & Turnaround', body: 'Whether the plan and the team can hold under cash pressure.', meta: '6 questions · Cash and recovery language' },
  { key: 'erp', title: 'ERP & Enterprise Applications', body: 'Whether the programme will deliver the business case, not just go live.', meta: '6 questions · Programme and adoption language' },
]

export default function ReadinessScore() {
  const [track, setTrack] = useState(null)

  const selected = TRACKS.find((t) => t.key === track)

  return (
    <div className="rs">
      <section className="rs-hero">
        <div className="container">
          <div className="rs-top">
            <span className="rs-wordmark">RCK <em>Outcome Partners</em></span>
          </div>

          <p className="rs-eyebrow">Free diagnostic · Four tracks · Under three minutes</p>
          <h1 className="rs-h1">Where is the squeeze in your value creation plan?</h1>
          <p className="rs-lead">
            Six questions read your organisation against the corporate lifecycle: where execution is
            working, where capability is under strain, and where value creation is at risk. Instant
            result, no sign-up needed to see your stage.
          </p>
          <p className="rs-lead rs-lead--muted">
            <strong>How it reads your answers.</strong> Each answer signals alignment with a lifecycle
            stage, from Courtship through to Stable-Ageing. The higher a stage&rsquo;s percentage, the
            more your organisation is operating inside that stage&rsquo;s conditions and pressures.
            Based on the Adizes corporate lifecycle.
          </p>

          <div className="rs-bands">
            {BANDS.map((b) => (
              <div className="rs-band" key={b.key}>
                <div className="rs-band__head">
                  <span className="rs-band__dot" style={{ background: b.dot }} />
                  <span className="rs-band__range">{b.range}</span>
                </div>
                <p className="rs-band__body">{b.body}</p>
                <p className="rs-band__action">Action: {b.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-choose">
        <div className="container">
          <h2 className="rs-h2">Choose your diagnostic</h2>
          <p className="rs-sub">
            Each track asks six questions in the language of that mandate. All four read the same
            lifecycle underneath.
          </p>

          <div className="rs-tracks">
            {TRACKS.map((t) => {
              const on = track === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  className={`rs-track ${on ? 'is-selected' : ''}`}
                  aria-pressed={on}
                  onClick={() => setTrack(t.key)}
                >
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                  <span className="rs-track__meta">{t.meta}</span>
                </button>
              )
            })}
          </div>

          {/* Interim: the self-serve six-question run wires in once the question
              bank + weightings + result screen are signed off. Until then a
              selected track routes to a partner-run score request. */}
          <div className="rs-start" id="rs-start">
            {selected ? (
              <div className="rs-start__form">
                <h3>Get your Readiness Score — {selected.title.split(':')[0]}</h3>
                <p className="rs-start__note">
                  The self-serve six-question run is in final content sign-off. Request your score and
                  a partner will run the {selected.meta.split(' · ')[1].toLowerCase()} assessment with
                  you and send the lifecycle read within one business day.
                </p>
                <LeadForm
                  fields={['name', 'company', 'email']}
                  submitLabel="Request my Readiness Score"
                  note="Calculated against the Adizes lifecycle. No spam — one follow-up from a partner."
                  successTitle="Your Readiness Score request is in."
                  successBody="A partner will be in touch within one business day to run your assessment."
                  hidden={{ source: 'readiness-score', track: selected.key }}
                />
              </div>
            ) : (
              <p className="rs-start__hint">Select a track above to begin. <ArrowRight /></p>
            )}
          </div>

          <div className="rs-notes">
            <p>
              The RCK Readiness Score reads your answers against the Adizes corporate lifecycle.
              Percentages indicate alignment with each stage&rsquo;s conditions and pressures, not
              performance grades. Benchmark language is illustrative pending real cohort data. Results
              are calculated in your browser and are not stored; a report is emailed only if you
              request one.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
