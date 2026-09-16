import { useMemo, useState } from 'react'
import { QUESTIONS, scoreQuiz } from '../data/quiz'
import LeadForm from './LeadForm'
import { ArrowRight, Check } from './Icons'

const PATHS = {
  advisory: {
    title: 'Partner-led Deal Advisory & Interim Execution',
    href: '/advisory',
    cta: 'Explore Deal Advisory',
    blurb:
      'One partner-led team from diligence to value realisation, on the 40/60 model, senior operators in direct control, with 60% of the fee tied to independently verified milestones.',
  },
  platform: {
    title: 'The TRANSFORM+ Platform',
    href: '/products/transform-plus',
    cta: 'Explore TRANSFORM+',
    blurb:
      'An instrumented execution spine with a cryptographically sealed, independently verifiable audit trail, from deal thesis to realised EBITDA.',
  },
  both: {
    title: 'Deal Advisory + TRANSFORM+',
    href: '/advisory',
    cta: 'See how they work together',
    blurb:
      'Hands-on partner-led execution now, instrumented and sealed for the long run, the advisory team runs the deal while TRANSFORM+ makes every outcome verifiable.',
  },
}

function packageFor(result) {
  if (result.path === 'advisory') return null
  return result.size === 'l' || result.size === 'xl'
    ? 'TRANSFORM+ Continuity, the M&A integration package, scoped to deal size.'
    : 'TRANSFORM+ Foundations, custom-scoped delivery governance.'
}

