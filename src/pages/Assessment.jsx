import Quiz from '../components/Quiz'
import { Check } from '../components/Icons'

export default function Assessment() {
  return (
    <>
      <section className="hero hero--sub">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Value-at-Risk Assessment · 2 minutes</p>
          <h1 className="hero__title">How exposed is your next deal?</h1>
          <p className="hero__sub">
            Six quick questions. Get a tailored Value-at-Risk report, your recommended path,
            where to focus first, the commercial fit, and a mobilisation plan.
          </p>
          <ul className="hero__ticks">
            <li><Check size={15} /> Takes about two minutes</li>
            <li><Check size={15} /> Personalised, not a brochure</li>
            <li><Check size={15} /> Reviewed by a partner, not a bot</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container quiz-wrap">
          <Quiz />
        </div>
      </section>
    </>
  )
}
