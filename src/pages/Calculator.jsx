import DealModeller from '../components/DealModeller'
import { Check } from '../components/Icons'

export default function Calculator() {
  return (
    <>
      <section className="hero hero--sub">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Deal Value Modeller</p>
          <h1 className="hero__title">See what the 40/60 model means for your deal.</h1>
          <p className="hero__sub">
            Move the sliders to model the value at stake, how much of our fee is actually at risk,
            and what waiting is costing you. Illustrative, and yours in about a minute.
          </p>
          <ul className="hero__ticks">
            <li><Check size={15} /> Upside and cost-of-delay in one view</li>
            <li><Check size={15} /> Built around the 40/60 risk-share model</li>
            <li><Check size={15} /> Board-ready breakdown on request</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container quiz-wrap">
          <DealModeller />
        </div>
      </section>
    </>
  )
}
