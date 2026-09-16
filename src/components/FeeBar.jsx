import { Check } from './Icons'

// The signature 40/60 split visual.
//
// Ticket B2 — only the canonical fee page may carry the full composition
// widget. Everywhere else the permitted treatment is the split graphic (or the
// two numbers) plus a link, so `full` is opt-in and the TSA/GL paragraph and
// the composition caption render only when it is set. Defaulting to the trimmed
// form means a new page cannot accidentally restate the mechanism.
export default function FeeBar({ full = false }) {
  return (
    <div className="feebar-block">
      <div className="feebar-label">
        <span>Total contract value</span>
        <span>Fee composition</span>
      </div>
      <div className="feebar">
        <div className="feebar__seg feebar__seg--base">
          <span className="feebar__pct">40%</span>
          <span className="feebar__lbl">Billed on time spent</span>
        </div>
        <div className="feebar__seg feebar__seg--out">
          <span className="feebar__pct">60%</span>
          <span className="feebar__lbl">Released against outcomes</span>
        </div>
      </div>
      {full && (
        <>
          <div className="feebar-caption">
            <span>40% billed on time spent from kickoff.</span>
            <span>60% billed through rolling sprints against agreed outcomes.</span>
          </div>

          <div className="trust-signal reveal">
            <span className="trust-signal__check">
              <Check size={15} />
            </span>
            <p>
              <strong>Every outcome</strong>, whether a TSA (transitional services agreement) exit
              date, operating-model transition, synergy realisation, or target financial metric, is
              pegged to an objective baseline agreed during scoping. The 60% is not earned until
              those acceptance criteria are met.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
