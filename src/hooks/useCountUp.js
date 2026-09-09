import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `end` once the element scrolls into view.
export function useCountUp(end, { duration = 1500, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (done.current) return
      done.current = true
      if (reduce) {
        setValue(end)
        return
      }
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(end * eased)
        if (t < 1) requestAnimationFrame(tick)
        else setValue(end)
      }
      requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()
  return { ref, display }
}
