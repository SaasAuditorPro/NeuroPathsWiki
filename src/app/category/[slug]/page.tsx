import { supabase } from '@/lib/supabase'
import type { Category, Listing, CostType, AccessType } from '@/lib/types'
import ListingCard from '@/components/ListingCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import EmptyState from '@/components/EmptyState'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ cost?: string; access?: string }>
}

async function getCategory(slug: string): Promise<Category | null> {
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).single()
  return data
}

async function getListings(categoryId: string, cost?: string, access?: string): Promise<Listing[]> {
  let query = supabase
    .from('listings')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })

  if (cost) query = query.eq('cost_type', cost)
  if (access) query = query.eq('access_type', access)

  const { data } = await query
  return data ?? []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return {}
  return {
    title: `${category.name} — NeuroPaths`,
    description: category.description,
  }
}

const COST_OPTIONS: { value: CostType | ''; label: string }[] = [
  { value: '', label: 'Any cost' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
  { value: 'mixed', label: 'Free & paid' },
  { value: 'means_tested', label: 'Income-based' },
]

const ACCESS_OPTIONS: { value: AccessType | ''; label: string }[] = [
  { value: '', label: 'Any location' },
  { value: 'national', label: 'Available everywhere' },
  { value: 'online', label: 'Online' },
  { value: 'local', label: 'Local area' },
]

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { cost, access } = await searchParams

  const category = await getCategory(slug)
  if (!category) notFound()

  const listings = await getListings(category.id, cost, access)
  const isCrisis = category.slug === 'crisis'

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: category.name }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">{category.icon}</span>
          <h1
            className="text-3xl font-bold"
            style={{ color: isCrisis ? 'var(--crisis)' : 'var(--text)' }}
          >
            {category.name}
          </h1>
        </div>
        <p className="text-base" style={{ color: 'var(--muted)' }}>{category.description}</p>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-8" method="GET">
        <div className="flex items-center gap-2">
          <label htmlFor="cost" className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            Cost:
          </label>
          <select
            id="cost"
            name="cost"
            defaultValue={cost ?? ''}
            className="rounded-lg border px-3 py-1.5 text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {COST_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="access" className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            Location:
          </label>
          <select
            id="access"
            name="access"
            defaultValue={access ?? ''}
            className="rounded-lg border px-3 py-1.5 text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {ACCESS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg px-4 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          Filter
        </button>
        {(cost || access) && (
          <a
            href={`/category/${slug}`}
            className="rounded-lg px-4 py-1.5 text-sm font-medium border"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            Clear filters
          </a>
        )}
      </form>

      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
        {listings.length} {listings.length === 1 ? 'result' : 'results'}
      </p>

      {listings.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
