import { storyblokEditable } from '@storyblok/react'
import SectionHead from '../components/SectionHead'
import Stat from '../components/Stat'

export default function ProofMetrics({ blok }) {
  return (
    <section className="section metrics" {...storyblokEditable(blok)}>
      <div className="container">
        <SectionHead center eyebrow={blok.eyebrow} title={blok.title} lede={blok.lede} />
        <div className="proof-results reveal">
          <div className="stats-row">
            {(blok.stats || []).map((s, i) => (
              <div
                className="stat-card"
                key={s._uid}
                style={i ? { '--delay': `${i * 90}ms` } : undefined}
                {...storyblokEditable(s)}
              >
                <Stat staticText={s.value} dark label={s.label} />
              </div>
            ))}
          </div>
        </div>
        <div className="metrics-tracks">
          {(blok.columns || []).map((col, i) => (
            <div
              className={`metrics-col ${i ? 'metrics-col--alt' : ''} reveal`.replace('  ', ' ')}
              key={col._uid}
              style={i ? { '--delay': `${i * 90}ms` } : undefined}
              {...storyblokEditable(col)}
            >
              <div className="metrics-col__head">
                <span className="metrics-col__tag">{col.tag}</span>
                <h3>{col.title}</h3>
              </div>
              <ul className="metrics-list">
                {(col.items || []).map((it) => (
                  <li key={it._uid}>
                    <div className="metrics-list__n">{it.number}</div>
                    <div className="metrics-list__c"><b>{it.heading}.</b> {it.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
