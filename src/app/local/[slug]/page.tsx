import { supabase } from '@/lib/supabase'
import Breadcrumbs from '@/components/Breadcrumbs'
import ListingCard from '@/components/ListingCard'
import EmptyState from '@/components/EmptyState'
import { notFound } from 'next/navigation'
import { regions } from '../page'
import type { Metadata } from 'next'
import type { Listing } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const region = regions.find(r => r.slug === slug)
  if (!region) return {}
  return {
    title: `${region.name} — NeuroPaths`,
    description: `AuDHD support services and resources in ${region.name}: ${region.counties}.`,
  }
}

async function getRegionListings(regionName: string): Promise<Listing[]> {
  // Search listings that mention the region name or are nationally accessible
  const { data } = await supabase
    .from('listings')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .or(`access_type.eq.national,access_type.eq.online,tags.cs.{"${regionName}"}`)
    .order('is_featured', { ascending: false })
    .limit(30)
  return data ?? []
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params
  const region = regions.find(r => r.slug === slug)
  if (!region) notFound()

  const listings = await getRegionListings(region.name)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: 'Find local support', href: '/local' }, { label: region.name }]} />

      <div className="flex items-center gap-3 mb-2">
        <span
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: region.color }}
          aria-hidden="true"
        />
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
          {region.name}
        </h1>
      </div>
      <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
        {region.counties}
      </p>

      <div
        className="rounded-xl p-5 mb-8 text-sm"
        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--muted)' }}
      >
        Showing national and online services available to you, plus any local listings tagged for this region.
        Many AuDHD services operate UK-wide or online — you do not need to find something local to get good support.
      </div>

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
