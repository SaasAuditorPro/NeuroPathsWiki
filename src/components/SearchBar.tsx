'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" role="search">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for support, services or resources…"
            className="w-full rounded-xl border-2 px-5 py-3.5 text-base"
            style={{
              borderColor: 'var(--accent)',
              backgroundColor: '#fff',
              color: 'var(--text)',
            }}
            aria-label="Search NeuroPaths"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl px-6 py-3.5 font-semibold text-base"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          Search
        </button>
      </div>
    </form>
  )
}
