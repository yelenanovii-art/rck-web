import { Check } from './Icons'

// The signature 40/60 risk-share visual.
export default function FeeBar() {
  return (
    <div className="feebar-block">
      <div className="feebar-label">
        <span>Total contract value</span>
        <span>Fee composition</span>
      </div>
      <div className="feebar">
        <div className="feebar__seg feebar__seg--base">
          <span className="feebar__pct">40%</span>
          <span className="feebar__lbl">Retained baseline</span>
        </div>
        <div className="feebar__seg feebar__seg--out">
          <span className="feebar__pct">60%</span>
          <span className="feebar__lbl">Performance-tied</span>
        </div>
      </div>
      <div className="feebar-caption">
        <span>Billed on time spent.</span>
        <span>Paid only once verified outcomes are met.</span>
      </div>

      <div className="trust-signal reveal">
        <span className="trust-signal__check">
          <Check size={15} />
        </span>
        <p>
          <strong>Every outcome</strong>, whether a TSA exit date, operating-model transition,
          synergy realisation, or target financial metric, is pegged to an objective baseline agreed
          during scoping. If the defined outcome is missed, the 60% is deferred until it is secured.
        </p>
      </div>
    </div>
  )
}
