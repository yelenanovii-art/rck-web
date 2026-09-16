import { useEffect, useState } from 'react'
import LeadForm from './LeadForm'
import { Check } from './Icons'
import {
  computeFee,
  buildSprintSchedule,
  computeRealised,
  computeScenarios,
  formatMoney,
  formatPct,
  sprintsToWeeks,
  sprintsToMonths,
  FX,
  COPY,
} from '../lib/rckFeeModel'

// Non-linear deal-size slider: fine £1M control at the low end (where most
// engagements sit), compressing toward a £250M+ cap.
const DEAL_MIN = 10
const DEAL_MAX = 250
const DEAL_CURVE = 2.5
const DEAL_POS_MAX = 1000
function snapDeal(d) {
  const step = d < 50 ? 1 : d < 100 ? 5 : 10
  return Math.round(d / step) * step
}
function posToDeal(pos) {
  const p = pos / DEAL_POS_MAX
  const raw = DEAL_MIN + (DEAL_MAX - DEAL_MIN) * Math.pow(p, DEAL_CURVE)
  return Math.min(DEAL_MAX, Math.max(DEAL_MIN, snapDeal(raw)))
}
function dealToPos(dealM) {
  const p = Math.pow((dealM - DEAL_MIN) / (DEAL_MAX - DEAL_MIN), 1 / DEAL_CURVE)
  return Math.round(p * DEAL_POS_MAX)
}

function Slider({ label, value, display, min, max, step, onChange, hint }) {
  return (
    <div className="slider">
      <div className="slider__top">
        <label>{label}</label>
        <span className="slider__val">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={display}
      />
      {hint && <p className="slider__hint">{hint}</p>}
    </div>
  )
}

