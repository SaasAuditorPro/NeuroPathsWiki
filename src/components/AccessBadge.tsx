import type { AccessType } from '@/lib/types'

const labels: Record<AccessType, string> = {
  national: 'Available everywhere',
  local: 'Local area',
  online: 'Online',
}

export default function AccessBadge({ type }: { type: AccessType }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium border"
      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
    >
      {labels[type]}
    </span>
  )
}
