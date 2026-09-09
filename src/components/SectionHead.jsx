// Eyebrow + title + optional lede, the standard section opener.
export default function SectionHead({ eyebrow, title, lede, center = false, light = false, id }) {
  return (
    <div className={`sec-head ${center ? 'sec-head--center' : ''} ${light ? 'sec-head--light' : ''}`} id={id}>
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</p>}
      {title && <h2 className="section-title reveal">{title}</h2>}
      {lede && <p className="lead reveal" style={{ '--delay': '80ms' }}>{lede}</p>}
    </div>
  )
}
