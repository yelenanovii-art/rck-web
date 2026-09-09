import { storyblokEditable } from '@storyblok/react'
import SectionHead from '../components/SectionHead'

export default function ProblemSection({ blok }) {
  return (
    <section className="section" {...storyblokEditable(blok)}>
      <div className="container">
        <SectionHead eyebrow={blok.eyebrow} title={blok.title} lede={blok.lede} />
        <div className="problem-grid">
          {(blok.cards || []).map((c, i) => (
            <div
              className="problem-card reveal"
              style={{ '--delay': `${i * 80}ms` }}
              key={c._uid}
              {...storyblokEditable(c)}
            >
              <div className="num">{c.number}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div className="problem-note reveal">
          <strong>{blok.note_lead}</strong> {blok.note_text}
        </div>
      </div>
    </section>
  )
}
