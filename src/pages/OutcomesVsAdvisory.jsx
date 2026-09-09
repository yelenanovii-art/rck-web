import ContentPage from '../components/ContentPage'

// /about/outcomes-vs-advisory — the fee-model page.
// Absorbs the former "outcomes verification" page. No compare table.
export default function OutcomesVsAdvisory() {
  return (
    <ContentPage
      eyebrow="The 40/60 model"
      title="Follow the Incentive: Commercial Alignment Dictates Operational Behavior"
      dek="How a firm is paid dictates how it behaves. With 40% of our fee fixed and 60% earned only when outcomes are verified in your General Ledger, our commercial incentives are structurally aligned with yours — on speed, focus and a clean exit."
      meta="40% fixed · 60% tied to verified General Ledger outcomes"
      blocks={[
        {
          type: 'compare',
          left: {
            tag: 'The Billable Hour Model',
            items: [
              'Profits from friction & delay',
              'Scope creep increases advisory margin',
              'Endless workstreams with no clean exit',
            ],
          },
          right: {
            tag: 'The RCK 40/60 Outcome Model',
            items: [
              'Profits from speed & execution velocity',
              'Scope discipline protects fee recovery',
              'Direct exit once GL milestones are verified',
            ],
          },
        },
        {
          type: 'prose',
          body: [
            'Traditional firms profit by staying on your clock. RCK profits only when your transformation, carve-out, or integration achieves its outcomes.',
            'When 60% of our fee is on the line, we don’t pad decks or add junior analysts. We focus entirely on the shortest, most disciplined path to value realisation.',
          ],
        },
        {
          type: 'feebar',
          tint: true,
          eyebrow: 'The model',
          heading: 'The 40/60 Model: Commercial Risk-Sharing Aligned to Defined Outcomes',
          lede: 'We replace open-ended input billing with direct milestone alignment. Remuneration is structurally tied to the achievement of your pre-defined strategic, financial, and operational objectives.',
        },
        {
          type: 'steps',
          eyebrow: 'Verification',
          heading: 'How an outcome actually gets verified',
          items: [
            { k: 'Step 1', h: 'Pre-Agreed Baselines & Outcomes', p: 'Before work begins, we establish the starting baselines and define unambiguous acceptance criteria for every outcome and operational milestone.' },
            { k: 'Step 2', h: 'Source-Data Verification', p: 'Each milestone or outcome is measured against hard operational or financial reality, validated with the client engagement lead.' },
            { k: 'Step 3', h: 'Sponsor or Engagement Lead Sign-Off', p: 'The client sponsor or engagement lead confirms the milestone has been achieved. Only upon formal client validation is the matching share of the 60% contingent fee released.' },
          ],
        },
        {
          type: 'points',
          tint: true,
          heading: 'What the 40/60 Model Designs In',
          lede: 'When commercial remuneration is tied to defined outcomes, advisory behavior structurally aligns with client priorities:',
          items: [
            { h: 'Execution Velocity', p: 'When 60% of our fee depends on verified outcome delivery, operational delay directly erodes our own economics. We are engineered to eliminate matrix friction, placing a named Engagement Partner in direct operational control within 72 hours, not weeks.' },
            { h: 'Relentless Focus on High-Impact Levers', p: 'We only deploy resources against the operational and financial levers that directly move defined outcomes, whether accelerating a TSA detachment or realising EBITDA in your General Ledger, eliminating non-value workstreams and superficial status decks.' },
            { h: 'Radical Transparency', p: 'In traditional input models, firms bill through emerging failure. Under our model, if an operational hurdle threatens a milestone, our financial incentive is to surface the risk immediately and pivot the execution plan, rather than quietly billing against a deteriorating timeline.' },
          ],
        },
        {
          type: 'seealso',
          links: [{ text: 'Why Partner-Led Beats Matrix', href: '/about/partner-led-model' }],
        },
        {
          type: 'related',
          heading: 'Read next',
          items: [
            { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
            { tag: 'Service', h: 'Why interim should be integrated', href: '/services/integrated-interim' },
          ],
        },
      ]}
      cta={{
        eyebrow: 'See your numbers',
        title: 'See exactly how much of our fee is at risk on your deal.',
        copy: 'Model the value at stake and the fee-at-risk in about a minute.',
        secondary: { label: 'Open the Deal Value Modeller', href: '/diagnostics/deal-value-modeller' },
      }}
    />
  )
}
