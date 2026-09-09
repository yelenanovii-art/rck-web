import { storyblokEditable } from '@storyblok/react'
import Disclose from '../components/Disclose'
import Emph from './Emph'
import { ArrowRight } from '../components/Icons'

const points = (items = []) =>
  items.map((it) => (
    <li key={it._uid}>
      <b>{it.lead}</b> {it.text}
    </li>
  ))

export default function DiffSection({ blok }) {
  return (
    <section className="section diff" {...storyblokEditable(blok)}>
      <div className="container">
        <div className="diff__head reveal">
          <p className="eyebrow">{blok.eyebrow}</p>
          <h2 className="diff__title">{blok.title}</h2>
          <p className="diff__lead">{blok.lede}</p>
        </div>

        <Disclose label={blok.disclose_label} className="diff-disc">
          <div className="diff-compare">
            <div className="diff-col diff-col--old reveal">
              <span className="diff-col__tag">{blok.old_tag}</span>
              <ul className="diff-list diff-list--old">{points(blok.old_items)}</ul>
            </div>
            <div className="diff-col diff-col--rck reveal" style={{ '--delay': '90ms' }}>
              <span className="diff-col__tag">{blok.rck_tag}</span>
              <ul className="diff-list diff-list--rck">{points(blok.rck_items)}</ul>
            </div>
          </div>
        </Disclose>

        <div className="diff__foot reveal">
          <div className="diff__foot-copy">
            <p className="diff__close">
              <b>{blok.close_lead}</b> <Emph text={blok.close_text} tag="b" />
            </p>
            <a className="link-arrow diff__foot-link" href={blok.foot_link_url}>
              {blok.foot_link_label} <ArrowRight />
            </a>
          </div>
          <div className="diff__stats">
            {(blok.stats || []).map((s) => (
              <div className="diff-stat" key={s._uid}>
                <div className="diff-stat__n">{s.number}</div>
                <div className="diff-stat__t">{s.text}</div>
              </div>
            ))}
            <p className="diff-stat__note">{blok.stat_note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
