import Link from 'next/link'
import type { Listing } from '@/lib/types'
import CostBadge from './CostBadge'
import AccessBadge from './AccessBadge'

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="block rounded-xl border p-6 card-hover no-underline"
      style={{ borderColor: 'var(--border)', backgroundColor: '#fff' }}
    >
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
    </Link>
  )
}
