'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header
      className="sticky top-0 z-50 border-b hidden md:block"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-xl font-bold" style={{ color: 'var(--accent)' }}>
          NeuroPaths
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for support, services or resources…"
              className="w-full rounded-lg border px-4 py-2 pr-10 text-base"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: '#fff',
                color: 'var(--text)',
              }}
              aria-label="Search NeuroPaths"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded"
              style={{ color: 'var(--accent)' }}
              aria-label="Search"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </form>

        {/* Nav links */}
        <nav className="flex items-center gap-4 text-sm font-medium flex-shrink-0">
          <Link href="/category/benefits" className="hover:underline" style={{ color: 'var(--muted)' }}>Benefits</Link>
          <Link href="/category/mental-health" className="hover:underline" style={{ color: 'var(--muted)' }}>Mental health</Link>
          <Link href="/category/employment" className="hover:underline" style={{ color: 'var(--muted)' }}>Work</Link>
          <Link href="/category/community" className="hover:underline" style={{ color: 'var(--muted)' }}>Community</Link>
          <Link
            href="/submit"
            className="rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Submit a listing
          </Link>
        </nav>
      </div>
    </header>
  )
}
