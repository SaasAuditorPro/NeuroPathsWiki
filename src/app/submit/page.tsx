import Breadcrumbs from '@/components/Breadcrumbs'
import SubmitForm from '@/components/SubmitForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a listing — NeuroPaths',
  description: 'Suggest a service, charity or resource to be added to the NeuroPaths directory.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: 'Submit a listing' }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
        Submit a listing
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
        Know a service, charity or resource that should be in the directory? Tell us about it.
        We review every submission and add qualifying listings for free.
      </p>

      <SubmitForm />
    </div>
  )
}
