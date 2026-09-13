import ContentPage from '../components/ContentPage'

// /services/interim-management — Section 3 (Board-Ready Interim CxO Leadership).
export default function InterimManagement() {
  return (
    <ContentPage
      eyebrow="Interim Leadership · CxO Bench"
      title="Senior Operators in Operational Control Within 72 Hours, Full Skin in the Game."
      dek="RCK does not operate a passive executive search database. We deploy battle-tested, board-ready interim executives equipped with TRANSFORM+ playbooks and aligned to milestone-based compensation."
      meta="48-hour identification · Week 1 deployment · 9 jurisdictions"
      blocks={[
        {
          type: 'points',
          eyebrow: 'The bench',
          heading: 'The four interim pillars',
          items: [
            { h: 'Interim CFO & Finance Operations', p: 'Standalone finance team setup, audited baseline reporting, ERP controls, and TSA cash separation.' },
            { h: 'Interim COO & Supply Chain Execution', p: 'Multi-site consolidation, plant restructuring, footprint optimisation, and working capital.' },
            { h: 'Interim CIO/CTO & Technology Cutover', p: 'Systems detachment, data migration, cyber risk, cloud infrastructure, and vendor contract renegotiation.' },
            { h: 'Interim CTrO & Programme Leadership', p: 'Board-level Chief Transformation Officers, PMI Programme Directors, and TMO/VMO leaders governing multi-workstream execution.' },
          ],
        },
        {
          type: 'table',
          tint: true,
          eyebrow: 'Pricing',
          heading: 'Published, all-in monthly pricing',
          columns: ['Role', 'Basis', 'Monthly (all-in)'],
          hi: 2,
          rows: [
            ['Interim CFO', 'Full-time or fractional', '£8K–£25K'],
            ['Interim COO', 'Full-time or fractional', '£8K–£25K'],
            ['Interim CIO / CTO', 'Full-time or fractional', '£8K–£25K'],
          ],
          note: 'All-in monthly, including benefits and taxes. One-time placement fee of 40% for senior interim leadership. 48-hour identification, Week 1 deployment. Replacement guaranteed if a placement departs before the agreed duration.',
        },
        {
          type: 'steps',
          heading: 'How fast, and how it holds',
          items: [
            { k: '48 hours', h: 'Identification', p: 'A pre-vetted interim leader matched to your situation and the transformation plan.' },
            { k: 'Week 1', h: 'Deployment', p: 'On-site, intake complete, and operating against the milestones from day one.' },
            { k: '90%+', h: 'Retention', p: 'Placements remain in role for the full agreed duration; replacement guaranteed on departure.' },
          ],
        },
        {
          type: 'seealso',
          links: [{ text: 'Why Interim Should Be Integrated', href: '/services/integrated-interim' }],
        },
      ]}
      cta={{
        eyebrow: 'Deploy in Week 1',
        title: 'Check CxO availability.',
        copy: '72-hour response on a pre-vetted, board-ready interim leader matched to your situation.',
        primary: { label: 'Check CxO Availability', href: '/contact' },
        secondary: { label: 'Request Redacted Operator Profiles (NDA)', href: '/contact' },
      }}
    />
  )
}
