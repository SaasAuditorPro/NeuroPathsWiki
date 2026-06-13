import Link from 'next/link'
import type { Category } from '@/lib/types'

interface CategoryConfig {
  color: string
  icon: React.ReactNode
}

const categoryConfig: Record<string, CategoryConfig> = {
  'benefits-money': {
    color: '#4A7C7E',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Wallet */}
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M16 14h2" />
      </svg>
    ),
  },
  'diagnosis-assessment': {
    color: '#3D5A80',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Clipboard with checkmark */}
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 3v2h6V3" />
        <path d="M8 13l3 3 5-6" />
      </svg>
    ),
  },
  'mental-health': {
    color: '#5C7A6B',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Head outline */}
        <circle cx="12" cy="9" r="5" />
        {/* Shoulders */}
        <path d="M5 21c0-3.5 3-5 7-5s7 1.5 7 5" />
        {/* Heart inside head - small */}
        <path d="M10.5 8.2c0-.8.6-1.4 1.1-.8l.4.4.4-.4c.5-.6 1.1 0 1.1.8l-1.5 1.8z" strokeWidth="1" />
      </svg>
    ),
  },
  'community-social': {
    color: '#6B7A8D',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Three people */}
        <circle cx="12" cy="6" r="3" />
        <path d="M6 21c0-2.5 2.5-4 6-4s6 1.5 6 4" />
        <circle cx="4" cy="9" r="2" />
        <path d="M1 21c0-2 1.5-3 4-3" />
        <circle cx="20" cy="9" r="2" />
        <path d="M23 21c0-2-1.5-3-4-3" />
      </svg>
    ),
  },
  'workplace-rights': {
    color: '#7A6B5A',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Briefcase */}
        <rect x="2" y="8" width="20" height="13" rx="2" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M2 13h20" />
      </svg>
    ),
  },
  'physical-wellbeing': {
    color: '#5A7A5C',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Walking person */}
        <circle cx="13" cy="4" r="2" />
        <path d="M10 21l2-5-2-4 3-4" />
        <path d="M15 12l1 4 2 3" />
        <path d="M8 13l2-1 3 1" />
      </svg>
    ),
  },
  'tools-resources': {
    color: '#5A5E7A',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Wrench */}
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  'crisis-support': {
    color: '#C0392B',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Life ring */}
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M4.93 4.93l4.24 4.24" />
        <path d="M14.83 14.83l4.24 4.24" />
        <path d="M14.83 9.17l4.24-4.24" />
        <path d="M4.93 19.07l4.24-4.24" />
      </svg>
    ),
  },
  'parents-carers': {
    color: '#7A6068',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Two adults, one child */}
        <circle cx="5" cy="6" r="2.5" />
        <path d="M2 21c0-2.5 1.5-4 4-4" />
        <circle cx="19" cy="6" r="2.5" />
        <path d="M22 21c0-2.5-1.5-4-4-4" />
        {/* Child - smaller, centred */}
        <circle cx="12" cy="8" r="2" />
        <path d="M8.5 21c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5" />
      </svg>
    ),
  },
  'addiction-recovery': {
    color: '#6B5A7A',
    icon: (
      <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Two hands holding / cupped upward */}
        <path d="M4 14c0 0 0-2 2-2h2l1-4c.3-.8 1.2-1 1.7-.4L12 10l1.3-2.4c.5-.6 1.4-.4 1.7.4l1 4h2c2 0 2 2 2 2l-2 4H6l-2-4z" />
      </svg>
    ),
  },
}

const fallbackColor = '#4A7C7E'

export default function CategoryTile({ category }: { category: Category }) {
  const config = categoryConfig[category.slug]
  const bannerColor = config?.color ?? fallbackColor

  return (
    <Link
      href={`/category/${category.slug}`}
      className="block rounded-xl border overflow-hidden card-hover no-underline"
      style={{
        borderColor: bannerColor === '#C0392B' ? '#C0392B' : 'var(--border)',
        backgroundColor: '#fff',
      }}
    >
      {/* Coloured banner with SVG icon */}
      <div
        className="h-24 flex items-center justify-center"
        style={{ backgroundColor: bannerColor }}
        aria-hidden="true"
      >
        {config?.icon}
      </div>

      <div className="p-5">
        <h3
          className="font-semibold text-base mb-1"
          style={{ color: bannerColor === '#C0392B' ? 'var(--crisis)' : 'var(--text)' }}
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
