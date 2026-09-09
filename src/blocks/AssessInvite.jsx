import { storyblokEditable } from '@storyblok/react'
import { ArrowRight } from '../components/Icons'

export default function AssessInvite({ blok }) {
  return (
    <section className="section" {...storyblokEditable(blok)}>
      <div className="container">
        <div className="assess-invite reveal">
          <div className="assess-invite__copy">
            <p className="eyebrow">{blok.eyebrow}</p>
            <h2>{blok.title}</h2>
            <p>{blok.body}</p>
          </div>
          <a className="btn btn-gold btn-lg" href={blok.cta_url}>
            {blok.cta_label} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