export default function Quiz() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState('quiz') // 'quiz' | 'gate' | 'report'

  const result = useMemo(() => scoreQuiz(answers), [answers])
  const q = QUESTIONS[idx]
  const total = QUESTIONS.length
  const answeredCount = Object.keys(answers).length
  const progress =
    stage === 'quiz' ? (answeredCount / (total + 1)) * 100 : stage === 'gate' ? (total / (total + 1)) * 100 : 100

  const select = (opt) => {
    setAnswers((a) => ({ ...a, [q.id]: opt.v }))
    if (idx < total - 1) setIdx(idx + 1)
    else setStage('gate')
  }

  const back = () => {
    if (stage === 'gate') { setStage('quiz'); return }
    if (idx > 0) setIdx(idx - 1)
  }

  const restart = () => { setAnswers({}); setIdx(0); setStage('quiz') }

  const path = PATHS[result.path]

  return (
    <div className="quiz">
      {/* progress */}
      <div className="quiz__bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* ---------- QUESTIONS ---------- */}
      {stage === 'quiz' && (
        <div className="quiz__step" key={idx}>
          <div className="quiz__meta">
            <span>Question {idx + 1} of {total}</span>
            {q.help && <span className="quiz__help">{q.help}</span>}
          </div>
          <h3 className="quiz__q">{q.q}</h3>
          <div className="quiz__options">
            {q.options.map((opt) => (
              <button
                key={opt.v}
                className={`quiz__opt ${answers[q.id] === opt.v ? 'is-selected' : ''}`}
                onClick={() => select(opt)}
              >
                <span>{opt.label}</span>
                <span className="quiz__opt-mark"><ArrowRight /></span>
              </button>
            ))}
          </div>
          <div className="quiz__nav">
            <button className="quiz__back" onClick={back} disabled={idx === 0}>← Back</button>
          </div>
        </div>
      )}

      {/* ---------- GATE (partial result + lead form) ---------- */}
      {stage === 'gate' && (
        <div className="quiz__step quiz__gate" key="gate">
          <div className="quiz__result-head">
            <div className="result-band" data-band={result.band}>
              <span className="result-band__label">Value-at-Risk readiness</span>
              <span className="result-band__val">{result.band}</span>
            </div>
            <div className="result-meter" aria-label={`Readiness ${result.pct}%`}>
              <div className="result-meter__track"><span style={{ width: `${result.pct}%` }} /></div>
              <span className="result-meter__pct">{result.pct}%</span>
            </div>
          </div>

          <h3 className="quiz__q">Your recommended path: {path.title}</h3>
          <p className="quiz__gate-lede">
            Based on your answers, here&rsquo;s the headline. Enter your details to unlock the full,
            personalised Value-at-Risk report, recommended focus area, commercial fit and next steps.
          </p>

          <div className="quiz__locked" aria-hidden="true">
            <ul>
              <li>Recommended focus: {result.area || 'tailored to your inputs'}</li>
              <li>Commercial model best matched to your deal size</li>
              <li>Whether the 40/60 model or TRANSFORM+ fits, and why</li>
              <li>Your 3-step mobilisation plan</li>
            </ul>
            <div className="quiz__locked-fade"><span className="quiz__lock">🔒 Unlock full report</span></div>
          </div>

          <div className="quiz__form">
            <LeadForm
              fields={['name', 'company', 'email', 'phone']}
              submitLabel="Unlock my full report"
              note="No spam. We’ll email your report and follow up within one business day."
              manageSuccess={false}
              hidden={{
                source: 'deal-readiness-quiz',
                readiness: `${result.pct}% (${result.band})`,
                recommended_path: result.path,
                focus_area: result.area || '',
                deal_size: result.size,
              }}
              onSubmitted={() => setStage('report')}
            />
          </div>
          <div className="quiz__nav">
            <button className="quiz__back" onClick={back}>← Back</button>
          </div>
        </div>
      )}

      {/* ---------- FULL REPORT ---------- */}
      {stage === 'report' && (
        <div className="quiz__step quiz__report" key="report">
          <div className="quiz__report-badge"><Check size={18} /> Your full report</div>
          <div className="quiz__result-head">
            <div className="result-band" data-band={result.band}>
              <span className="result-band__label">Value-at-Risk readiness</span>
              <span className="result-band__val">{result.band}</span>
            </div>
            <div className="result-meter">
              <div className="result-meter__track"><span style={{ width: `${result.pct}%` }} /></div>
              <span className="result-meter__pct">{result.pct}%</span>
            </div>
          </div>

          <div className="report-grid">
            <div className="report-card">
              <h4>Recommended path</h4>
              <p className="report-card__title">{path.title}</p>
              <p>{path.blurb}</p>
              <a className="link-arrow" href={path.href}>{path.cta} <ArrowRight /></a>
            </div>
            {result.area && (
              <div className="report-card">
                <h4>Where to focus first</h4>
                <p className="report-card__title">{result.area}</p>
                <p>This is where value is most at risk in your situation, the right place to set the baseline before controls bite.</p>
              </div>
            )}
            <div className="report-card">
              <h4>Commercial fit</h4>
              <p className="report-card__title">
                {result.path === 'platform' ? packageFor(result) : 'The 40/60 risk-share model'}
              </p>
              <p>
                {result.path === 'platform'
                  ? 'Scoped to your programme, deployed on your existing systems.'
                  : '40% billed on time spent, 60% released only once acceptance criteria are met. If criteria are unmet, the 60%.'}
              </p>
              {packageFor(result) && result.path !== 'platform' && (
                <p className="report-card__aside">Platform option: {packageFor(result)}</p>
              )}
            </div>
            <div className="report-card">
              <h4>{result.urgent ? 'Priority, move now' : 'Your next step'}</h4>
              <p className="report-card__title">
                {result.urgent ? 'Senior partner in seat in Week 1' : 'A 30-minute partner strategy call'}
              </p>
              <p>We’ve emailed this report to you. A partner will follow up within one business day to pressure-test it.</p>
              <a className="btn btn-navy" href="/contact">Book a strategy call <ArrowRight /></a>
            </div>
          </div>

          <button className="quiz__restart" onClick={restart}>↻ Retake the assessment</button>
        </div>
      )}
    </div>
  )
}
