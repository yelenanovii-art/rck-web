import ContentPage from '../components/ContentPage'
import { COMPANY } from '../config'

// /privacy — GDPR / LOPDGDD privacy notice. Company identity is centralised in
// config (COMPANY). This is drafted from the facts in RCK's Legal Notice and the
// site's real data flows; reconcile with counsel's approved wording and add the
// registered street address (config.COMPANY.registeredAddress) before launch.
const entity = `${COMPANY.legalName}, trading as ${COMPANY.tradingName}`
const office = COMPANY.registeredAddress || COMPANY.registeredCity

export default function Privacy() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy Policy"
      dek="How RCK Outcome Partners collects, uses and protects your personal data, and the rights you have over it under the GDPR and Spanish data-protection law (LOPDGDD)."
      meta="Last updated: September 2026"
      blocks={[
        {
          type: 'prose',
          heading: 'Who is responsible for your data',
          body: [
            `The data controller is **${entity}** (NIF ${COMPANY.nif}), registered office at ${office}.`,
            `For any privacy question or to exercise your rights, contact us at **${COMPANY.email}**.`,
          ],
        },
        {
          type: 'prose',
          heading: 'What we collect',
          body: [
            '**Information you give us.** When you submit an enquiry, request the board-ready breakdown from the Deal Value Modeller, download a playbook, or apply to The Outcome Circle™, we collect the details you provide — typically your name, company, work email, phone number, the context of your enquiry and, for Outcome Circle applications, professional details and any CV you choose to attach.',
            '**Information collected automatically.** Standard server logs (such as IP address, browser type and pages viewed) needed to operate and secure the site. With your consent, we may also set optional analytics cookies — see our **Cookie Policy** for the full detail.',
          ],
        },
        {
          type: 'prose',
          heading: 'Why we use it, and our lawful basis',
          body: [
            '**To respond to you and scope an engagement** — on the basis of steps taken at your request prior to entering a contract, and our legitimate interest in answering business enquiries.',
            '**To send the material or follow-up you asked for** (for example, an emailed breakdown or a single partner follow-up) — on the basis of your request and, where required, your consent.',
            '**To operate, secure and improve the site** — on the basis of our legitimate interests, and your consent for any optional analytics cookies.',
            'We do not sell your personal data, and we do not use it for automated decision-making or profiling.',
          ],
        },
        {
          type: 'prose',
          heading: 'Cookies and analytics',
          body: [
            'The site uses strictly-necessary cookies to function and, only if you accept them, optional analytics cookies. You choose when the consent banner first appears, and you can change your choice at any time via the **Cookie Settings** link in the footer. Full detail is in our **Cookie Policy**.',
          ],
        },
        {
          type: 'prose',
          heading: 'Who we share it with',
          body: [
            'We share your data only with service providers who process it on our behalf under written agreements — for example our form-handling provider, CRM and meeting-scheduling platform, email and website-hosting providers. Each acts on our instructions and only to deliver the service. A current list of these processors is available on request at ' + COMPANY.email + '.',
            '**International transfers.** Where a provider processes data outside the European Economic Area, the transfer is covered by an adequacy decision or Standard Contractual Clauses, so your data keeps an equivalent level of protection.',
            'We may also disclose data where required by law or to establish, exercise or defend legal claims.',
          ],
        },
        {
          type: 'prose',
          heading: 'How long we keep it',
          body: [
            'We keep enquiry and engagement data only as long as needed for the purpose it was collected — to respond, to manage any resulting engagement, and to meet our legal, accounting and tax obligations — after which it is deleted or anonymised. Marketing consent is kept until you withdraw it.',
          ],
        },
        {
          type: 'prose',
          heading: 'Your rights',
          body: [
            'You have the right to access your data; to have it corrected or erased; to restrict or object to its processing; to data portability; and to withdraw consent at any time without affecting prior processing.',
            `To exercise any of these, email **${COMPANY.email}**. If you believe we have not handled your data properly, you can complain to the ${COMPANY.supervisoryAuthority}.`,
          ],
        },
      ]}
      cta={{
        eyebrow: 'Your data',
        title: 'Questions about how we handle your data?',
        copy: `Email ${COMPANY.email} and a partner will respond.`,
        secondary: { label: 'Contact', href: '/contact' },
      }}
    />
  )
}
