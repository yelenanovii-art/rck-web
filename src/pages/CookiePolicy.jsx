import ContentPage from '../components/ContentPage'
import { COMPANY } from '../config'

// /cookies — Cookie Policy. Written to match the live consent banner exactly:
// strictly-necessary + a consent record + optional analytics (only on accept),
// re-openable via the footer "Cookie Settings" link. No third-party marketing
// cookies are set. Keep this in sync with src/components/CookieConsent.jsx.
export default function CookiePolicy() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Cookie Policy"
      dek="What we store on your device, why, and how to change your choice at any time."
      meta="Last updated: September 2026"
      blocks={[
        {
          type: 'prose',
          heading: 'Our approach',
          body: [
            'Cookies and similar technologies are small pieces of data stored on your device. We keep our use of them to a minimum: the site runs on strictly-necessary storage, and we set optional analytics cookies **only if you accept them**. When you first visit, a banner lets you choose “Accept all” or “Necessary only”, and your choice is remembered so you are not asked again.',
          ],
        },
        {
          type: 'prose',
          heading: 'What we use',
          body: [
            '**Strictly necessary.** Storage required for the site to work — for example remembering your cookie choice. These are always active and do not need consent.',
            '**Consent record.** We store your cookie preference on your device (a small entry named “rck-cookie-consent”) so the banner does not reappear on every visit. It records only whether you accepted analytics and when.',
            '**Optional — analytics.** If you choose “Accept all”, we may use analytics to understand, in aggregate, how the site is used so we can improve it. These are not set if you choose “Necessary only”, and are never used to identify you personally.',
            'We do **not** use advertising or third-party marketing cookies, and we do not sell data collected through cookies.',
          ],
        },
        {
          type: 'prose',
          heading: 'Changing your choice',
          body: [
            'You can change or withdraw your consent at any time using the **Cookie Settings** link in the site footer, which reopens the banner. You can also block or delete cookies through your browser settings; note that disabling strictly-necessary storage may stop parts of the site working.',
          ],
        },
        {
          type: 'prose',
          heading: 'More information',
          body: [
            `For how we handle any personal data, see our **Privacy Policy**. For anything else, contact **${COMPANY.email}**.`,
          ],
        },
      ]}
      cta={{
        eyebrow: 'Your choices',
        title: 'Want to review the rest of our data practices?',
        copy: 'Our Privacy Policy explains what we collect and the rights you have.',
        secondary: { label: 'Privacy Policy', href: '/privacy' },
      }}
    />
  )
}
