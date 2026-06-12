import Link from 'next/link'
import type { Category } from '@/lib/types'

const crisisSlug = 'crisis-support'

const categoryImages: Record<string, string> = {
  'benefits-money':      'https://source.unsplash.com/featured/600x200/?documents,help',
  'diagnosis-assessment':'https://source.unsplash.com/featured/600x200/?doctor,consultation',
  'mental-health':       'https://source.unsplash.com/featured/600x200/?calm,peaceful,person',
  'community-social':    'https://source.unsplash.com/featured/600x200/?people,together,warm',
  'workplace-rights':    'https://source.unsplash.com/featured/600x200/?office,desk,natural+light',
  'physical-wellbeing':  'https://source.unsplash.com/featured/600x200/?walking,nature',
  'tools-resources':     'https://source.unsplash.com/featured/600x200/?laptop,notebook,organised',
  'crisis-support':      'https://source.unsplash.com/featured/600x200/?calm,water,sunset',
  'parents-carers':      'https://source.unsplash.com/featured/600x200/?parent,child,hands',
}

export default function CategoryTile({ category }: { category: Category }) {
  const isCrisis = category.slug === crisisSlug
  const imgUrl = categoryImages[category.slug]

  return (
    <Link
      href={`/category/${category.slug}`}
      className="block rounded-xl border overflow-hidden card-hover no-underline"
      style={{
        borderColor: isCrisis ? 'var(--crisis)' : 'var(--border)',
        backgroundColor: isCrisis ? '#FDF2F2' : '#fff',
      }}
    >
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
