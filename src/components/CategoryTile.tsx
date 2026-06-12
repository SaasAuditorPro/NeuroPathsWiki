import Link from 'next/link'
import type { Category } from '@/lib/types'

const crisisSlug = 'crisis'

export default function CategoryTile({ category }: { category: Category }) {
  const isCrisis = category.slug === crisisSlug

  return (
    <Link
      href={`/category/${category.slug}`}
      className="block rounded-xl border p-6 card-hover no-underline"
      style={{
        borderColor: isCrisis ? 'var(--crisis)' : 'var(--border)',
        backgroundColor: isCrisis ? '#FDF2F2' : '#fff',
      }}
    >
      <h3
        className="font-semibold text-base mb-1"
        style={{ color: isCrisis ? 'var(--crisis)' : 'var(--text)' }}
      >
        {category.name}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {category.description}
      </p>
    </Link>
  )
}
