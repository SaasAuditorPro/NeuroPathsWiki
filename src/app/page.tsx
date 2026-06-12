import { supabase } from '@/lib/supabase'
import type { Category, Listing } from '@/lib/types'
import CategoryTile from '@/components/CategoryTile'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

export const revalidate = 3600

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('display_order')
    .limit(100)
  return data ?? []
}

async function getFeaturedListings(): Promise<Listing[]> {
  const { data } = await supabase
    .from('listings')
    .select('*, category:categories(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(6)
  return data ?? []
}

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedListings()])

  return (
    <>
      {/* Hero */}
      <section
        className="px-6 pt-16 pb-14 text-center"
        style={{ backgroundColor: 'var(--accent-light)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--text)' }}>
            Everything in one place.
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
            NeuroPaths brings together every benefit, service, charity and resource for AuDHD adults
            in the UK — so you don&apos;t have to search everywhere.
          </p>
          <SearchBar />
          <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
            Or{' '}
            <a href="#categories" className="underline font-medium" style={{ color: 'var(--accent)' }}>
              browse by category
            </a>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Categories */}
        <section id="categories" className="py-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Find support
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
            Browse resources by what you need right now.
          </p>
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(cat => (
                <CategoryTile key={cat.id} category={cat} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)' }}>Categories loading…</p>
          )}
        </section>

        {/* Featured listings */}
        {featured.length > 0 && (
          <section className="pb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  Featured resources
                </h2>
                <p className="text-base mt-1" style={{ color: 'var(--muted)' }}>
                  Well-rated services and support across different areas.
                </p>
              </div>
              <Link
                href="/search?q="
                className="text-sm font-semibold underline flex-shrink-0"
                style={{ color: 'var(--accent)' }}
              >
                See all
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        {/* Submit CTA */}
        <section
          className="rounded-2xl p-10 mb-16 text-center"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Know a resource that should be here?
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
            Help us grow the directory. Submissions are reviewed and added free of charge.
          </p>
          <Link
            href="/submit"
            className="inline-block rounded-lg px-6 py-3 font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Submit a listing
          </Link>
        </section>
      </div>
    </>
  )
}
