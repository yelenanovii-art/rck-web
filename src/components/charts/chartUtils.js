// Tiny shared helpers for the hand-rolled SVG charts (no chart library).
export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0)

export const money = (v) => {
  const n = Math.round(v * 10) / 10
  return '£' + (Number.isInteger(n) ? n : n.toFixed(1)) + 'M'
}

// Smooth-ish polyline path (straight segments; crisp and dependency-free).
export function linePath(points) {
  return points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ')
}

// Validated chart palette (see dataviz validator): gold + blue on light surfaces.
export const CHART = {
  gold: '#b06a2e',
  blue: '#2a78d6',
  navy: '#14284a',
  grid: 'rgba(11, 28, 58,0.09)',
  axis: '#9a968d',
  ink: '#52514e',
}
