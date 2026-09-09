// TRANSFORM+ sibling mark, the same "completed seal" idea as the RCK ring,
// rendered as a hexagonal facet (engineered / digital) with a gold node at
// the top vertex and a checkmark breaking through an open edge.
export default function TransformMark({ size = 60, stroke = '#e7eaf1', accent = '#c47a3a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="TRANSFORM+">
      <polygon
        points="32,6 54,19 54,45 32,58 10,45 10,19"
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeDasharray="150 40"
        transform="rotate(18 32 32)"
      />
      <circle cx="32" cy="12" r="2.8" fill={accent} />
      <path
        d="M21,35 L29,43 L46,22"
        stroke={accent}
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
