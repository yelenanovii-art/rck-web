import { ArrowRight } from '../components/Icons'

// 404 page. Rendered for any unmatched route; useSeo marks it noindex via the
// `known={false}` flag in App.jsx, so search engines don't index dead URLs.
const LINKS = [
  ['/services/deal-advisory-carve-outs', 'Deal Advisory & Carve-Outs'],
  ['/services/interim-management', 'Interim & Fractional Leadership'],
  ['/about/outcomes-vs-advisory', 'The 40/60 Outcome Model'],
  ['/case-studies', 'Case Studies'],
  ['/insights', 'Insights'],
  ['/about/team', 'Meet the Partners'],
]

export default function NotFound() {
  return (
    <>
      <section className="hero hero--sub hero--article notfound">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Error 404</p>
          <h1 className="hero__title">This page has been carved out.</h1>
          <p className="hero__sub">
            The page you were looking for has moved or no longer exists. Let’s get you back to
            something useful.
          </p>
          <div className="notfound__actions">
            <a className="btn btn-gold btn-lg" href="/">
              Back to home <ArrowRight />
            </a>
            <a className="btn btn-outline-light btn-lg" href="/contact">
              Talk to a partner
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="notfound__lead">Popular destinations</p>
          <ul className="notfound__links">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href}>
                  <span>{label}</span>
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
