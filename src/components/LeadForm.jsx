import { useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { submitForm } from '../lib/submitForm'

// Reusable lead-capture form. Submissions POST to the endpoint configured in
// src/config.js (FORM_ENDPOINT). Pass `manageSuccess={false}` to let a parent
// take over after a successful submit (the quiz uses this to reveal the report).
const FIELD_DEFS = {
  name: { label: 'Full name', type: 'text', required: true, ph: 'Jane Doe' },
  company: { label: 'Company', type: 'text', required: true, ph: 'Acme Capital' },
  role: { label: 'Role', type: 'text', ph: 'Partner / CFO / Corp Dev' },
  email: { label: 'Work email', type: 'email', required: true, ph: 'jane@acme.com' },
  phone: { label: 'Phone', type: 'tel', ph: '+44 20 …' },
  message: { label: 'What are you working on?', type: 'textarea', ph: 'Deal stage, timeline, and where value is most at risk…' },
  interest: {
    label: 'I’m interested in',
    type: 'select',
    options: [
      ['advisory', 'Deal Advisory & Interim Execution'],
      ['platform', 'TRANSFORM+ Platform'],
      ['both', 'Both advisory and platform'],
    ],
  },
}

// Fields that sit nicely two-up on wide screens.
const PAIR = new Set(['name', 'company', 'role', 'phone'])

export default function LeadForm({
  fields = ['name', 'company', 'email', 'message'],
  submitLabel = 'Send message',
  note = 'We never share your details. All conversations are confidential.',
  successTitle = 'Thank you, your message is in.',
  successBody = 'A partner will be in touch within one business day.',
  manageSuccess = true,
  onSubmitted,
  hidden,
}) {
  const [sent, setSent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    const res = await submitForm({ _subject: `RCK website — ${submitLabel}`, ...data })
    if (res.ok) {
      setStatus('idle')
      if (manageSuccess) setSent(true)
      if (onSubmitted) onSubmitted(data)
    } else {
      setStatus('error')
    }
  }

  if (sent) {
    return (
      <div className="form-success">
        <span className="form-success__check"><Check size={22} /></span>
        <h3>{successTitle}</h3>
        <p>{successBody}</p>
      </div>
    )
  }

  // Group paired fields into rows for a tidy layout.
  const rows = []
  let buffer = []
  fields.forEach((f) => {
    if (PAIR.has(f)) {
      buffer.push(f)
      if (buffer.length === 2) { rows.push(buffer); buffer = [] }
    } else {
      if (buffer.length) { rows.push(buffer); buffer = [] }
      rows.push([f])
    }
  })
  if (buffer.length) rows.push(buffer)

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {hidden &&
        Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

      {rows.map((row, i) => (
        <div key={i} className={row.length === 2 ? 'field-row' : ''}>
          {row.map((f) => (
            <Field key={f} name={f} def={FIELD_DEFS[f]} />
          ))}
        </div>
      ))}

      <button className="btn btn-navy btn-lg" type="submit" disabled={status === 'sending'} style={{ justifySelf: 'start' }}>
        {status === 'sending' ? 'Sending…' : submitLabel}
        {status !== 'sending' && <ArrowRight />}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong sending your message. Please try again, or email{' '}
          <a href="mailto:info@rckpm.es">info@rckpm.es</a>.
        </p>
      )}
      {note && <p className="form-note">{note}</p>}
    </form>
  )
}

function Field({ name, def }) {
  const id = `lf-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>{def.label}{def.required && <span aria-hidden="true" className="req"> *</span>}</label>
      {def.type === 'textarea' ? (
        <textarea id={id} name={name} placeholder={def.ph} required={def.required} />
      ) : def.type === 'select' ? (
        <select id={id} name={name} defaultValue={def.options[0][0]}>
          {def.options.map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      ) : (
        <input id={id} name={name} type={def.type} placeholder={def.ph} required={def.required} />
      )}
    </div>
  )
}
