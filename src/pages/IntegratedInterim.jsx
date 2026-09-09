import ContentPage from '../components/ContentPage'

// 2.5 — /services/integrated-interim
// NOTE: First-draft body. Replace with Final Content Strategy §6.0.
export default function IntegratedInterim() {
  return (
    <ContentPage
      eyebrow="Integrated interim"
      title="The Hidden Inefficiency of Hiring Two Firms (And How RCK Solves It)"
      dek="Hire a strategy firm and a staffing firm separately and you inherit the gap between them. RCK puts PMI strategy and interim leadership under one accountability structure."
      meta="One firm · One contract · One partner to call"
      blocks={[
        {
          type: 'prose',
          eyebrow: 'The gap',
          heading: 'The coordination gap nobody prices in',
          body: [
            'The standard play is to hire two firms: one to design the transformation and one to supply the interim leaders who run it. On paper the roles are clean. In practice you have just created a seam, and value leaks through seams.',
            'The strategy firm hands over a plan the interim leader did not help write. The interim leader inherits targets they did not set. When something slips, each can point at the other, and you are left holding the coordination cost that neither firm owns. The gap between the two firms becomes your problem.',
          ],
        },
        {
          type: 'points',
          tint: true,
          heading: 'What integration removes',
          items: [
            { h: 'The hand-off', p: 'Strategy and execution sit in the same room under the same partner, so nothing is lost in translation between firms.' },
            { h: 'The blame gap', p: 'One firm owns both the plan and the people running it. There is no seam to point at when a target moves.' },
            { h: 'The second procurement', p: 'You do not run a separate search, contract and onboarding for interim leadership. It comes deployed and pre-aligned.' },
          ],
        },
        {
          type: 'steps',
          tint: true,
          heading: 'How the interim side moves',
          items: [
            { k: '48 hours', h: 'Identification', p: 'A pre-vetted interim leader from our bench, matched to your situation and the transformation plan.' },
            { k: 'Week 1', h: 'Deployment', p: 'In seat and operating, already aligned to the milestones the same firm is accountable for.' },
            { k: 'Ongoing', h: 'One accountability', p: 'Strategy and execution report into one partner, on one commercial model.' },
          ],
        },
        {
          type: 'callout',
          body: 'value does not leak in the middle of a workstream. It leaks at the seams between firms. The cleanest way to stop the leak is to remove the seam.',
        },
        {
          type: 'seealso',
          links: [{ text: 'Explore the Interim Bench', href: '/services/interim-management' }],
        },
        {
          type: 'related',
          heading: 'Read next',
          items: [
            { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
            { tag: 'Playbooks', h: 'Why our playbooks are different', href: '/about/founder-built-playbooks' },
          ],
        },
      ]}
      cta={{
        eyebrow: 'One firm, one contract',
        title: 'Get PMI strategy and interim leadership from one team.',
        copy: 'One accountability structure from diligence to value realisation. No seam to manage.',
        secondary: { label: 'Explore Deal Advisory', href: '/advisory' },
      }}
    />
  )
}
