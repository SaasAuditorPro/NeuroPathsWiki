import type { CostType } from '@/lib/types'

const labels: Record<CostType, string> = {
  free: 'Free',
  paid: 'Paid',
  mixed: 'Free & paid',
  means_tested: 'Means tested',
}

const styles: Record<CostType, React.CSSProperties> = {
  free: { backgroundColor: 'var(--free-bg)', color: 'var(--free-text)' },
  paid: { backgroundColor: 'var(--paid-bg)', color: 'var(--paid-text)' },
  mixed: { backgroundColor: '#E8F4FD', color: '#0C4A6E' },
  means_tested: { backgroundColor: '#F3E8FF', color: '#581C87' },
}

export default function CostBadge({ type }: { type: CostType }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
      style={styles[type]}
    >
      {labels[type]}
    </span>
  )
}
