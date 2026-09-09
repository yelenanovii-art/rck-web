import { useRef, useState } from 'react'
import { scale, linePath, CHART } from './chartUtils'

// Single-series line: a stalled synergy programme recovered from 42% to 91%.
const DATA = [
  { m: 0, v: 41 }, { m: 1, v: 42 }, { m: 2, v: 42 }, { m: 3, v: 42 },
  { m: 4, v: 55 }, { m: 5, v: 68 }, { m: 6, v: 79 }, { m: 7, v: 86 }, { m: 8, v: 91 },
]
const MOBILISED = 3 // month RCK takes over

const W = 660, H = 360, PL = 40, PR = 20, PT = 30, PB = 42
const plotW = W - PL - PR, plotH = H - PT - PB
const x = scale(0, 8, PL, W - PR)
const y = scale(0, 100, PT + plotH, PT)
const pts = DATA.map((d) => ({ ...d, x: x(d.m), y: y(d.v) }))
const TICKS = [0, 25, 50, 75, 100]

export default function SynergyTrajectory() {
  const [hi, setHi] = useState(null)
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    let best = 0, bd = Infinity
    pts.forEach((p, i) => { const d = Math.abs(p.x - px); if (d < bd) { bd = d; best = i } })
    setHi(best)
  }

  const areaPath = linePath(pts) + ` L${pts[pts.length - 1].x},${y(0)} L${pts[0].x},${y(0)} Z`

  return (
    <figure className="chart reveal">
      <figcaption className="chart__head">
        <h4 className="chart__title">Synergy recovery: 42% → 91%</h4>
        <p className="chart__sub">A stalled €15M programme, re-baselined and driven to 91% milestone completion.</p>
      </figcaption>

      <div className="chart__plot" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHi(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart: synergy milestone completion rising from 42 percent to 91 percent after RCK mobilised">
          <defs>
            <linearGradient id="synFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={CHART.gold} stopOpacity="0.22" />
              <stop offset="1" stopColor={CHART.gold} stopOpacity="0" />
            </linearGradient>
          </defs>

          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={CHART.grid} strokeWidth="1" />
              <text x={PL - 8} y={y(t) + 4} textAnchor="end" className="chart__tick">{t}%</text>
            </g>
          ))}
          {DATA.map((d) => (
            <text key={d.m} x={x(d.m)} y={H - PB + 20} textAnchor="middle" className="chart__cat">M{d.m}</text>
          ))}

          {/* "RCK mobilised" marker */}
          <line x1={x(MOBILISED)} x2={x(MOBILISED)} y1={PT} y2={PT + plotH} stroke={CHART.navy} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          <text x={x(MOBILISED) + 8} y={PT + 14} className="chart__anno">RCK mobilised</text>

          <path className="chart__area" d={areaPath} fill="url(#synFill)" />
          <path className="chart__line" d={linePath(pts)} fill="none" stroke={CHART.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />

          {/* endpoint labels */}
          <g>
            <circle cx={pts[0].x} cy={pts[0].y} r="4.5" fill={CHART.gold} stroke="#fff" strokeWidth="2" />
            <text x={pts[0].x + 8} y={pts[0].y - 8} className="chart__val">42%</text>
            <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="5.5" fill={CHART.gold} stroke="#fff" strokeWidth="2" />
            <text x={pts[pts.length - 1].x} y={pts[pts.length - 1].y - 14} textAnchor="end" className="chart__val chart__val--lg">91%</text>
          </g>

          {/* hover crosshair */}
          {hi != null && (
            <g>
              <line x1={pts[hi].x} x2={pts[hi].x} y1={PT} y2={PT + plotH} stroke={CHART.navy} strokeWidth="1" opacity="0.28" />
              <circle cx={pts[hi].x} cy={pts[hi].y} r="6" fill="#fff" stroke={CHART.gold} strokeWidth="3" />
            </g>
          )}
        </svg>

        {hi != null && (
          <div className="chart__tip" style={{ left: `${(pts[hi].x / W) * 100}%` }}>
            <span className="chart__tip-k">Month {DATA[hi].m}</span>
            <span className="chart__tip-v"><i style={{ background: CHART.gold }} />{DATA[hi].v}% complete</span>
          </div>
        )}
      </div>

      <details className="chart__data">
        <summary>View data</summary>
        <table>
          <thead><tr><th>Month</th><th>Completion</th></tr></thead>
          <tbody>{DATA.map((d) => <tr key={d.m}><td>M{d.m}</td><td>{d.v}%</td></tr>)}</tbody>
        </table>
      </details>
      <p className="chart__note">Illustrative, representative of engagement type.</p>
    </figure>
  )
}
