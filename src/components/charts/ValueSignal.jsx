import { useRef, useState } from 'react'
import { scale, linePath, CHART } from './chartUtils'

// Two series on one 0–100 axis: hard delivery telemetry + the additive
// behavioural confidence term, across a run of sprints.
const SPRINTS = [1, 2, 3, 4, 5, 6, 7, 8]
const SERIES = [
  { key: 'delivery', label: 'Delivery telemetry', color: CHART.gold, data: [62, 67, 71, 74, 78, 82, 85, 88] },
  { key: 'behaviour', label: 'Behavioural confidence', color: CHART.blue, data: [55, 58, 53, 60, 66, 70, 75, 79] },
]

const W = 660, H = 360, PL = 40, PR = 64, PT = 30, PB = 42
const plotW = W - PL - PR, plotH = H - PT - PB
const x = scale(1, 8, PL, W - PR)
const y = scale(0, 100, PT + plotH, PT)
const TICKS = [0, 25, 50, 75, 100]
const ptsOf = (data) => data.map((v, i) => ({ x: x(SPRINTS[i]), y: y(v), v, s: SPRINTS[i] }))

export default function ValueSignal() {
  const [hi, setHi] = useState(null)
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    let best = 0, bd = Infinity
    SPRINTS.forEach((s, i) => { const d = Math.abs(x(s) - px); if (d < bd) { bd = d; best = i } })
    setHi(best)
  }

  return (
    <figure className="chart reveal">
      <figcaption className="chart__head">
        <div>
          <h4 className="chart__title">Value Signal: telemetry meets behaviour</h4>
          <p className="chart__sub">Hard delivery metrics and a weighted behavioural confidence term, in one engine.</p>
        </div>
        <div className="chart__legend">
          {SERIES.map((s) => (
            <span key={s.key} className="chart__legend-item"><i style={{ background: s.color }} />{s.label}</span>
          ))}
        </div>
      </figcaption>

      <div className="chart__plot" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHi(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Two-series line chart of delivery telemetry and behavioural confidence across eight sprints">
          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={CHART.grid} strokeWidth="1" />
              <text x={PL - 8} y={y(t) + 4} textAnchor="end" className="chart__tick">{t}%</text>
            </g>
          ))}
          {SPRINTS.map((s) => (
            <text key={s} x={x(s)} y={H - PB + 20} textAnchor="middle" className="chart__cat">S{s}</text>
          ))}

          {SERIES.map((s) => {
            const pts = ptsOf(s.data)
            return (
              <g key={s.key}>
                <path className="chart__line" d={linePath(pts)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                {/* direct end label */}
                <text x={pts[pts.length - 1].x + 10} y={pts[pts.length - 1].y + 4} className="chart__endlabel">{s.data[s.data.length - 1]}%</text>
              </g>
            )
          })}

          {hi != null && (
            <g>
              <line x1={x(SPRINTS[hi])} x2={x(SPRINTS[hi])} y1={PT} y2={PT + plotH} stroke={CHART.navy} strokeWidth="1" opacity="0.28" />
              {SERIES.map((s) => (
                <circle key={s.key} cx={x(SPRINTS[hi])} cy={y(s.data[hi])} r="6" fill="#fff" stroke={s.color} strokeWidth="3" />
              ))}
            </g>
          )}
        </svg>

        {hi != null && (
          <div className="chart__tip" style={{ left: `${(x(SPRINTS[hi]) / W) * 100}%` }}>
            <span className="chart__tip-k">Sprint {SPRINTS[hi]}</span>
            {SERIES.map((s) => (
              <span key={s.key} className="chart__tip-v"><i style={{ background: s.color }} />{s.label.split(' ')[0]} {s.data[hi]}%</span>
            ))}
          </div>
        )}
      </div>

      <details className="chart__data">
        <summary>View data</summary>
        <table>
          <thead><tr><th>Sprint</th>{SERIES.map((s) => <th key={s.key}>{s.label}</th>)}</tr></thead>
          <tbody>{SPRINTS.map((s, i) => <tr key={s}><td>S{s}</td>{SERIES.map((se) => <td key={se.key}>{se.data[i]}%</td>)}</tr>)}</tbody>
        </table>
      </details>
    </figure>
  )
}
