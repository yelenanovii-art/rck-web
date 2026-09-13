import ContentPage from '../components/ContentPage'

// /about/partner-led-model — the positioning page.
// Absorbs the former "why smaller beats bigger" page. Deliberately uses NO
// them-vs-us compare table (that pattern lives only on the homepage now).
export default function PartnerLedModel() {
  return (
    <ContentPage
      eyebrow="The partner-led model"
      title="No Junior Leverage. No Diluted Attention. Total Partner Ownership"
      dek="While matrix consultancies dilute their senior partners across 10+ accounts and hand delivery to junior teams, we hard-cap each RCK partner at 3 to 4 concurrent engagements. That deliberately limits how many mandates the firm carries at any given time, guaranteeing that the partner who scoped your transformation is actively governing its execution."
      meta="7 named partners · 3 to 4 concurrent engagements each"
      blocks={[
        {
          type: 'prose',
          eyebrow: 'The Structural Dilemma: Accountability Diffused by Design',
          heading: 'Built to Maximise Billable Hours. Not Your Outcome.',
          body: [
            'In a conventional matrix firm, your mandate passes through four distinct hands before real work begins: the origination partner who sold it, the resource manager who staffed it, the project manager who oversees it, and the junior bench executing the slides.',
            'When targets are missed, the matrix provides total plausible deniability.',
            'That isn’t an accident. A matrix structure optimises for **consultant utilisation and fee extraction**, not end-to-end P&L ownership. You receive polished slideware and theoretical roadmaps, while bearing 100% of the operational and downside risk yourself.',
          ],
        },
        {
          type: 'points',
          heading: 'What Partner-Led Execution Solves',
          items: [
            { h: 'Single-Point Operational Ownership', p: 'A named Managing Partner carries direct accountability for your mandate from inception to value realisation. There are no junior pyramids to delegate to, no matrix layers to hide behind, and zero hand-offs where strategic intent gets diluted.' },
            { h: 'Unbroken Strategic Continuity', p: 'The senior practitioner who scopes the thesis, whether in M&A diligence, carve-out separation, or transformation roadmapping, is the same operator governing in-seat execution. We eliminate the costly translation gap between strategy design and operational delivery.' },
            { h: 'True Commercial Alignment', p: 'The partner governing your mandate carries direct downside risk under our **40/60 outcome model**. With 60% of our fees unlocked only upon independent GL verification of your milestones, alignment is a binding commercial reality, not marketing copy in a pitch deck.' },
          ],
        },
        {
          type: 'prose',
          tint: true,
          eyebrow: 'The size paradox',
          heading: 'Execution Velocity Beats Matrix Overhead',
          body: [
            'The institutional default is often to hire the largest advisory firm, assuming sheer headcount provides coverage and an insurance policy against failure. Yet in complex M&A, carve-outs, and transformations, failure is rarely caused by a shortage of people. It is driven by the coordination friction of too many.',
            'In traditional matrix firms, decisions are routed through regional practice lines, staffing committees, and internal review layers before reaching the ground. Clients pay premium rates that quietly subsidise internal firm management, while delivery is delegated to junior associates learning on client time.',
            'Fewer layers mean higher operational velocity. A partner-led model eliminates organisational inertia, ensuring direct, senior-level intervention within 72 hours, translating diagnosis into decisive General Ledger impact without matrix delay.',
          ],
        },
        {
          type: 'quote',
          text: 'You don’t need more consulting headcount. You need zero distance between the problem and the operator who can fix it.',
        },
        {
          type: 'callout',
          label: 'Accountability cannot be handed off.',
          body: 'In traditional matrix models, ownership gets delegated until it disappears. At RCK, the partner who architects your strategy is the operator executing alongside you, with their own fee riding on the outcome.',
        },
        {
          type: 'seealso',
          links: [
            { text: 'Meet the Partners', href: '/about/team' },
            { text: 'The 40/60 Fee Model', href: '/about/outcomes-vs-advisory' },
          ],
        },
        {
          type: 'related',
          tint: true,
          heading: 'Read next',
          items: [
            { tag: 'Model', h: 'The 40/60 fee model', href: '/about/outcomes-vs-advisory' },
            { tag: 'Playbooks', h: 'Founder-built playbooks', href: '/about/founder-built-playbooks' },
          ],
        },
      ]}
      cta={{
        eyebrow: 'Work with a partner',
        title: 'Talk to the partner who would run your deal.',
        copy: 'No matrix, no hand-off. The person you meet is the person accountable for your outcome.',
        secondary: { label: 'See our partner-led model in action', href: '/case-studies' },
      }}
    />
  )
}
