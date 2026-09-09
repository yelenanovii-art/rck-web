import { storyblokEditable } from '@storyblok/react'
import BorderBeamPanel from '../components/BorderBeamPanel'
import Emph from './Emph'
import { ArrowRight } from '../components/Icons'

// Hero. `positioning` is the small gold eyebrow kicker (the three service
// pillars); `headline` is the distinct H1 hook. They must NOT be the same text
// — rendering one string in both roles reads as duplicated copy. Until a
// `headline` field is added to the hero block in Storyblok, we fall back to the
// approved default so the H1 is never empty.
export default function HeroHome({ blok }) {
  const headline = blok.headline || 'We put 60% of our fee at risk against your outcomes.'
  return (
    <section className="hero hero--home hero--v2" {...storyblokEditable(blok)}>
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light">{blok.positioning}</p>
          <h1 className="hero__title">{headline}</h1>
          <p className="hero__sub">
            <b className="hero__sub-hl">{blok.sub_bold}</b>{' '}
            {blok.sub_rest}
          </p>
          <div className="hero__actions">
            <a
              className="btn btn-gold btn-lg"
              href={blok.cta_primary_url}
              data-utm-source="homepage"
              data-utm-medium="hero"
              data-utm-campaign="readiness_score"
            >
              {blok.cta_primary_label} <ArrowRight />
            </a>
            <a
              className="btn btn-paper btn-lg"
              href={blok.cta_secondary_url}
              data-utm-source="homepage"
              data-utm-medium="hero"
              data-utm-campaign="playbook_download"
            >
              {blok.cta_secondary_label}
            </a>
          </div>
          <div className="hero__meta">{blok.meta}</div>
        </div>

        <BorderBeamPanel className="hero__panel reveal" radius={22} thickness={2}>
          <div className="hero__panel-top">
            <img className="hero__panel-logo" src="/brand/rck-logo-white.png" alt="RCK" />
            <span className="hero__panel-model">{blok.panel_model}</span>
            <div className="hero__panel-fig">{blok.panel_figure}</div>
          </div>
          <p className="hero__panel-cap"><Emph text={blok.panel_caption} /></p>
          <div className="mini-bar">
            <span className="mini-bar__base">{blok.bar_base}</span>
            <span className="mini-bar__out">{blok.bar_out}</span>
          </div>
          <div className="mini-bar-legend">
            <span>{blok.legend_base}</span>
            <span>{blok.legend_out}</span>
          </div>
        </BorderBeamPanel>
      </div>
    </section>
  )
}
