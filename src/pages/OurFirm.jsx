import ContentPage from '../components/ContentPage'

// /about/our-firm — Section 6.3.
export default function OurFirm() {
  return (
    <ContentPage
      eyebrow="About RCK"
      title="Built to Eliminate the Junior Consulting Pyramid."
      dek="RCK Outcome Partners was founded on a single principle: replace leveraged junior pyramids with in-seat partner execution, and tie our fee to outcomes verified in your ledger. We operate from London and Barcelona, with execution across EMEA."
      meta="London · Barcelona · EMEA · 9 jurisdictions"
      blocks={[
        {
          type: 'prose',
          eyebrow: 'The founding principle',
          heading: 'Named partners, in seat, on the line',
          body: [
            'RCK was built by operators who had run integrations, carve-outs and turnarounds from inside the business, and had watched value leak every time strategy was handed from a partner to a junior bench. So we removed the pyramid: every engagement is led by a named Managing Partner in direct operational control, capped at 3 to 4 concurrent mandates.',
            'And we changed how we are paid. 40% of our fee is fixed; 60% is earned only when outcomes are verified in your General Ledger. When you miss, we forfeit. That single mechanic aligns our economics with yours from day one.',
          ],
        },
        {
          type: 'points',
          tint: true,
          heading: 'How we are built differently',
          items: [
            { h: 'Partner-led execution', p: 'Named, seasoned operators and interim CxOs embedded directly into your leadership team, never a subcontracted bench.' },
            { h: 'The 40/60 alignment', p: '60% of our fee is at risk against milestones verified in your ledger, not slideware.' },
            { h: 'Independent verification', p: 'Through a joint venture with Baker Tilly, we pair partner-led execution with independent financial due diligence and assurance, so outcomes are verified by a third party, not marked by us.' },
            { h: 'Specialist reach', p: 'Deep execution across London, Barcelona and EMEA, spanning 9 jurisdictions, under Chatham House and verified-GL outcome standards.' },
          ],
        },
        {
          type: 'related',
          heading: 'Read next',
          items: [
            { tag: 'Model', h: 'Why partner-led beats matrix', href: '/about/partner-led-model' },
            { tag: 'Team', h: 'Meet the managing partners', href: '/about/team' },
          ],
        },
      ]}
      cta={{
        eyebrow: 'Work with a partner',
        title: 'Talk to the partner who would run your deal.',
        secondary: { label: 'Meet the partners', href: '/about/team' },
      }}
    />
  )
}
