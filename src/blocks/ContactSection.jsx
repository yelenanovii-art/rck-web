import { storyblokEditable } from '@storyblok/react'
import LeadForm from '../components/LeadForm'
import { ArrowRight } from '../components/Icons'

export default function ContactSection({ blok }) {
  return (
    <section className="section home-contact" id={blok.anchor || 'contact-home'} {...storyblokEditable(blok)}>
      <div className="container home-contact__grid">
        <div className="home-contact__copy">
          <p className="eyebrow eyebrow--light">{blok.eyebrow}</p>
          <h2 className="home-contact__title">{blok.title}</h2>
          <p className="home-contact__lede">{blok.lede}</p>
          <ul className="home-contact__facts">
            {(blok.facts || []).map((f) => (
              <li key={f._uid}>
                {f.label && <strong>{f.label}</strong>}
                {f.label && f.text ? ' · ' : ''}
                {f.text}
                {f.link_label && (f.label || f.text) ? ' · ' : ''}
                {f.link_label && <a href={f.link_url}>{f.link_label}</a>}
              </li>
            ))}
          </ul>
          <p className="home-contact__alt">
            {blok.alt_text}{' '}
            <a className="link-arrow link-arrow--light" href={blok.alt_link_url}>
              {blok.alt_link_label} <ArrowRight />
            </a>
          </p>
        </div>
        <div className="home-contact__form">
          <LeadForm
            fields={['name', 'company', 'email', 'message']}
            submitLabel={blok.submit_label}
            successTitle={blok.success_title}
            successBody={blok.success_body}
          />
        </div>
      </div>
    </section>
  )
}
