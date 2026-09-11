import * as React from 'react'

/* Border Beam Panel — adapted for RCK from Motiq (https://motiq.dev), MIT.
   Ported to plain JSX + scoped CSS (no Tailwind / TS), recoloured to the
   RCK navy + gold palette. A conic-gradient ring is cut with a two-layer
   CSS alpha mask (mask-composite: exclude); the angular VELOCITY is sprung,
   so the comets wind up on hover/focus and coast back on leave. Only one
   custom property changes per frame, so panel content never repaints. */

/* ---- motion primitives ---- */
function useReducedMotion() {
  const [reduced, setReduced] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function useVisibilityPause(ref, { threshold = 0.1 } = {}) {
  const [onScreen, setOnScreen] = React.useState(true)
  const [tabVisible, setTabVisible] = React.useState(true)

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => setOnScreen(entries.some((e) => e.isIntersecting)),
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])

  React.useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState !== 'hidden')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return onScreen && tabVisible
}

/* ---- physics + gradient ---- */
class Spring {
  constructor(value, k, d) {
    this.x = value
    this.v = 0
    this.target = value
    this.k = k
    this.d = d
  }
  step(dt) {
    const a = this.k * (this.target - this.x) - this.d * this.v
    this.v += a * dt
    this.x += this.v * dt
    return this.x
  }
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))
const PARKED_ANGLE = 40

// One comet: a ~45° tail easing into a bright 4° head.
function comet(tail, head, tip, midAlpha, start) {
  return [
    `color-mix(in srgb, ${tail} 4%, transparent) ${start + 18}deg`,
    `color-mix(in srgb, ${tail} ${midAlpha}%, transparent) ${start + 46}deg`,
    `${head} ${start + 56}deg`,
    `${tip} ${start + 60}deg`,
    `transparent ${start + 63}deg`,
  ].join(', ')
}

// RCK palette: gold comet (gold → soft gold), opposed by a champagne comet.
function ringGradient(beams, colors) {
  const tail0 = colors?.[0] ?? '#C87137' // gold
  const head0 = colors?.[0] ?? '#e9b98d' // soft gold head
  const stops = [
    'transparent 0deg',
    comet(tail0, head0, `color-mix(in srgb, ${head0} 22%, #ffffff)`, 55, 0),
  ]
  if (beams === 2) {
    const c1 = colors?.[1] ?? '#d9a778' // champagne
    stops.push('transparent 198deg', comet(c1, c1, `color-mix(in srgb, ${c1} 26%, #ffffff)`, 50, 198))
  }
  stops.push('transparent 360deg')
  return `conic-gradient(from var(--mk-beam-a, 0deg), ${stops.join(', ')})`
}

/* ---- component ---- */
export function BorderBeamPanel({
  children,
  beams = 2,
  colors,
  thickness = 2,
  idleSpeed = 42,
  hoverSpeed = 240,
  glow = true,
  radius = 16,
  spring,
  seed = 1,
  pauseWhenHidden = true,
  reducedMotion,
  className,
  style,
  ...props
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '')
  const cls = `mk-beam-${uid}`
  const rootRef = React.useRef(null)

  const systemReduced = useReducedMotion()
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => setHydrated(true), [])
  const staticMode = reducedMotion === true || (hydrated && systemReduced)
  const onScreen = useVisibilityPause(rootRef, { threshold: 0.05 })
  const paused = pauseWhenHidden && !onScreen
  const animate = !staticMode && !paused

  const stiffness = spring?.stiffness ?? 30
  const damping = spring?.damping ?? 11

  const startAngle = React.useMemo(() => (((seed * 137.508) % 360) + 360) % 360, [seed])

  const speedRef = React.useRef(new Spring(idleSpeed, stiffness, damping))
  const angleRef = React.useRef(startAngle)
  const liveRef = React.useRef({ idleSpeed, hoverSpeed })
  liveRef.current = { idleSpeed, hoverSpeed }

  React.useEffect(() => {
    speedRef.current.k = stiffness
    speedRef.current.d = damping
  }, [stiffness, damping])

  const paint = React.useCallback((angle) => {
    rootRef.current?.style.setProperty('--mk-beam-a', `${((((angle % 360) + 360) % 360)).toFixed(2)}deg`)
  }, [])

  React.useEffect(() => {
    if (!animate) return
    let raf = 0
    let last = 0
    const frame = (now) => {
      if (!last) last = now
      const dt = clamp((now - last) / 1000, 0, 0.05)
      last = now
      angleRef.current += speedRef.current.step(dt) * dt
      paint(angleRef.current)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [animate, paint])

  React.useEffect(() => {
    if (!staticMode) return
    angleRef.current = PARKED_ANGLE
    speedRef.current.x = speedRef.current.target = liveRef.current.idleSpeed
    speedRef.current.v = 0
    paint(PARKED_ANGLE)
  }, [staticMode, paint])

  const surge = React.useCallback(() => {
    speedRef.current.target = liveRef.current.hoverSpeed
  }, [])
  const settle = React.useCallback(() => {
    speedRef.current.target = liveRef.current.idleSpeed
  }, [])

  const gradient = React.useMemo(() => ringGradient(beams, colors), [beams, colors])

  const css = `
.${cls} .mk-beam-ring, .${cls} .mk-beam-glow {
  position: absolute;
  inset: -1px;
  border-radius: ${radius}px;
  pointer-events: none;
  background: ${gradient};
}
.${cls} .mk-beam-ring {
  padding: ${Math.max(1, thickness)}px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
.${cls} .mk-beam-glow { filter: blur(14px); opacity: 0.4; z-index: -1; }
@media (forced-colors: active) {
  .${cls} .mk-beam-ring, .${cls} .mk-beam-glow { display: none; }
  .${cls} { border-color: CanvasText; }
}`.trim()

  return (
    <div
      ref={rootRef}
      data-motion={staticMode ? 'static' : 'animated'}
      data-paused={paused ? 'true' : 'false'}
      onPointerEnter={surge}
      onPointerLeave={settle}
      onFocus={surge}
      onBlur={settle}
      className={`${cls}${className ? ' ' + className : ''}`}
      style={{
        position: 'relative',
        borderRadius: `${radius}px`,
        isolation: 'isolate',
        '--mk-beam-a': `${startAngle.toFixed(2)}deg`,
        ...style,
      }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {glow ? <div aria-hidden="true" className="mk-beam-glow" /> : null}
      <div aria-hidden="true" className="mk-beam-ring" />
      {children}
    </div>
  )
}

export default BorderBeamPanel
