import ContentPage from '../components/ContentPage'

// 2.6 — /about/founder-built-playbooks
// NOTE: First-draft body. Replace with Final Content Strategy §7.0.
export default function FounderBuiltPlaybooks() {
  return (
    <ContentPage
      eyebrow="Founder-built playbooks"
      title="Why Our Playbooks Are Different (Founder-Lived, Not Consultant-Written)"
      dek="Most consulting playbooks are written by people who have never run the play. Ours were built by operators who executed them, more than 20 times, and kept only what actually worked."
      meta="Written by operators · Proven in the field, not the deck"
      blocks={[
        {
          type: 'prose',
          eyebrow: 'Lived, not templated',
          heading: 'A template is not a playbook',
          body: [
            'Walk into most engagements and the methodology is a slide library: frameworks, maturity models and checklists assembled by a knowledge-management team. It looks rigorous. It has also usually never survived contact with a live carve-out at 2am when the TSA clock is running.',
            'Our playbooks come from the other direction. They were written on the floor, by operators who ran the integration, stood up the interim office, and hit the milestone or missed it and learned why. Every step earned its place because it worked, and the steps that only looked good in a deck were cut.',
          ],
        },
        {
          type: 'points',
          tint: true,
          heading: 'What that means for you',
          items: [
            { h: 'No learning on your time', p: 'The mistakes were already made and paid for on earlier engagements. You get the version that works.' },
            { h: 'Judgement, not just steps', p: 'A lived playbook comes with the context to know when to break it. That judgement is the part a template can never carry.' },
            { h: 'Execution, not advice', p: 'The same operators who wrote the play are the ones running it on your deal, with their fee tied to the result.' },
          ],
        },
        {
          type: 'quote',
          tint: true,
          text: 'A playbook is only worth the scars behind it. Ours were written by the people who earned them.',
        },
        {
          type: 'seealso',
          links: [{ text: 'See the Playbooks in Action', href: '/case-studies' }],
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
        eyebrow: 'Proven, not theoretical',
        title: 'Put a proven playbook, and the operator who wrote it, on your deal.',
        copy: 'Not a template applied by juniors. The people who lived it, executing alongside you.',
        secondary: { label: 'Explore Deal Advisory', href: '/advisory' },
      }}
    />
  )
}
