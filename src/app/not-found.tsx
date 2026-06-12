import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <p className="text-5xl font-bold mb-4" style={{ color: 'var(--accent)' }}>404</p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
        Page not found
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
        That page doesn&apos;t exist — it may have moved or been removed.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg px-6 py-3 font-semibold"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        Back to home
      </Link>
    </div>
  )
}