export default function DealModeller() {
  const [view, setView] = useState('fee') // 'fee' | 'delay'

  // Shared / fee-model levers
  const [dealPos, setDealPos] = useState(() => dealToPos(100))
  const [upliftPct, setUpliftPct] = useState(10) // target EBITDA / value uplift
  const [outcomeFeePct, setOutcomeFeePct] = useState(10) // sets the outstanding 60% at signing
  const [dayRate, setDayRate] = useState(1800) // illustrative — subject to final pricing
  const [numSprints, setNumSprints] = useState(3) // 8-week sprints (illustrative default)
  const [currency, setCurrency] = useState('GBP')
  // Verification checkpoints — all sprints start verified; toggle one off to
  // simulate a missed sprint.
  const [verifiedList, setVerifiedList] = useState([1, 2, 3])
  const [unlocked, setUnlocked] = useState(false) // scenario table gate

  // Cost-of-delay lever
  const [leakPctYr, setLeakPctYr] = useState(3)

  const dealM = posToDeal(dealPos)
  const deal = dealM * 1e6
  const atCap = dealM >= DEAL_MAX
  const fmt = (n) => formatMoney(n, currency)
  // Full-precision, currency-aware formatter for the live ticker (compact form
  // would flicker as it counts up).
  const fmtFull = (n) => (FX[currency]?.symbol || '£') + Math.round(n * (FX[currency]?.rate || 1)).toLocaleString('en-GB')
  const dealDisplay = atCap ? fmt(deal) + '+' : fmt(deal)

  // Outcome fee model
  const f = computeFee(deal, upliftPct, outcomeFeePct, dayRate, numSprints)
  const schedule = buildSprintSchedule(numSprints, f.outstandingFee, f.timeFee)
  const verified = new Set(verifiedList.filter((n) => n <= numSprints))
  const realised = computeRealised(schedule, verified)
  const scenarios = computeScenarios(deal, upliftPct, outcomeFeePct, dayRate, numSprints)

  const weeks = sprintsToWeeks(numSprints)
  const months = sprintsToMonths(numSprints)
  const senseCheck = `≈${Math.round(f.impliedDays)} days across a ~${f.team}-person team over ${numSprints} sprint${numSprints > 1 ? 's' : ''} (${weeks} weeks) at ${fmt(dayRate)}/day/person (~${f.daysPerSprintPerPerson.toFixed(1)} days/sprint/person).`

  const toggleSprint = (n) =>
    setVerifiedList((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))

  // Keep the sprint slider and the verified set in step: when sprint count
  // changes, verify all sprints in range by default.
  useEffect(() => {
    setVerifiedList(Array.from({ length: numSprints }, (_, i) => i + 1))
  }, [numSprints])

  // Live "leaking now" counter (delay tab)
  const annual = deal * (leakPctYr / 100)
  const perWeek = annual / 52
  const perDay = annual / 365
  const perSprint = annual * (8 / 52) // one 8-week sprint — ties to the fee model's cadence
  const [leaked, setLeaked] = useState(0)
  useEffect(() => {
    if (view !== 'delay') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setLeaked(perDay); return }
    const perMs = annual / (365 * 24 * 60 * 60 * 1000)
    const start = performance.now()
    setLeaked(0)
    const id = setInterval(() => setLeaked(perMs * (performance.now() - start)), 60)
    return () => clearInterval(id)
  }, [view, annual, perDay])

  const hidden = {
    source: 'deal-value-modeller',
    view,
    currency,
    deal_size: dealDisplay,
    target_uplift: `${upliftPct}%`,
    outcome_fee_pct: `${outcomeFeePct}%`,
    sprints: String(numSprints),
    outstanding_fee: fmt(f.outstandingFee),
    time_fee: fmt(f.timeFee),
    total_fee: fmt(f.totalFee),
    value_erosion_per_year: fmt(annual),
  }

  return (
    <div className="modeller">
      <div className="modeller__tabs" role="tablist">
        <button role="tab" aria-selected={view === 'fee'} className={view === 'fee' ? 'is-active' : ''} onClick={() => setView('fee')}>
          Outcome fee
        </button>
        <button role="tab" aria-selected={view === 'delay'} className={view === 'delay' ? 'is-active' : ''} onClick={() => setView('delay')}>
          Cost of delay
        </button>
      </div>

      {view === 'fee' && <p className="modeller__subhead">{COPY.subhead}</p>}

      <div className="modeller__grid">
        {/* Controls */}
        <div className="modeller__controls">
          <div className="ccy-toggle" role="group" aria-label="Display currency">
            {Object.keys(FX).map((c) => (
              <button key={c} type="button" className={currency === c ? 'is-active' : ''} aria-pressed={currency === c} onClick={() => setCurrency(c)}>
                {c}
              </button>
            ))}
          </div>
          <Slider label="Deal / programme size" value={dealPos} display={dealDisplay} min={0} max={DEAL_POS_MAX} step={1} onChange={setDealPos} />
          {view === 'fee' ? (
            <>
              <Slider label="Target EBITDA / value uplift" value={upliftPct} display={`${upliftPct}%`} min={2} max={25} step={0.5} onChange={setUpliftPct} />
              <Slider label="Outcome fee (% of value created)" value={outcomeFeePct} display={`${outcomeFeePct}%`} min={5} max={15} step={0.5} onChange={setOutcomeFeePct} hint={COPY.outcomeFeeHint} />
              <Slider label="Programme length" value={numSprints} display={`${numSprints} sprint${numSprints > 1 ? 's' : ''} · ${weeks} wks · ~${months.toFixed(1)} mo`} min={1} max={12} step={1} onChange={setNumSprints} />
              <Slider label="Day rate (illustrative — subject to final pricing)" value={dayRate} display={`${fmt(dayRate)}/day`} min={1200} max={3000} step={100} onChange={setDayRate} />
              <p className="modeller__assump">{COPY.footer}</p>
            </>
          ) : (
            <>
              <Slider label="Estimated value erosion" value={leakPctYr} display={`${leakPctYr}% / yr`} min={1} max={10} step={0.5} onChange={setLeakPctYr} />
              <p className="modeller__assump">
                Illustrative. Value erosion covers synergy slippage, integration drift and stranded
                cost while a deal or transformation waits for senior execution.
              </p>
            </>
          )}
        </div>

        {/* Results */}
        <div className="modeller__results" key={view}>
          {view === 'fee' ? (
            <div className="res ofee">
              {/* Fee split line items */}
              <div className="ofee__lines">
                <div className="ofee__line">
                  <div className="ofee__line-head">
                    <span className="ofee__line-title">Outstanding fee — 60% · held back</span>
                    <b className="ofee__line-val tab-num">{fmt(f.outstandingFee)}</b>
                  </div>
                  <p className="ofee__line-sub">{COPY.outstandingFeeSub}</p>
                </div>
                <div className="ofee__line">
                  <div className="ofee__line-head">
                    <span className="ofee__line-title">Time-based fee — 40% · billed as delivered</span>
                    <b className="ofee__line-val tab-num">{fmt(f.timeFee)}</b>
                  </div>
                  <p className="ofee__line-sub">{senseCheck}{f.tight && <span className="ofee__flag"> · tight</span>}</p>
                </div>
              </div>

              <div className="split">
                <div className="split__bar">
                  <span className="split__base">40%</span>
                  <span className="split__risk">60%</span>
                </div>
                <div className="split__legend">
                  <span>Time-based · {fmt(f.timeFee)}</span>
                  <span>Outstanding · {fmt(f.outstandingFee)}</span>
                </div>
              </div>

              <div className="ofee__total">
                <div className="ofee__row"><span>Full agreed fee</span><b className="tab-num">{fmt(f.totalFee)}</b></div>
                <p className="ofee__total-cap">{COPY.totalFeeCaption}</p>
              </div>

              <p className="ofee__downside">{COPY.downside(fmt(f.totalFee))}</p>

              {/* Verification checkpoints */}
              <div className="checkpoints">
                <h4 className="checkpoints__h">What's contingent on verification</h4>
                <p className="checkpoints__intro">{COPY.checkpointsIntro}</p>
                <ul className="checkpoints__list">
                  {schedule.map((s) => {
                    const on = verified.has(s.sprint)
                    return (
                      <li key={s.sprint} className={`ckpt ${on ? 'is-on' : 'is-off'}`}>
                        <button type="button" className="ckpt__toggle" aria-pressed={on} onClick={() => toggleSprint(s.sprint)}>
                          <span className="ckpt__box">{on && <Check size={13} />}</span>
                          <span className="ckpt__label">Sprint {s.sprint} <span className="ckpt__weeks">Wks {s.weekStart}–{s.weekEnd}</span></span>
                        </button>
                        <span className="ckpt__amt tab-num">
                          <span className="ckpt__tranche">{fmt(s.outstandingTranche)}</span>
                          <span className="ckpt__state">{on ? 'verified · released' : 'criteria unmet · not earned'}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
                <div className="checkpoints__total">
                  <span>Realised so far</span>
                  <b className="tab-num">{fmt(realised.realised)} <span className="checkpoints__of">of {fmt(realised.totalPossible)}</span></b>
                </div>
                <p className="checkpoints__note">{COPY.contingencyNote}</p>
              </div>

              {/* Benchmark — track record, not a promise of extra fee */}
              <div className="ofee__bench">
                <div className="ofee__bench-stats">
                  <div><span className="tab-num">US$120M</span><small>target</small></div>
                  <div><span className="tab-num">US$128M</span><small>delivered</small></div>
                  <div><span className="tab-num">107%</span><small>of target</small></div>
                </div>
                <p className="ofee__bench-note">{COPY.benchmarkNote}</p>
              </div>
            </div>
          ) : (
            <div className="res">
              <div className="ticker">
                <span className="res__label">Value leaking since you opened this</span>
                <span className="ticker__big tab-num">{fmtFull(leaked)}</span>
              </div>
              <div className="chips chips--wrap">
                <div className="chip-stat"><span className="chip-stat__k">Per day</span><span className="chip-stat__v tab-num">{fmtFull(perDay)}</span></div>
                <div className="chip-stat"><span className="chip-stat__k">Per week</span><span className="chip-stat__v tab-num">{fmt(perWeek)}</span></div>
                <div className="chip-stat"><span className="chip-stat__k">Per 8-wk sprint</span><span className="chip-stat__v tab-num">{fmt(perSprint)}</span></div>
                <div className="chip-stat"><span className="chip-stat__k">Per year</span><span className="chip-stat__v tab-num">{fmt(annual)}</span></div>
              </div>
              <p className="res__compare">
                Every 8-week sprint you wait ≈ <b>{fmt(perSprint)}</b> of leaked value — the same
                cadence RCK releases fee tranches on, paid only against verified outcomes. A senior
                partner is in seat in Week 1 (~<b>{fmtFull(perDay * 3)}</b> of exposure), not
                months.
              </p>
              <p className="modeller__assump" style={{ marginTop: 14 }}>
                Illustrative, not a quote. Value erosion is a modelling assumption, not a forecast of
                your specific deal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lead capture — the gate unlocks the scenario range + a tailored line */}
      <div className="modeller__cta">
        {view === 'fee' && unlocked ? (
          <div className="scenario-unlocked">
            <h3>Target scenarios</h3>
            <p className="scenario-sub">Each row is a different target set at signing — not a reward for over-delivery. The fee is fixed against whichever target you agree.</p>
            <div className="table-scroll">
              <table className="compare scenario-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Target uplift</th>
                    <th>Value created</th>
                    <th>Outstanding (60%)</th>
                    <th className="hi">Full agreed fee</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s) => (
                    <tr key={s.label}>
                      <th className="rowlabel">{s.label}</th>
                      <td className="tab-num">{formatPct(s.uplift)}</td>
                      <td className="tab-num">{fmt(s.valueCreated)}</td>
                      <td className="tab-num">{fmt(s.outstandingFee)}</td>
                      <td className="hi tab-num">{fmt(s.totalFee)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="scenario-hook">{COPY.followUpHook(fmt(f.outstandingFee), dealDisplay)}</p>
          </div>
        ) : (
          <>
            <div className="modeller__cta-copy">
              <h3>Get the board-ready breakdown</h3>
              <p>
                {view === 'fee'
                  ? 'Unlock the conservative / base / stretch target scenarios and get a tailored version emailed to you. A partner follows up within one business day.'
                  : 'We’ll email a tailored version of these numbers and follow up within one business day.'}
              </p>
            </div>
            <LeadForm
              fields={['name', 'company', 'email']}
              submitLabel={view === 'fee' ? 'Unlock scenarios & email me the breakdown' : 'Email me the breakdown'}
              note="Illustrative figures. No spam — one follow-up from a partner."
              manageSuccess={view !== 'fee'}
              onSubmitted={() => { if (view === 'fee') setUnlocked(true) }}
              successTitle="Your breakdown is on its way."
              successBody="Check your inbox shortly. A partner will follow up within one business day."
              hidden={hidden}
            />
          </>
        )}
      </div>
    </div>
  )
}
