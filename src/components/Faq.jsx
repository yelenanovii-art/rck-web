import { useEffect } from 'react'

// Accessible FAQ accordion (native <details>/<summary> — keyboard-friendly, no JS
// needed to open) that ALSO emits FAQPage structured data. Rich results in Google
// and a prime source for AI answer engines (ChatGPT, Perplexity, Claude).
export default function Faq({ id = 'faq', eyebrow = 'FAQ', title, items, ...rest }) {
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = `${id}-schema`
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
    // Replace any prior instance so re-renders don't duplicate the block.
    document.getElementById(`${id}-schema`)?.remove()
    document.head.appendChild(el)
    return () => document.getElementById(`${id}-schema`)?.remove()
  }, [id, items])

  return (
    <section className="section faq-sec" id={id} aria-labelledby={`${id}-title`} {...rest}>
      <div className="container faq-wrap">
        <div className="faq-head reveal">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="faq-title" id={`${id}-title`}>{title}</h2>
        </div>
        <div className="faq-list">
          {items.map(({ q, a }, i) => (
            <details className="faq-item reveal" style={{ '--delay': `${(i % 3) * 60}ms` }} key={q}>
              <summary className="faq-q">
                <span>{q}</span>
                <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="faq-a"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
