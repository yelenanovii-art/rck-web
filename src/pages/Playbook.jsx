import LeadForm from '../components/LeadForm'
import CTABand from '../components/CTABand'
import { Check } from '../components/Icons'

// Resource page — /resources/playbooks
// Lead-gated download. NOTE: the actual PDF + delivery automation still need to
// be set up — the form captures the lead via src/config.js (FORM_ENDPOINT);
// wire the PDF send in your form tool (or attach it to the autoresponder).
const INSIDE = [
  'The Baseline Schedule: defining and locking outcomes before work starts',
  'GL-based measurement, booking value where your CFO already looks',
  'The three-way verification check, with CFO or auditor sign-off',
  'How to structure a 40/60 fee against realised milestones',
  'Day 1 / Day 100 integration sequencing',
  'The Week 2 failure modes, and how to pre-empt them',
]

export default function Playbook() {
  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Free resource · PDF</p>
          <h1 className="hero__title">The Outcomes-Based PMI Playbook</h1>
          <p className="hero__sub">
            The operating playbook behind our 40/60 engagements: how we baseline outcomes, verify
            them in the ledger, and structure fee against realised value. Written by operators, not a
            knowledge-management team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container playbook-grid">
          <div className="reveal">
            <p className="eyebrow">What&rsquo;s inside</p>
            <h2 className="playbook-h">Six things most PMI decks leave out.</h2>
            <ul className="checklist">
              {INSIDE.map((t, i) => (
                <li key={i}>
                  <span className="checklist__mark"><Check size={15} /></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="playbook-note">
              Representative of the methodology used on anonymised engagements. Detail available under
              NDA.
            </p>
          </div>

          <div className="playbook-form reveal" style={{ '--delay': '90ms' }}>
            <div className="playbook-form__head">
              <span className="playbook-form__tag">Free · PDF</span>
              <h3>Get the playbook</h3>
              <p>Tell us where to send it, one email with the download, no spam.</p>
            </div>
            <LeadForm
              fields={['name', 'company', 'email']}
              submitLabel="Email me the playbook"
              successTitle="On its way."
              successBody="Thanks. We’ll email you the Outcomes-Based PMI Playbook shortly. If it does not arrive, contact info@rckpm.es."
              note="We never share your details. By requesting the playbook you agree to be contacted about your enquiry."
              hidden={{ source: 'playbook-download' }}
            />
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Prefer to talk"
        title="Rather have the conversation than the PDF?"
        copy="Book a partner-led strategy call and we will pressure-test where value is at risk on your deal."
        secondary={{ label: 'Take the Value-at-Risk Assessment', href: '/diagnostics/value-at-risk' }}
      />
    </>
  )
}
