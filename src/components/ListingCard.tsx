import Link from 'next/link'
import type { Listing } from '@/lib/types'
import CostBadge from './CostBadge'
import AccessBadge from './AccessBadge'

// Soft category accent colours for the card banner — no images needed, just a calm gradient strip
const categoryColours: Record<string, string> = {
  'benefits-money':      'linear-gradient(135deg, #D4E8E8 0%, #EBF4F4 100%)',
  'diagnosis-assessment':'linear-gradient(135deg, #D8E8F0 0%, #EDF4F8 100%)',
  'mental-health':       'linear-gradient(135deg, #D8EAD8 0%, #EDF6ED 100%)',
  'community-social':    'linear-gradient(135deg, #E8DFF0 0%, #F4EFF8 100%)',
  'workplace-rights':    'linear-gradient(135deg, #E8EAD4 0%, #F4F5EB 100%)',
  'physical-wellbeing':  'linear-gradient(135deg, #D4E8D8 0%, #EBF4ED 100%)',
  'tools-resources':     'linear-gradient(135deg, #E0E8F0 0%, #EDF2F8 100%)',
  'crisis-support':      'linear-gradient(135deg, #F0D8D8 0%, #F8EDED 100%)',
  'parents-carers':      'linear-gradient(135deg, #F0E8D4 0%, #F8F4EB 100%)',
}

const fallbackGradient = 'linear-gradient(135deg, #EBF4F4 0%, #F5F9F9 100%)'

export default function ListingCard({ listing }: { listing: Listing }) {
  const categorySlug = (listing.category as { slug?: string } | undefined)?.slug ?? ''
  const bannerGradient = categoryColours[categorySlug] ?? fallbackGradient

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="block rounded-xl border overflow-hidden card-hover no-underline"
      style={{ borderColor: 'var(--border)', backgroundColor: '#fff' }}
    >
      {/* Colour banner strip */}
      <div
        className="h-2"
        style={{ background: bannerGradient }}
        aria-hidden="true"
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-base leading-snug" style={{ color: 'var(--text)' }}>
            {listing.name}
            {listing.is_verified && (
              <span
                className="ml-2 inline-block align-middle text-xs px-1.5 py-0.5 rounded font-medium"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                title="Verified listing"
              >
                Verified
              </span>
            )}
          </h3>
        </div>

        <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{listing.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <CostBadge type={listing.cost_type} />
          <AccessBadge type={listing.access_type} />
          {listing.referral_required && (
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-medium border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
            >
              Referral needed
            </span>
          )}
        </div>

        {listing.audhd_context && (
          <div
            className="rounded-lg p-3 text-sm"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text)' }}
          >
            <p className="font-semibold text-xs mb-1" style={{ color: 'var(--accent)' }}>
              Why this matters for AuDHD
            </p>
            <p className="leading-relaxed">{listing.audhd_context}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
