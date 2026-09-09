import { ArrowRight } from './Icons'

// Closing call-to-action band. Reused at the foot of every page.
export default function CTABand({
  eyebrow = 'Get started',
  title,
  copy,
  primary = { label: 'Book an Executive Strategy Call', href: '/contact' },
  secondary,
  variant = 'default', // 'default' | 'platform'
  note,
}) {
  return (
    <section className={`cta-band cta-band--${variant}`}>
      <div className="container cta-band__inner reveal">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h2 className="cta-band__title">{title}</h2>
        {copy && <p className="cta-band__copy">{copy}</p>}
        <div className="cta-band__actions">
          <a className="btn btn-gold btn-lg" href={primary.href}>
            {primary.label} <ArrowRight />
          </a>
          {secondary && (
            <a className="btn btn-outline-light btn-lg" href={secondary.href}>
              {secondary.label}
            </a>
          )}
        </div>
        {note && <p className="cta-band__note">{note}</p>}
      </div>
    </section>
  )
}
