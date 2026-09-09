import { useState } from 'react'
import { scale, money, CHART } from './chartUtils'

// Waterfall of the EBITDA bridge: start → value levers → target.
const STEPS = [
  { label: 'Start', full: 'Start EBITDA', type: 'total', value: 100 },
  { label: 'Working cap.', full: 'Working capital', type: 'inc', value: 8 },
  { label: 'Opex', full: 'Opex reduction', type: 'inc', value: 14 },
  { label: 'Synergies', full: 'Synergy capture', type: 'inc', value: 22 },
  { label: 'Commercial', full: 'Commercial', type: 'inc', value: 9 },
  { label: 'Target', full: 'Target EBITDA', type: 'total', value: 153 },
]

const W = 660, H = 380, PL = 44, PR = 14, PT = 36, PB = 54
const plotW = W - PL - PR, plotH = H - PT - PB
const Y_MAX = 170
const y = scale(0, Y_MAX, PT + plotH, PT)
const bandW = plotW / STEPS.length
const barW = Math.min(74, bandW * 0.54)

// Build cumulative geometry
let cum = 0
const bars = STEPS.map((s) => {
  const b = s.type === 'total' ? { ...s, y0: 0, y1: s.value } : { ...s, y0: cum, y1: cum + s.value }
  cum = s.type === 'total' ? s.value : cum + s.value
  return b
})

const TICKS = [0, 50, 100, 150]

export default function EbitdaBridge() {
  const [hover, setHover] = useState(null)

  return (
    <figure className="chart reveal">
      <figcaption className="chart__head">
        <h4 className="chart__title">The EBITDA bridge, made explicit</h4>
        <p className="chart__sub">How a representative engagement builds value, lever by lever — tracked, not assumed.</p>
      </figcaption>

      <div className="chart__plot">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="EBITDA bridge waterfall from £100M start to £153M target">
          {/* gridlines + y labels */}
          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={CHART.grid} strokeWidth="1" />
              <text x={PL - 8} y={y(t) + 4} textAnchor="end" className="chart__tick">£{t}M</text>
            </g>
          ))}

          {/* connectors between steps */}
          {bars.map((b, i) => {
            if (i === 0 || i === bars.length - 1) return null
            const prev = bars[i - 1]
            const level = b.type === 'inc' ? b.y0 : b.value
            const startLevel = prev.type === 'inc' ? prev.y1 : prev.value
            return (
              <line key={'c' + i} x1={PL + bandW * (i - 1) + bandW / 2 + barW / 2} x2={PL + bandW * i + bandW / 2 - barW / 2}
                y1={y(startLevel)} y2={y(startLevel)} stroke={CHART.grid} strokeWidth="1.5" strokeDasharray="3 3" />
            )
          })}
          {/* connector into the target total */}
          <line x1={PL + bandW * (bars.length - 2) + bandW / 2 + barW / 2} x2={PL + bandW * (bars.length - 1) + bandW / 2 - barW / 2}
            y1={y(cum)} y2={y(cum)} stroke={CHART.grid} strokeWidth="1.5" strokeDasharray="3 3" />

          {/* bars */}
          {bars.map((b, i) => {
            const cx = PL + bandW * i + bandW / 2
            const x = cx - barW / 2
            const top = y(Math.max(b.y0, b.y1))
            const bottom = y(Math.min(b.y0, b.y1))
            const h = Math.max(2, bottom - top)
            const fill = b.type === 'total' ? CHART.navy : CHART.gold
            const label = b.type === 'total' ? money(b.value) : '+' + money(b.value)
            return (
              <g key={b.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                className={`bridge-bar ${hover === i ? 'is-hover' : ''}`} style={{ '--i': i }}>
                <rect x={x} y={top} width={barW} height={h} rx="4" fill={fill} />
                <text x={cx} y={top - 8} textAnchor="middle" className="chart__val">{label}</text>
                <text x={cx} y={H - PB + 20} textAnchor="middle" className="chart__cat">{b.label}</text>
                {/* hit area */}
                <rect x={x - (bandW - barW) / 2} y={PT} width={bandW} height={plotH} fill="transparent" />
              </g>
            )
          })}
        </svg>

        {hover != null && (
          <div className="chart__tip" style={{ left: `${((PL + bandW * hover + bandW / 2) / W) * 100}%` }}>
            <span className="chart__tip-k">{bars[hover].full}</span>
            <span className="chart__tip-v">
              {bars[hover].type === 'total' ? money(bars[hover].value) : '+' + money(bars[hover].value) + ' value added'}
            </span>
          </div>
        )}
      </div>

      <details className="chart__data">
        <summary>View data</summary>
        <table>
          <thead><tr><th>Step</th><th>Value (£M)</th></tr></thead>
          <tbody>{STEPS.map((s) => <tr key={s.label}><td>{s.full}</td><td>{s.type === 'inc' ? '+' : ''}{s.value}</td></tr>)}</tbody>
        </table>
      </details>
      <p className="chart__note">Illustrative, representative of engagement type.</p>
    </figure>
  )
}
