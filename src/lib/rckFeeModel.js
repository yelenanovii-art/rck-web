/**
 * RCK Outcome Fee Model — pure calculation module.
 *
 * The model, in plain terms: RCK's fee splits into two INDEPENDENTLY-calculated
 * pieces that are ADDED, not one number cut in half:
 *   • Time-based fee (40%)  — billed as delivered, day-rate basis, regardless of outcome.
 *   • Outstanding fee (60%) — fixed at signing against the TARGET; released in equal
 *                             tranches at each 8-week sprint checkpoint, only for
 *                             sprints whose target is independently verified.
 *
 * Critical: this is NOT gain-share. RCK never receives more than the fee agreed at
 * signing, however much value a programme actually creates. Never recompute the
 * outstanding fee against delivered results, and never let the fee grow because a
 * programme over-delivered against target.
 *
 * We compute the outstanding fee from value-created-against-TARGET, then back-solve
 * the time fee from it, so the split is always exactly 40/60 but the two pieces mean
 * different things. Day rate / sprint length are a sense-check narrative on top of the
 * back-solved time fee, never an independent driver of it.
 */

// ---- Constants -------------------------------------------------------
export const SPRINT_WEEKS = 8
export const WORKING_DAYS_PER_SPRINT = SPRINT_WEEKS * 5 // 40
export const WEEKS_PER_MONTH = 4.345 // display-only month equivalents
export const TIME_FEE_RATIO = 40 / 60 // time fee is this multiple of the outstanding fee
export const TIGHT_THRESHOLD_DAYS_PER_SPRINT = 36 // >90% of a sprint's capacity → "tight"
export const STRETCH_MULT = 1.3 // an illustrative bigger TARGET set at signing — never a delivered-upside recompute
export const CONSERVATIVE_MULT = 0.75

// Illustrative FX for DISPLAY ONLY — not live rates. All maths stays in GBP internally.
export const FX = {
  GBP: { symbol: '£', rate: 1 },
  USD: { symbol: '$', rate: 1.27 },
  EUR: { symbol: '€', rate: 1.16 },
}

// ---- Core calculation ------------------------------------------------
export function computeFee(dealSize, upliftPct, outcomeFeePct, dayRate, numSprints) {
  const valueCreated = dealSize * (upliftPct / 100)
  // Fixed at signing against the TARGET — never recomputed against actual results.
  const outstandingFee = valueCreated * (outcomeFeePct / 100)
  // Back-solved so the split is always exactly 40/60 (see module header).
  const timeFee = outstandingFee * TIME_FEE_RATIO
  const totalFee = timeFee + outstandingFee // the ceiling — RCK never receives more

  // Sense-check only — informational, does not feed back into the fee.
  const impliedDays = dayRate > 0 ? timeFee / dayRate : 0
  const capacity = numSprints * WORKING_DAYS_PER_SPRINT
  const team = Math.max(1, Math.ceil(impliedDays / capacity)) // ceil, not round
  const daysPerSprintPerPerson = impliedDays / (team * numSprints)
  const tight = daysPerSprintPerPerson > TIGHT_THRESHOLD_DAYS_PER_SPRINT

  return { valueCreated, outstandingFee, timeFee, totalFee, impliedDays, team, daysPerSprintPerPerson, tight }
}

// Per-sprint payment schedule: each sprint carries an equal share of the target and
// the fee (a stated simplifying assumption — real programmes may weight unevenly).
export function buildSprintSchedule(numSprints, outstandingFeeTotal, timeFeeTotal) {
  const tranche = outstandingFeeTotal / numSprints
  const timeSlice = timeFeeTotal / numSprints
  const schedule = []
  for (let i = 1; i <= numSprints; i++) {
    schedule.push({
      sprint: i,
      weekStart: (i - 1) * SPRINT_WEEKS + 1,
      weekEnd: i * SPRINT_WEEKS,
      timeFeeSlice: timeSlice,
      outstandingTranche: tranche,
    })
  }
  return schedule
}

// Amount realised so far. Time-fee slices always count (billed regardless);
// outstanding tranches count only for verified sprints.
export function computeRealised(schedule, verifiedSprints) {
  const verified = verifiedSprints instanceof Set ? verifiedSprints : new Set(verifiedSprints)
  let realised = 0
  let totalPossible = 0
  schedule.forEach((s) => {
    realised += s.timeFeeSlice
    totalPossible += s.timeFeeSlice + s.outstandingTranche
    if (verified.has(s.sprint)) realised += s.outstandingTranche
  })
  return { realised, totalPossible, verifiedCount: verified.size, sprintCount: schedule.length }
}

