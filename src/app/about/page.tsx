import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — NeuroPaths',
  description: 'NeuroPaths is a free directory of support, services and resources for AuDHD adults in the UK.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: 'About' }]} />

      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text)' }}>About NeuroPaths</h1>

      <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: 'var(--text)' }}>
        <p>
          NeuroPaths is a free directory of support, services and resources for AuDHD adults in the UK.
          AuDHD means having both autism and ADHD — a combination that comes with its own specific challenges
          and strengths, but is often poorly served by services designed for one condition or the other.
        </p>

        <p>
          We built NeuroPaths because we got tired of the endless searching. Benefits information buried
          on government websites. Mental health services that don&apos;t accommodate sensory needs. Employment
          support that wasn&apos;t built with executive function in mind. We wanted one place where everything lives.
        </p>

        <p>
          Every listing includes an &ldquo;Why this matters for AuDHD&rdquo; section — because knowing a service
          exists isn&apos;t enough. You need to know whether it will actually work for you.
        </p>

        <p>
          NeuroPaths is free to use, always. We do not run ads. We do not sell data. We do not accept
          payment for listings.
        </p>

        <p>
          We verify listings where we can, but we&apos;re a small team. If you spot something out of date
          or inaccurate, please{' '}
          <Link href="/submit" className="underline font-medium" style={{ color: 'var(--accent)' }}>
            let us know
          </Link>
          .
        </p>

        <div
          className="rounded-xl p-6 mt-4"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <p className="font-semibold mb-1">Built by AuDHD people, for AuDHD people.</p>
          <p style={{ color: 'var(--muted)' }}>
            We know what it&apos;s like to need help and not know where to start.
            NeuroPaths is what we wish had existed.
          </p>
        </div>
      </div>
    </div>
  )
}
