import ContentPage from '../components/ContentPage'

// /approach/40-60-fee-model — THE canonical explanation of the RCK Outcome Fee
// Model (tickets 1, 2, 6). Every other page carries at most one sentence plus a
// link back here; nothing else may restate the mechanism.
//
// All commercial wording comes from Section 0.3 of the change list and is
// deliberately literal:
//  • 40% is "time-billed operating and mobilisation fee from kickoff" — never
//    "retained baseline" and never "fixed".
//  • 60% is billed through rolling sprints and is not earned until acceptance
//    criteria are met.
//  • The unmet-criteria outcome is stated once, here, and nowhere else.
//  • Where the only signature is the client sponsor's, the word "independent"
//    is dropped and the sponsor is named as the release gate.
//  • "Within 72 hours" is retired; the locked speed strings are 48-hour
//    identification and partner or interim in seat in Week 1.
export default function RckOutcomeFeeModel() {
  return (
    <ContentPage
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Approach', href: '/advisory' },
        { label: 'The RCK Outcome Fee Model' },
      ]}
      eyebrow="The 40/60 model"
      title="The RCK Outcome Fee Model: 60% of our fee is released only against verified GL outcomes"
      subhead="Follow the incentive: commercial alignment dictates operational behaviour."
      dek="How a firm is paid dictates how it behaves. 40% is billed on time spent from kickoff. The remaining 60% is billed through rolling sprints and is not earned until the acceptance criteria are met in your General Ledger (GL — the accounting system of record)."
      meta="40% billed on time spent · 60% released against verified GL outcomes"
      heroCta={{ label: 'Compare 40/60 with billable-hour advisory', href: '#comparison' }}
      blocks={[
        // ── 2. Comparison (tickets 16, 17) ──────────────────────────────────
        {
          type: 'table',
          id: 'comparison',
          eyebrow: 'Comparison',
          heading: 'Billable-hour advisory, PMI shops, and the RCK Outcome Fee Model',
          columns: ['', 'Volume consultancies', 'PMI shops', 'RCK'],
          hi: 3,
          rows: [
            ['How the fee is earned', 'Hours delivered', 'Day rate per consultant', '40% on time spent; 60% against verified outcomes'],
            ['Who is in the room', 'Leveraged junior pyramid', 'Contract associates', 'Named partner, capped at three to four mandates'],
            ['What ends the engagement', 'Budget exhaustion', 'End of placement', 'Acceptance criteria met in the GL'],
            ['Exposure if outcomes are missed', 'None', 'None', '60% of the fee'],
          ],
          note: 'PMI — post-merger integration.',
        },

        // ── 3. Contract spec + composition (tickets 10, 11) ─────────────────
        {
          type: 'feebar',
          tint: true,
          eyebrow: 'Composition',
          heading: 'How the fee is composed',
          lede: '40% is billed based on time spent, including mobilisation, partner input and the core operating cadence from kickoff. 60% is billed through a set of rolling sprints to ensure pace and performance against agreed outcomes.',
        },
        {
          type: 'checklist',
          eyebrow: 'Contract',
          heading: 'How this looks in a contract',
          lede: 'Figures below are illustrative and are not a quote.',
          items: [
            'Sample total contract value — £400,000 (illustrative).',
            'What the 40% covers — named partner time, mobilisation, and the core operating cadence from kickoff.',
            'Three example milestones — a TSA (transitional services agreement) exit date, a synergy line landed in the GL, and a Day-100 operating model.',
            'Release rule — released per milestone, not all-or-nothing, so a met milestone is invoiced whether or not later ones land.',
            'If acceptance criteria are unmet at engagement end — the unearned share of the 60% is not invoiced. It is unearned rather than deferred to a later date.',
          ],
        },

        // ── 4. Verification as controls (ticket 12) ─────────────────────────
        {
          type: 'steps',
          eyebrow: 'Verification',
          heading: 'How an outcome actually gets verified',
          items: [
            {
              k: 'Step 1',
              h: 'Baselines and acceptance criteria, written before kickoff',
              p: 'Data source: the client’s GL and the last signed-off month-end close. Signed by: the client sponsor and the RCK engagement partner. If they disagree: the baseline is escalated to the programme board before work starts, not renegotiated later.',
            },
            {
              k: 'Step 2',
              h: 'Measurement against the source data',
              p: 'Data source: the GL, plus the operational system of record for non-financial milestones. Partial hit: a milestone met in part releases that proportion of its tranche — 80% of a synergy target releases 80% of that milestone’s share, not the whole tranche and not nothing.',
            },
            {
              k: 'Step 3',
              h: 'Client sponsor is the release gate',
              p: 'Signed by: the client sponsor, whose signature releases the matching share of the 60%. Where a mandate includes independent assurance, that assurance signs alongside the sponsor. Invoicing: within the month-end billing cycle following sign-off. If they disagree: the milestone stays unreleased and goes to the programme board.',
            },
          ],
        },

        // ── 5. What the model designs in (ticket 8 — one such block) ────────
        {
          type: 'points',
          tint: true,
          heading: 'What the model designs in',
          lede: 'When remuneration is tied to defined outcomes, behaviour follows the incentive:',
          items: [
            { h: 'Execution velocity', p: 'With 60% of the fee unearned until criteria are met, delay erodes our own economics. Candidates are identified within 48 hours, and the partner or interim is in seat in Week 1.' },
            { h: 'Focus on high-impact levers', p: 'We deploy against the levers that move defined outcomes — accelerating a TSA exit, or landing EBITDA (earnings before interest, tax, depreciation and amortisation) in the GL — not non-value workstreams or status decks.' },
            { h: 'Radical transparency', p: 'On an input model, a firm bills through emerging failure. Here, if a hurdle threatens a milestone, our incentive is to surface it immediately and re-plan, not to bill quietly against a deteriorating timeline.' },
          ],
        },

        // ── 6. Proof — one statistic only (ticket 14, C5) ───────────────────
        {
          type: 'callout',
          label: 'Proof:',
          body: 'Across representative mandates, synergy capture landed between **42% and 91%** of the targeted figure, measured in the client’s ledger. Full case studies: /case-studies',
        },

        // ── 7. FAQ (ticket 13) ──────────────────────────────────────────────
        {
          type: 'faq',
          eyebrow: 'Questions',
          heading: 'What buyers ask about the model',
          items: [
            { q: 'What if the client changes scope?', a: 'Acceptance criteria are re-cut with the sponsor and the affected milestones are re-priced before work continues. Criteria are never changed retrospectively to release a fee.' },
            { q: 'What if the deal pauses?', a: 'Time already spent is invoiced under the 40%. Sprint billing stops, and the unearned share of the 60% stays unearned until the mandate restarts and its criteria are met.' },
            { q: 'What if data access is late?', a: 'Late access moves the measurement date, not the criteria. Where a milestone cannot be measured because access was withheld, it goes to the programme board rather than lapsing silently.' },
            { q: 'Is the 60% lost or delayed?', a: 'If the acceptance criteria are met, it is invoiced. If they are not met by engagement end, the unearned share is simply not invoiced — it is unearned, not parked for later.' },
            { q: 'Who writes the acceptance criteria?', a: 'The client sponsor and the RCK engagement partner write them together before kickoff, and both sign them. **Neither side can change them alone.**' },
          ],
        },

        // ── 8. Read next (ticket 9 — one such module only) ──────────────────
        {
          type: 'related',
          heading: 'Read next',
          items: [
            { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
            { tag: 'Service', h: 'Why interim should be integrated', href: '/services/integrated-interim' },
          ],
        },
      ]}
      // ── 9. Modeller + strategy call (ticket 15, 25) ────────────────────────
      cta={{
        eyebrow: 'See your numbers',
        title: 'See exactly how much of our fee is at risk on your deal.',
        copy: 'Worked example, illustrative: on a £400,000 mandate, £160,000 is billed on time spent from kickoff and £240,000 is at risk across three GL gates. Model your own in about a minute.',
        secondary: { label: 'Open the Deal Value Modeller', href: '/diagnostics/deal-value-modeller' },
      }}
    />
  )
}
