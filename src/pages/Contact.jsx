import Photo from '../components/Photo'
import LeadForm from '../components/LeadForm'
import { Pin } from '../components/Icons'

export default function Contact() {
  return (
    <>
      <section className="hero hero--contact">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">Contact</p>
          <h1 className="hero__title">Let&rsquo;s talk about your next deal.</h1>
          <p className="hero__sub">
            Tell us where value is leaking. We&rsquo;ll come back within one business day to arrange a
            partner-led strategy call and, where it fits, scope the 40/60 model against your plan.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <LeadForm
              fields={['name', 'company', 'role', 'email', 'interest', 'message']}
              submitLabel="Request a strategy call"
              successTitle="Thank you, your request is in."
              successBody="A member of our partner team will be in touch within one business day. For anything urgent, email info@rckpm.es."
              note="By submitting you agree to be contacted about your enquiry. We never share your details. All conversations are confidential."
              hidden={{ source: 'contact-page' }}
            />
          </div>

          <aside className="contact-aside reveal" style={{ '--delay': '90ms' }}>
            <Photo
              ratio="4 / 3"
              suggest="The London (Mayfair) or Barcelona office, reception, a warm meeting room, or a striking architectural detail of the building. Understated and premium; sets the tone before the first call."
            />
            <div className="contact-card">
              <h4>Offices</h4>
              <div className="office">
                <Pin />
                <div>
                  <b>London</b>
                  117 Piccadilly, Mayfair, London, UK<br />
                  <span style={{ color: 'var(--muted)' }}>
                    <a href="tel:+447812162288">+44 7812 162288</a>
                  </span>
                </div>
              </div>
              <div className="office">
                <Pin />
                <div>
                  <b>Barcelona · registered office</b>
                  Avenida Diagonal 317, Barcelona, Spain<br />
                  <span style={{ color: 'var(--muted)' }}>
                    <a href="tel:+34671779991">+34 671 77 9991</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h4>Direct</h4>
              <p style={{ marginBottom: 8 }}>Managing Partner enquiries</p>
              <a href="mailto:info@rckpm.es">info@rckpm.es</a>
            </div>

            <div className="contact-card">
              <h4>What to expect</h4>
              <ul className="expect-list">
                <li><span className="n">1</span><span>A partner, not a junior, reviews your enquiry within one business day.</span></li>
                <li><span className="n">2</span><span>A 30-minute call to pressure-test where value is at risk.</span></li>
                <li><span className="n">3</span><span>If it fits, we scope 3–5 milestones and the 40/60 model against your VCP.</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
