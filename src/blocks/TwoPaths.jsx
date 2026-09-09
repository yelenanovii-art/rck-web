import { storyblokEditable } from '@storyblok/react'
import SectionHead from '../components/SectionHead'
import TabbedPair from '../components/TabbedPair'
import { Mark } from '../components/Logo'
import TransformMark from '../components/TransformMark'
import { ArrowRight } from '../components/Icons'

const labelsOf = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean)

export default function TwoPaths({ blok }) {
  return (
    <section className="section" {...storyblokEditable(blok)}>
      <div className="container">
        <SectionHead center eyebrow={blok.eyebrow} title={blok.title} lede={blok.lede} />
        <TabbedPair
          className="paths-grid"
          ariaLabel="Two ways to work with us"
          labels={labelsOf(blok.tab_labels)}
        >
          {(blok.cards || []).map((c, i) => (
            <div
              className={`path-card ${c.variant === 'platform' ? 'path-card--platform' : ''} reveal`.replace(/\s+/g, ' ')}
              key={c._uid}
              style={i ? { '--delay': `${i * 90}ms` } : undefined}
              {...storyblokEditable(c)}
            >
              <div className="path-card__mark">
                {c.mark === 'transform' ? <TransformMark size={48} /> : <Mark size={46} navy="#14284a" />}
              </div>
              <span className="path-card__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <ul>
                {(c.bullets || []).map((li) => (
                  <li key={li._uid}>{li.text}</li>
                ))}
              </ul>
              <div className="path-card__foot">
                <a className={`btn ${c.cta_style || 'btn-navy'}`} href={c.cta_url}>
                  {c.cta_label} <ArrowRight />
                </a>
              </div>
            </div>
          ))}
        </TabbedPair>
      </div>
    </section>
  )
}
