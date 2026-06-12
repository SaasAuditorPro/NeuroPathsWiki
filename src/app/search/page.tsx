import { supabase } from '@/lib/supabase'
import type { Listing } from '@/lib/types'
import ListingCard from '@/components/ListingCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import SearchBar from '@/components/SearchBar'
import EmptyState from '@/components/EmptyState'
import type { Metadata } from 'next'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `"${q}" — NeuroPaths search` : 'Search — NeuroPaths',
  }
}

async function search(q: string): Promise<Listing[]> {
  if (!q.trim()) {
    const { data } = await supabase
      .from('listings')
      .select('*, category:categories(*)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .limit(50)
    return data ?? []
  }

  const { data } = await supabase
    .from('listings')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .or(
      `name.ilike.%${q}%,tagline.ilike.%${q}%,description.ilike.%${q}%,audhd_context.ilike.%${q}%`
    )
    .order('is_featured', { ascending: false })

  return data ?? []
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const results = await search(q)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: q ? `Search: ${q}` : 'Search' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          {q ? `Results for "${q}"` : 'All resources'}
        </h1>
        <SearchBar initialQuery={q} />
      </div>

      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
        {results.length} {results.length === 1 ? 'result' : 'results'}
        {q ? ` for "${q}"` : ''}
      </p>

      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <EmptyState message={`Nothing found for "${q}" — but we're adding more every week.`} />
      )}
    </div>
  )
}
