// Qualification + lead-gen quiz.
// Each answer carries a readiness `score` and zero-or-more `paths`
// (advisory / platform) used to recommend the right RCK offering.

export const QUESTIONS = [
  {
    id: 'role',
    q: 'Which best describes your role?',
    help: 'So we tailor the report to how you buy.',
    options: [
      { label: 'PE / investment sponsor', v: 'pe', paths: ['advisory', 'platform'], score: 1 },
      { label: 'CEO / CFO / C-suite', v: 'csuite', paths: ['advisory'], score: 1 },
      { label: 'Corporate development / M&A', v: 'corpdev', paths: ['advisory', 'platform'], score: 1 },
      { label: 'Transformation / PMO lead', v: 'transform', paths: ['platform'], score: 1 },
    ],
  },
  {
    id: 'stage',
    q: 'Where are you in the deal or transformation lifecycle?',
    options: [
      { label: 'Pre-deal / diligence', v: 'diligence', paths: ['advisory', 'platform'], score: 3 },
      { label: 'Just closed, Day 1 to 100', v: 'day100', paths: ['advisory'], score: 3, urgent: true },
      { label: 'Mid-transformation', v: 'mid', paths: ['platform'], score: 2 },
      { label: 'Preparing for exit', v: 'exit', paths: ['advisory'], score: 2 },
      { label: 'No active deal right now', v: 'none', paths: [], score: 0 },
    ],
  },
  {
    id: 'risk',
    q: 'Where is value most at risk right now?',
    options: [
      { label: 'Hand-offs between diligence, integration & exit', v: 'handoffs', area: 'Post-Merger Integration', paths: ['advisory'], score: 2 },
      { label: 'Stalled or under-delivering synergies', v: 'synergies', area: 'Value Creation & AI Transformation', paths: ['advisory', 'platform'], score: 2 },
      { label: 'Carve-out / TSA complexity', v: 'carveout', area: 'Carve-Outs & TSA Execution', paths: ['advisory'], score: 2 },
      { label: 'A leadership or capability gap', v: 'leadership', area: 'Interim Management & CxO Bench', paths: ['advisory'], score: 2, urgent: true },
      { label: 'No independently verified baseline', v: 'baseline', area: 'TRANSFORM+ Seal (verified audit trail)', paths: ['platform'], score: 3 },
    ],
  },
  {
    id: 'size',
    q: 'What is the size of the deal or programme?',
    options: [
      { label: 'Under £10M', v: 's', score: 1 },
      { label: '£10M – £100M', v: 'm', score: 2 },
      { label: '£100M – £1B', v: 'l', score: 3 },
      { label: 'Over £1B', v: 'xl', score: 3 },
    ],
  },
  {
    id: 'tracking',
    q: 'How do you track value and governance today?',
    options: [
      { label: 'Spreadsheets and email', v: 'sheets', paths: ['platform'], score: 3 },
      { label: 'PMO decks and status reports', v: 'pmo', paths: ['platform'], score: 2 },
      { label: 'A dedicated platform already', v: 'haveplatform', paths: [], score: 1 },
      { label: 'Not systematically', v: 'adhoc', paths: ['platform'], score: 3 },
    ],
  },
  {
    id: 'urgency',
    q: 'How soon do you need senior execution support?',
    options: [
      { label: 'Immediately — this week', v: 'now', paths: ['advisory'], score: 3, urgent: true },
      { label: 'This quarter', v: 'quarter', score: 2 },
      { label: 'Exploring options', v: 'explore', score: 1 },
      { label: 'Just researching', v: 'research', score: 0 },
    ],
  },
]

export const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.score || 0)),
  0
)

export function scoreQuiz(answers) {
  let readiness = 0
  let advisory = 0
  let platform = 0
  let urgent = false
  let area = null
  let size = 'm'

  QUESTIONS.forEach((q) => {
    const opt = q.options.find((o) => o.v === answers[q.id])
    if (!opt) return
    readiness += opt.score || 0
    ;(opt.paths || []).forEach((p) => {
      if (p === 'advisory') advisory += 1
      if (p === 'platform') platform += 1
    })
    if (opt.urgent) urgent = true
    if (q.id === 'risk') area = opt.area
    if (q.id === 'size') size = opt.v
  })

  let path = 'both'
  if (platform > advisory + 1) path = 'platform'
  else if (advisory > platform + 1) path = 'advisory'
  else if (advisory === 0 && platform === 0) path = 'advisory'

  const pct = Math.round((readiness / MAX_SCORE) * 100)
  const band = pct >= 70 ? 'High' : pct >= 42 ? 'Moderate' : 'Early'

  return { readiness, pct, band, path, urgent, area, size, advisory, platform }
}
