import { Children, cloneElement, useId, useState } from 'react'

// A small card group (two, occasionally three) that on phones becomes a
// segmented tab control — one card shown at a time via a toggle — instead of
// a swipe carousel, which is a weak pattern for just two items. On ≥641px it
// renders the original grid completely unchanged: the grid className is applied
// to this wrapper and the tab bar is hidden, so the cards lay out exactly as
// before. Both/all cards stay in the DOM (SEO + a11y unaffected); on mobile the
// inactive one is simply display:none.
//
// `labels` = the tab captions (one per child). `className` = the original grid
// class (e.g. "dualtrack__grid") so desktop layout is identical.
export default function TabbedPair({ labels = [], children, className = '', ariaLabel = 'Options' }) {
  const [active, setActive] = useState(0)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const items = Children.toArray(children)

  return (
    <div className={`tabpair ${className}`.trim()}>
      <div className="tabpair__tabs" role="tablist" aria-label={ariaLabel}>
        {items.map((_, i) => (
          <button
            key={i}
            id={`${uid}-tab${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${uid}-panel${i}`}
            className={`tabpair__tab ${active === i ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {labels[i]}
          </button>
        ))}
      </div>
      {items.map((child, i) =>
        cloneElement(child, {
          key: i,
          id: `${uid}-panel${i}`,
          'data-tab-active': active === i ? 'true' : 'false',
          className: `${child.props.className || ''} tabpair__item`.trim(),
        })
      )}
    </div>
  )
}
