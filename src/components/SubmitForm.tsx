'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SubmitForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: data.get('name') as string,
      website_url: data.get('website_url') as string,
      category_suggestion: data.get('category_suggestion') as string,
      description: data.get('description') as string,
      cost_type: data.get('cost_type') as string,
      access_type: data.get('access_type') as string,
      submitter_name: data.get('submitter_name') as string,
      submitter_email: data.get('submitter_email') as string,
      notes: data.get('notes') as string,
    }

    const { error } = await supabase.from('submission_requests').insert([payload])

    if (error) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again, or email us directly.')
    } else {
      setStatus('success')
      form.reset()
    }
  }

  const inputClass = 'w-full rounded-lg border px-4 py-3 text-base'
  const inputStyle = {
    borderColor: 'var(--border)',
    backgroundColor: '#fff',
    color: 'var(--text)',
  }
  const labelClass = 'block text-sm font-semibold mb-1.5'

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-8 text-center border"
        style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-light)' }}
      >
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
          Submission received — thank you.
        </p>
        <p className="text-base" style={{ color: 'var(--muted)' }}>
          We review every submission and will add qualifying listings as soon as we can.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* About the listing */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-bold text-lg mb-4" style={{ color: 'var(--text)' }}>
          About the listing
        </legend>

        <div>
          <label htmlFor="name" className={labelClass} style={{ color: 'var(--text)' }}>
            Name of the service or organisation <span style={{ color: 'var(--crisis)' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            style={inputStyle}
            placeholder="e.g. Ambitious about Autism"
          />
        </div>

        <div>
          <label htmlFor="website_url" className={labelClass} style={{ color: 'var(--text)' }}>
            Website URL
          </label>
          <input
            id="website_url"
            name="website_url"
            type="url"
            className={inputClass}
            style={inputStyle}
            placeholder="https://example.org"
          />
        </div>

        <div>
          <label htmlFor="category_suggestion" className={labelClass} style={{ color: 'var(--text)' }}>
            Category
          </label>
          <select
            id="category_suggestion"
            name="category_suggestion"
            className={inputClass}
            style={inputStyle}
          >
            <option value="">Choose a category…</option>
            <option value="benefits">Benefits & financial support</option>
            <option value="mental-health">Mental health</option>
            <option value="employment">Employment & work</option>
            <option value="community">Community & peer support</option>
            <option value="housing">Housing</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="crisis">Crisis support</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className={labelClass} style={{ color: 'var(--text)' }}>
            What does this service do? <span style={{ color: 'var(--crisis)' }}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className={inputClass}
            style={inputStyle}
            placeholder="Describe what this service offers and who it's for."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cost_type" className={labelClass} style={{ color: 'var(--text)' }}>
              Cost
            </label>
            <select
              id="cost_type"
              name="cost_type"
              className={inputClass}
              style={inputStyle}
            >
              <option value="">Not sure</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="mixed">Free & paid options</option>
              <option value="means_tested">Income-based</option>
            </select>
          </div>

          <div>
            <label htmlFor="access_type" className={labelClass} style={{ color: 'var(--text)' }}>
              Location
            </label>
            <select
              id="access_type"
              name="access_type"
              className={inputClass}
              style={inputStyle}
            >
              <option value="">Not sure</option>
              <option value="national">Available everywhere</option>
              <option value="online">Online only</option>
              <option value="local">Local area</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* About the submitter */}
      <fieldset className="flex flex-col gap-5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <legend className="font-bold text-lg mb-4" style={{ color: 'var(--text)' }}>
          About you (optional)
        </legend>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="submitter_name" className={labelClass} style={{ color: 'var(--text)' }}>
              Your name
            </label>
            <input
              id="submitter_name"
              name="submitter_name"
              type="text"
              className={inputClass}
              style={inputStyle}
              placeholder="Optional"
            />
          </div>
          <div>
            <label htmlFor="submitter_email" className={labelClass} style={{ color: 'var(--text)' }}>
              Your email
            </label>
            <input
              id="submitter_email"
              name="submitter_email"
              type="email"
              className={inputClass}
              style={inputStyle}
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass} style={{ color: 'var(--text)' }}>
            Anything else we should know?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className={inputClass}
            style={inputStyle}
            placeholder="Optional — e.g. personal experience with this service, why it matters for AuDHD people."
          />
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="text-sm rounded-lg p-3" style={{ backgroundColor: '#FDF2F2', color: 'var(--crisis)' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-lg px-6 py-3.5 font-semibold text-base disabled:opacity-60"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        {status === 'submitting' ? 'Sending…' : 'Submit listing'}
      </button>

      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        We review every submission before publishing. We do not share your details with anyone.
      </p>
    </form>
  )
}
