import SectionHead from './SectionHead'
import CTABand from './CTABand'
import FeeBar from './FeeBar'
import { ArrowRight, Check } from './Icons'
import Disclose from './Disclose'
import { pageTitle } from '../lib/pageTitles'

// Minimal inline **bold** support inside block text (odd segments → <strong>).
function rich(text) {
  if (typeof text !== 'string' || !text.includes('**')) return text
  return text.split('**').map((seg, i) => (i % 2 ? <strong key={i}>{seg}</strong> : seg))
}

// Reusable long-form / article layout for the "Why RCK" content pages.
// A page supplies { eyebrow, title, dek, meta, blocks, cta } and each block is
// rendered by <Block>. All blocks reuse the site's existing component styles so
// these pages stay visually consistent with the rest of the site, animate on
// scroll, and are responsive by default.
export default function ContentPage({ eyebrow, title, dek, meta, blocks = [], cta }) {
  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h1 className="hero__title">{title}</h1>
          {dek && <p className="hero__sub">{dek}</p>}
          {meta && <div className="hero__meta">{meta}</div>}
        </div>
      </section>

      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}

      {cta && <CTABand {...cta} />}
    </>
  )
}

function Block({ block }) {
  const wrap = `section ${block.tint ? 'section--paper' : ''}`
  const head = (block.eyebrow || block.heading || block.lede) && (
    <SectionHead eyebrow={block.eyebrow} title={block.heading} lede={block.lede} />
  )

  switch (block.type) {
    case 'prose':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            {block.body && (
              <div className="prose reveal">
                {block.body.map((p, k) => <p key={k}>{rich(p)}</p>)}
              </div>
            )}
          </div>
        </section>
      )

    case 'compare':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <Disclose label="See the side-by-side comparison">
            <div className="diff-compare">
              <div className="diff-col diff-col--old reveal">
                <span className="diff-col__tag">{block.left.tag}</span>
                <ul className="diff-list diff-list--old">
                  {block.left.items.map((it, k) => <li key={k}>{it}</li>)}
                </ul>
              </div>
              <div className="diff-col diff-col--rck reveal" style={{ '--delay': '90ms' }}>
                <span className="diff-col__tag">{block.right.tag}</span>
                <ul className="diff-list diff-list--rck">
                  {block.right.items.map((it, k) => <li key={k}>{it}</li>)}
                </ul>
              </div>
            </div>
            </Disclose>
          </div>
        </section>
      )

    case 'points':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <div className="problem-grid">
              {block.items.map((it, k) => (
                <div className="problem-card reveal" style={{ '--delay': `${k * 80}ms` }} key={k}>
                  <div className="num">{it.n || k + 1}</div>
                  <h3>{it.h}</h3>
                  <p>{rich(it.p)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'stats':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <div className="figrow reveal">
              {block.items.map((it, k) => (
                <div className="fig" key={k}>
                  <div className="fig__n">{it.n}</div>
                  <div className="fig__t">{it.t}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'steps':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <div className="timeline">
              {block.items.map((it, k) => (
                <div className="tstep reveal" style={{ '--delay': `${k * 70}ms` }} key={k}>
                  <div className="trange">{it.k}</div>
                  <h4>{it.h}</h4>
                  <p>{it.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'callout':
      return (
        <section className={wrap}>
          <div className="container">
            <div className="problem-note reveal">
              <strong>{block.label || 'Our view:'}</strong> {rich(block.body)}
            </div>
          </div>
        </section>
      )

    case 'quote':
      return (
        <section className={wrap}>
          <div className="container">
            <blockquote className="pullquote reveal">
              <p>{block.text}</p>
              {block.cite && <cite>{block.cite}</cite>}
            </blockquote>
          </div>
        </section>
      )

    case 'feebar':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <div className="model-panel reveal"><FeeBar /></div>
          </div>
        </section>
      )

    case 'checklist':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <ul className="checklist reveal">
              {block.items.map((it, k) => (
                <li key={k}><span className="checklist__mark"><Check size={15} /></span><span>{it}</span></li>
              ))}
            </ul>
          </div>
        </section>
      )

    case 'table':
      return (
        <section className={wrap}>
          <div className="container">
            {head}
            <Disclose label="View the full table">
            <div className="table-scroll reveal">
              <table className="compare">
                <thead>
                  <tr>{block.columns.map((c, k) => <th key={k} className={k === block.hi ? 'hi' : ''}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {block.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((cell, ci) =>
                        ci === 0 ? (
                          <th key={ci} className="rowlabel">{cell}</th>
                        ) : (
                          <td key={ci} className={ci === block.hi ? 'hi' : ''}>{cell}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Disclose>
            {block.note && <p className="table-note reveal">{block.note}</p>}
          </div>
        </section>
      )

    case 'seealso':
      return (
        <div className="seealso-wrap reveal">
          <div className="container">
            <p className="seealso">
              <span className="seealso__label">See also</span>
              {block.links.map((l, k) => (
                <a key={k} href={l.href} className="seealso__link">{pageTitle(l.href) || l.text}</a>
              ))}
            </p>
          </div>
        </div>
      )

    case 'related':
      return (
        <section className={wrap}>
          <div className="container">
            <SectionHead eyebrow="Keep reading" title={block.heading || 'Related'} />
            <div className="related-grid">
              {block.items.map((it, k) => (
                <a className="related-card reveal" style={{ '--delay': `${k * 70}ms` }} href={it.href} key={k}>
                  <span className="related-card__tag">{it.tag}</span>
                  <h4>{it.h}</h4>
                  <span className="related-card__go">Read <ArrowRight /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )

    default:
      return null
  }
}
