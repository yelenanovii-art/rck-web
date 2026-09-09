// A photo slot. Until a real image is dropped in, it renders an elegant,
// on-brand placeholder that names the kind of photo that belongs here.
//
//   <Photo src="/photos/london.jpg" alt="London office" ratio="4 / 3" />
//   <Photo suggest="Boardroom at dusk…" tone="dark" className="photo--wide" />
//
// Drop real files into `public/photos/` and pass `src="/photos/<file>"`.
export default function Photo({ src, alt = '', ratio = '4 / 3', suggest, tone = 'light', className = '' }) {
  return (
    <figure className={`photo photo--${tone} ${className}`} style={{ '--ratio': ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo__ph" title={suggest || undefined}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 17l4.5-4.5 3 3L15 11l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="photo__ph-label">Photo to follow</span>
        </div>
      )}
    </figure>
  )
}
