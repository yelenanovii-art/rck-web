import ContentPage from '../components/ContentPage'
import { COMPANY } from '../config'

// /legal — Legal Notice (Aviso Legal) satisfying LSSI-CE Article 10 identification
// for a Spain-registered company. Identity is centralised in config (COMPANY).
// Add the full registered street address (config.COMPANY.registeredAddress)
// before publishing — LSSI-CE requires the registered address.
const entity = `${COMPANY.legalName}, trading as ${COMPANY.tradingName}`
const office = COMPANY.registeredAddress || COMPANY.registeredCity

export default function LegalNotice() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Legal Notice"
      dek="Company identification and terms governing use of this website, published in accordance with Spanish Law 34/2002 (LSSI-CE)."
      meta="Last updated: September 2026"
      blocks={[
        {
          type: 'prose',
          heading: 'Website owner',
          body: [
            'In accordance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:',
            `**Company:** ${entity}`,
            `**Tax ID (NIF):** ${COMPANY.nif}`,
            `**Registered office:** ${office}`,
            `**Contact:** ${COMPANY.email}`,
            '**Activity:** partner-led M&A transformation advisory and interim executive services.',
          ],
        },
        {
          type: 'prose',
          heading: 'Purpose',
          body: [
            'This website presents RCK Outcome Partners’ services and allows visitors to make enquiries and request information. Use of the site attributes the status of user and implies acceptance of this Legal Notice.',
          ],
        },
        {
          type: 'prose',
          heading: 'Intellectual property',
          body: [
            'All content on this site — including text, graphics, logos, the RCK name and marks, page design, and the TRANSFORM+ and Outcome Circle™ names — is owned by or licensed to the company and protected by intellectual-property law. You may view and print pages for your own reference. Any other reproduction, distribution, public communication or transformation without prior written permission is prohibited.',
          ],
        },
        {
          type: 'prose',
          heading: 'Disclaimer',
          body: [
            'The figures shown in our diagnostics, calculators and case examples are **illustrative models, not quotes, forecasts or professional advice**, and outcomes depend on the specifics of each engagement. The company takes reasonable care to keep the site accurate and available but does not warrant that it will be uninterrupted or error-free, and is not liable for decisions taken solely on the basis of site content or for the content of third-party sites we link to.',
          ],
        },
        {
          type: 'prose',
          heading: 'Governing law',
          body: [
            'This Legal Notice is governed by Spanish law. Any dispute relating to the website will be subject to the courts of Barcelona, save where the law provides otherwise for consumers.',
          ],
        },
      ]}
      cta={{
        eyebrow: 'Legal',
        title: 'A question about these terms?',
        copy: `Email ${COMPANY.email} and we’ll point you to the right person.`,
        secondary: { label: 'Privacy Policy', href: '/privacy' },
      }}
    />
  )
}
