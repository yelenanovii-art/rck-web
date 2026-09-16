import ContentPage from '../components/ContentPage'

// Service page — /services/transformation-outcomes
export default function TransformationOutcomes() {
  return (
    <ContentPage
      eyebrow="Services · Transformation Outcomes"
      title="Transformation outcomes, measured in your ledger."
      dek="Post-merger integration, cost reduction, revenue synergy and capability uplift, delivered on the 40/60 model and verified as realised value, not activity."
      meta="40% fixed + 60% outcome-at-risk · 12 to 18 months"
      blocks={[
        {
          type: 'prose',
          eyebrow: 'The offer',
          heading: 'We are paid when the value is in your GL',
          body: [
            'Transformation Outcomes is our core advisory track: a partner-led team that executes alongside you from baseline to realised value. We agree the outcomes up front, measure them in your general ledger, and release fee only as each milestone is independently verified.',
            'It is the same team from diligence to value realisation, on one contract, with 60% of the fee tied to the numbers you actually book.',
          ],
        },
        {
          type: 'feebar',
          tint: true,
          eyebrow: 'The model',
          heading: 'The 40/60 risk-share fee model',
          lede: '40% covers senior operating leadership from day one. 60% is released only as milestones are independently verified.',
        },
        {
          type: 'points',
          heading: 'Where we create value',
          items: [
            { h: 'Post-Merger Integration', p: 'Day 1 / Day 100 cutover, Integration Management Office stand-up, and functional alignment across Finance, HR, IT and go-to-market.' },
            { h: 'Carve-Outs & Divestitures', p: 'TSA design, NewCo stand-up and stranded-cost removal against agreed exit gates.' },
            { h: 'Revenue & Value Creation', p: 'Sales-force and go-to-market integration, customer retention, and AI-enabled process uplift.' },
            { h: 'Cost Transformation', p: 'Operating-model redesign and structural cost-out, tracked on the EBITDA bridge rather than activity metrics.' },
          ],
        },
        {
          type: 'steps',
          tint: true,
          heading: 'The engagement shape',
          items: [
            { k: 'Week 1–3', h: 'Baseline lockdown', p: 'Outcomes defined and locked on a signed Baseline Schedule, measured in your GL.' },
            { k: '12–18 months', h: 'Delivery', p: 'A partner in direct operational control, executing alongside your team.' },
            { k: 'Ongoing', h: 'Verify & release', p: 'Each milestone independently verified; the matching share of the 60% released.' },
          ],
        },
        {
          type: 'stats',
          items: [
            { n: '85%+', t: 'of engagements hit 90%+ of target outcomes' },
            { n: '60%', t: 'of the fee tied to verified milestones' },
            { n: '175+', t: 'combined partner years across 7 named partners' },
          ],
        },
        {
          type: 'callout',
          body: 'an outcome is not a recommendation delivered. It is realised value, booked where your CFO already looks.',
        },
        {
          type: 'seealso',
          links: [{ text: 'The RCK Outcome Fee Model', href: '/approach/40-60-fee-model' }],
        },
      ]}
      cta={{
        eyebrow: 'Start with your exposure',
        title: 'See where value is at risk in your deal.',
        copy: 'Answer six questions and get a tailored value-at-risk report and recommended path.',
        primary: { label: 'Take the Value-at-Risk Assessment', href: '/diagnostics/value-at-risk' },
        secondary: { label: 'Book an Executive Strategy Call', href: '/contact' },
      }}
    />
  )
}