// Conservative/base/stretch — each a different TARGET chosen at signing, NOT a reward
// for exceeding an agreed target. No "delivered above target" recompute (gain-share bug).
export function computeScenarios(dealSize, upliftPct, outcomeFeePct, dayRate, numSprints) {
  return [
    { label: 'Conservative target', uplift: upliftPct * CONSERVATIVE_MULT, ...computeFee(dealSize, upliftPct * CONSERVATIVE_MULT, outcomeFeePct, dayRate, numSprints) },
    { label: 'Base case', uplift: upliftPct, ...computeFee(dealSize, upliftPct, outcomeFeePct, dayRate, numSprints) },
    { label: 'Stretch target', uplift: upliftPct * STRETCH_MULT, ...computeFee(dealSize, upliftPct * STRETCH_MULT, outcomeFeePct, dayRate, numSprints) },
  ]
}

// ---- Formatting ------------------------------------------------------
export function fmtCompactNumber(n) {
  const abs = Math.abs(n)
  if (abs >= 1e6) return (n / 1e6).toFixed(abs >= 1e7 ? 1 : 2) + 'M'
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + 'k'
  return n.toFixed(0)
}

// Formats a GBP amount for display in the given currency. Conversion is DISPLAY
// ONLY (illustrative FX); all maths stays in GBP.
export function formatMoney(gbpAmount, currency = 'GBP') {
  const cur = FX[currency] || FX.GBP
  return cur.symbol + fmtCompactNumber(gbpAmount * cur.rate)
}

export function formatPct(n) {
  return n.toFixed(1) + '%'
}

export function sprintsToWeeks(numSprints) {
  return numSprints * SPRINT_WEEKS
}
export function sprintsToMonths(numSprints) {
  return sprintsToWeeks(numSprints) / WEEKS_PER_MONTH
}

// ---- Copy (verbatim from the dev spec §5) ----------------------------
export const COPY = {
  subhead:
    "Model RCK's 40/60 fee: 40% of the agreed fee is billed on time as delivered; the outstanding 60% releases in tranches at each 8-week sprint checkpoint, paid only once that sprint's target is independently verified. This isn't gain-share — RCK is never paid more than the agreed fee, whatever the actual result.",
  outcomeFeeHint:
    'Sets the size of the outstanding 60% at signing, released in equal tranches at each 8-week sprint checkpoint — fixed from that point, not a share that grows with results.',
  outstandingFeeSub:
    'The remaining 60% of the agreed fee, released in tranches at each sprint checkpoint once independently verified — not an additional share of value created.',
  totalFeeCaption:
    'The full agreed fee. RCK never receives more than this, however much value the programme actually creates.',
  downside: (totalFeeFormatted) =>
    `Each sprint's tranche is independent. Miss a checkpoint and RCK forfeits only that sprint's slice of the outstanding fee — not the whole ${totalFeeFormatted} at once.`,
  checkpointsIntro:
    "The outstanding fee doesn't wait for one lump verification at programme end — it releases sprint by sprint. Toggle a checkpoint off to simulate a missed sprint.",
  contingencyIntro:
    'How much of each fee is only paid out if the outcome is independently verified — not a share of any upside, just whether the outstanding portion is paid at all.',
  contingencyNote:
    "Not gain-share: RCK's fee is fixed at signing either way. This is the share of that fixed fee RCK stands to lose, sprint by sprint, if outcomes are never verified — not a bigger share of anything if it over-delivers.",
  benchmarkNote:
    'A track record, not a promise of extra fee — RCK was paid the fee agreed for that programme’s target, nothing more for the 7% it delivered beyond it.',
  footer:
    "Illustrative model, not a quote. Fee shown split 40% billed on time / 60% held back and released in 8-week sprint tranches pending independent verification, in line with RCK's 40/60 fee model. This is not gain-share or profit-sharing — RCK never receives more than the fee agreed at signing, whatever the actual result. Day rate, team-size and sprint-scheduling figures are illustrative and subject to final pricing.",
  followUpHook: (outstandingFeeFormatted, dealSizeFormatted) =>
    `You flagged ${outstandingFeeFormatted} as the outstanding fee held back pending verification on a ${dealSizeFormatted} programme.`,
}
