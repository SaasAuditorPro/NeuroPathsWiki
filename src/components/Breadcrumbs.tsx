import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex items-center gap-2 flex-wrap" style={{ color: 'var(--muted)' }}>
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline">{crumb.label}</Link>
            ) : (
              <span style={{ color: 'var(--text)' }} aria-current="page">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
