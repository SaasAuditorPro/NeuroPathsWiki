import Link from 'next/link'
import type { Category } from '@/lib/types'

const crisisSlug = 'crisis-support'

// Specific Unsplash photo IDs — reliable CDN URLs, no deprecated source.unsplash.com
const categoryImages: Record<string, { id: string; credit: string }> = {
  'benefits-money':      { id: '1554224155-6726b3ff858f', credit: 'Kelly Sikkema' },
  'diagnosis-assessment':{ id: '1559757148-5c350d0d3c56', credit: 'Online Marketing' },
  'mental-health':       { id: '1518531933037-91b2f5f229cc', credit: 'Luca Bravo' },
  'community-social':    { id: '1529156069898-49953e39b3ac', credit: 'Helena Lopes' },
  'workplace-rights':    { id: '1497366216548-37526070297c', credit: 'Alex Kotliarskyi' },
  'physical-wellbeing':  { id: '1476480862126-209bfaa8edc8', credit: 'Jenny Hill' },
  'tools-resources':     { id: '1499750310107-5fef28a66643', credit: 'Andrew Neel' },
  'crisis-support':      { id: '1506905925346-21bda4d32df4', credit: 'Samuel Ferrara' },
  'parents-carers':      { id: '1536640712-4d4c36ff0e4e', credit: 'Picsea' },
  'addiction-recovery':  { id: '1470770841072-f978cf4d019e', credit: 'Dawid Zawiła' },
}

function imgUrl(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=600&h=200&fit=crop&crop=center&q=70&auto=format`
}

export default function CategoryTile({ category }: { category: Category }) {
  const isCrisis = category.slug === crisisSlug
  const img = categoryImages[category.slug]

  return (
    <Link
      href={`/category/${category.slug}`}
      className="block rounded-xl border overflow-hidden card-hover no-underline"
      style={{
        borderColor: isCrisis ? 'var(--crisis)' : 'var(--border)',
        backgroundColor: isCrisis ? '#FDF2F2' : '#fff',
      }}
    >
      {img && (
        <div className="relative h-28 overflow-hidden">
          <img
            src={imgUrl(img.id)}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              filter: isCrisis
                ? 'saturate(0.4) brightness(0.85)'
                : 'saturate(0.55) brightness(0.97)',
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: isCrisis
                ? 'linear-gradient(to bottom, rgba(192,57,43,0.12), rgba(192,57,43,0.04))'
                : 'linear-gradient(to bottom, rgba(74,124,126,0.15), rgba(250,250,248,0.08))',
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
