import { storyblokEditable } from '@storyblok/react'
import TabbedPair from '../components/TabbedPair'
import { ArrowRight } from '../components/Icons'

const labelsOf = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean)

export default function DualTrack({ blok }) {
  const tracks = blok.tracks || []
  return (
    <section className="section dualtrack" {...storyblokEditable(blok)}>
      <div className="container">
        <div className="dualtrack__head reveal">
          <p className="eyebrow">{blok.eyebrow}</p>
          <h2 className="dualtrack__title">{blok.title}</h2>
        </div>
        <TabbedPair
          className="dualtrack__grid"
          ariaLabel="Two core ways to work with us"
          labels={labelsOf(blok.tab_labels)}
        >
          {tracks.map((t, i) => (
            <article
              className="track-card reveal"
              key={t._uid}
              style={i ? { '--delay': `${i * 90}ms` } : undefined}
              {...storyblokEditable(t)}
            >
              <span className="track-card__tag">{t.tag}</span>
              <h3>{t.title}</h3>
              <dl className="track-card__meta">
                <div><dt>For</dt><dd>{t.meta_for}</dd></div>
                <div><dt>Model</dt><dd>{t.meta_model}</dd></div>
                <div><dt>Timeline</dt><dd>{t.meta_timeline}</dd></div>
              </dl>
              <p>{t.body}</p>
              <a className="link-arrow track-card__link" href={t.link_url}>
                {t.link_label} <ArrowRight />
              </a>
            </article>
          ))}
        </TabbedPair>
      </div>
    </section>
  )
}
