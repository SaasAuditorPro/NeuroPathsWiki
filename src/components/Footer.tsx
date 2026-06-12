import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="border-t mt-16 pb-24 md:pb-0"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-bold text-lg" style={{ color: 'var(--accent)' }}>NeuroPaths</p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>NeuroPaths is free to use, always.</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Built by AuDHD people, for AuDHD people.</p>
          </div>
          <nav className="flex gap-6 text-sm font-medium" aria-label="Footer navigation">
            <Link href="/" className="hover:underline" style={{ color: 'var(--muted)' }}>Home</Link>
            <Link href="/submit" className="hover:underline" style={{ color: 'var(--muted)' }}>Submit a listing</Link>
            <Link href="/about" className="hover:underline" style={{ color: 'var(--muted)' }}>About</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
