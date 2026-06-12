import Link from 'next/link'
import type { Category } from '@/lib/types'

const crisisSlug = 'crisis-support'

// Curated Unsplash images per category slug — calm, minimal, neurodivergent-affirming
const categoryImages: Record<string, { id: string; alt: string }> = {
  'benefits-money': {
    id: 'photo-1554224155-6726b3ff858f',
    alt: '',
  },
  'diagnosis-assessment': {
    id: 'photo-1434030216411-0b793f4b4173',
    alt: '',
  },
  'mental-health': {
    id: 'photo-1506905925346-21bda4d32df4',
    alt: '',
  },
  'community-social': {
    id: 'photo-1529156069898-49953e39b3ac',
    alt: '',
  },
  'workplace-rights': {
    id: 'photo-1497366216548-37526070297c',
    alt: '',
  },
  'physical-wellbeing': {
    id: 'photo-1476480862126-209bfaa8edc8',
    alt: '',
  },
  'tools-resources': {
    id: 'photo-1499750310107-5fef28a66643',
    alt: '',
  },
  'crisis-support': {
    id: 'photo-1518531933037-91b2f5f229cc',
    alt: '',
  },
  'parents-carers': {
    id: 'photo-1536640712-4d4c36ff0e4e',
    alt: '',
  },
}

export default function CategoryTile({ category }: { category: Category }) {
  const isCrisis = category.slug === crisisSlug
  const img = categoryImages[category.slug]
  const imgUrl = img
    ? `https://images.unsplash.com/${img.id}?w=600&h=200&fit=crop&crop=center&q=70&auto=format`
    : null

  return (
    <Link
      href={`/category/${category.slug}`}
      className="block rounded-xl border overflow-hidden card-hover no-underline"
      style={{
        borderColor: isCrisis ? 'var(--crisis)' : 'var(--border)',
        backgroundColor: isCrisis ? '#FDF2F2' : '#fff',
      }}
    >
      {/* Image strip */}
      {imgUrl && (
        <div className="relative h-28 overflow-hidden">
          <img
            src={imgUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              filter: isCrisis
                ? 'saturate(0.4) brightness(0.85)'
                : 'saturate(0.6) brightness(0.95)',
            }}
            loading="lazy"
          />
          {/* Soft overlay to keep brand palette */}
          <div
            className="absolute inset-0"
            style={{
              background: isCrisis
                ? 'linear-gradient(to bottom, rgba(192,57,43,0.15), rgba(192,57,43,0.05))'
                : 'linear-gradient(to bottom, rgba(74,124,126,0.18), rgba(250,250,248,0.1))',
            }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="p-5">
        <h3
          className="font-semibold text-base mb-1"
          style={{ color: isCrisis ? 'var(--crisis)' : 'var(--text)' }}
        >
          {category.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {category.description}
        </p>
      </div>
    </Link>
  )
}
