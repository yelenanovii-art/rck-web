import { useCountUp } from '../hooks/useCountUp'

// Animated statistic. `value` is the number to count to; `prefix`/`suffix`
// wrap it (e.g. $ … M). Pass `static` text when the figure isn't a clean
// single number (e.g. "42→91%").
export default function Stat({ value, prefix = '', suffix = '', decimals = 0, staticText, label, dark = false }) {
  // Guard (P0-4): a numeric stat with no real value must NOT silently render as
  // a formatted "$0M" (which reads like a legitimate figure). If there's no
  // staticText and no usable value, we show a visible dash and warn in dev so
  // the broken binding is caught rather than shipped.
  const num = Number(value)
  const hasValue = value != null && !Number.isNaN(num) && num !== 0
  const { ref, display } = useCountUp(hasValue ? num : 0, { decimals })
  const broken = staticText == null && !hasValue
  if (broken && import.meta.env?.DEV) {
    console.warn(`[Stat] missing/zero value for "${label}" — rendering "—" instead of a formatted zero.`)
  }
  return (
    <div className={`stat ${dark ? 'stat--dark' : ''}`} ref={ref}>
      <div className="stat__value">
        {staticText != null ? staticText : broken ? '—' : (
          <>
            {prefix}
            {display}
            {suffix}
          </>
        )}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}
