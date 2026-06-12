import Link from 'next/link'

export default function EmptyState({ message }: { message?: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
      <p className="text-base mb-2" style={{ color: 'var(--muted)' }}>
        {message ?? 'Nothing here yet — but we\'re adding more every week.'}
      </p>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>
        You can also{' '}
        <Link href="/submit" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
          suggest a listing
        </Link>
        .
      </p>
    </div>
  )
}
