import { supabase } from '@/lib/supabase'
import type { Listing } from '@/lib/types'
import Breadcrumbs from '@/components/Breadcrumbs'
import CostBadge from '@/components/CostBadge'
import AccessBadge from '@/components/AccessBadge'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

async function getListing(slug: string): Promise<Listing | null> {
  const { data } = await supabase
    .from('listings')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return {}
  return {
    title: `${listing.name} — NeuroPaths`,
    description: listing.tagline,
  }
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) notFound()

  const category = listing.category as { name: string; slug: string } | undefined

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Breadcrumbs
        crumbs={
          category
            ? [
                { label: category.name, href: `/category/${category.slug}` },
                { label: listing.name },
              ]
            : [{ label: listing.name }]
        }
      />

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {listing.name}
          </h1>
          {listing.is_verified && (
            <span
              className="px-2 py-0.5 rounded text-xs font-semibold"
              style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              Verified
            </span>
          )}
        </div>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>{listing.tagline}</p>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2 mb-8">
        <CostBadge type={listing.cost_type} />
        <AccessBadge type={listing.access_type} />
        {listing.referral_required && (
          <span
            className="px-2 py-0.5 rounded text-xs font-medium border"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            Referral needed
          </span>
        )}
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="px-2 py-0.5 rounded text-xs font-medium border hover:underline"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            {category.name}
          </Link>
        )}
      </div>

      {/* AuDHD context — highlighted prominently */}
      {listing.audhd_context && (
        <div
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--accent)' }}>
            Why this matters for AuDHD
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
            {listing.audhd_context}
          </p>
        </div>
      )}

      {/* Description */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--text)' }}>About</h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
          {listing.description}
        </p>
      </div>

      {/* Tags */}
      {listing.tags && listing.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-sm mb-2" style={{ color: 'var(--muted)' }}>Tags</h2>
          <div className="flex flex-wrap gap-2">
            {listing.tags.map(tag => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full text-sm border hover:underline"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        {listing.website_url && (
          <a
            href={listing.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-6 py-3 font-semibold text-base"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Visit website
          </a>
        )}
        {listing.apply_url && (
          <a
            href={listing.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-6 py-3 font-semibold text-base border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Apply or get access
          </a>
        )}
      </div>
    </div>
  )
}
