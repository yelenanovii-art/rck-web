import ContentPage from '../components/ContentPage'
import { COMPANY } from '../config'

// /terms — Website Terms of Use. Drafted from RCK's Legal Notice & Website Terms
// of Use document; reconcile with counsel's approved wording before launch.
const entity = `${COMPANY.legalName}, trading as ${COMPANY.tradingName}`

export default function Terms() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of Use"
      dek="The terms on which you may use this website. By using the site, you accept these terms."
      meta="Last updated: September 2026"
      blocks={[
        {
          type: 'prose',
          heading: 'Acceptance',
          body: [
            `This website is operated by **${entity}** (NIF ${COMPANY.nif}). By accessing or using the site you agree to these Terms of Use and to our Legal Notice, Privacy Policy and Cookie Policy. If you do not agree, please do not use the site.`,
          ],
        },
        {
          type: 'prose',
          heading: 'Permitted use',
          body: [
            'You may use this site for lawful, informational and business-enquiry purposes only. You agree not to misuse it — including attempting to gain unauthorised access, interfering with its operation or security, scraping it at scale, or using it to transmit unlawful, misleading or harmful content.',
          ],
        },
        {
          type: 'prose',
          heading: 'Intellectual property',
          body: [
            'All content and marks on this site are owned by or licensed to the company and are protected by law, as set out in our **Legal Notice**. No licence to reuse them is granted except as expressly stated there.',
          ],
        },
        {
          type: 'prose',
          heading: 'No advice; illustrative figures',
          body: [
            'The site is for general information. Nothing on it constitutes legal, financial, tax or investment advice, or an offer or quote. The outputs of our diagnostics and calculators are **illustrative models based on the assumptions shown**, not commitments or forecasts. Any engagement is governed solely by a separate signed agreement.',
          ],
        },
        {
          type: 'prose',
          heading: 'Limitation of liability',
          body: [
            'The site is provided “as is”. To the fullest extent permitted by law, the company is not liable for any loss arising from use of, or reliance on, the site or its content, or from its temporary unavailability. We are not responsible for the content of third-party websites we link to.',
          ],
        },
        {
          type: 'prose',
          heading: 'Changes and governing law',
          body: [
            'We may update the site and these terms from time to time; the current version always applies. These terms are governed by Spanish law, with disputes subject to the courts of Barcelona save where the law provides otherwise for consumers.',
          ],
        },
      ]}
      cta={{
        eyebrow: 'Legal',
        title: 'Need clarification on these terms?',
        copy: `Email ${COMPANY.email} and we’ll help.`,
        secondary: { label: 'Legal Notice', href: '/legal' },
      }}
    />
  )
}
