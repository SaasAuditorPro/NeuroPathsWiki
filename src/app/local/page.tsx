import Breadcrumbs from '@/components/Breadcrumbs'
import UKMap from '@/components/UKMap'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find local support — NeuroPaths',
  description: 'Browse AuDHD support services and resources by region across England, Wales, Scotland and Northern Ireland.',
}

export const regions = [
  {
    slug: 'scotland',
    name: 'Scotland',
    color: '#4A7C7E',
    counties: 'All of Scotland',
  },
  {
    slug: 'northern-ireland',
    name: 'Northern Ireland',
    color: '#5C7A6B',
    counties: 'All of Northern Ireland',
  },
  {
    slug: 'north-east',
    name: 'North East',
    color: '#3D5A80',
    counties: 'Northumberland, Tyne & Wear, County Durham, Teesside',
  },
  {
    slug: 'north-west',
    name: 'North West',
    color: '#6B7A8D',
    counties: 'Cumbria, Lancashire, Merseyside, Greater Manchester, Cheshire',
  },
  {
    slug: 'yorkshire',
    name: 'Yorkshire & Humber',
    color: '#7A6B5A',
    counties: 'North Yorkshire, West Yorkshire, South Yorkshire, East Riding, Lincolnshire',
  },
  {
    slug: 'west-midlands',
    name: 'West Midlands',
    color: '#5A7A5C',
    counties: 'Birmingham, Coventry, Shropshire, Staffordshire, Worcestershire, Herefordshire',
  },
  {
    slug: 'east-midlands',
    name: 'East Midlands',
    color: '#5A5E7A',
    counties: 'Derbyshire, Nottinghamshire, Leicestershire, Northamptonshire, Rutland',
  },
  {
    slug: 'wales',
    name: 'Wales',
    color: '#7A6068',
    counties: 'All of Wales',
  },
  {
    slug: 'east-of-england',
    name: 'East of England',
    color: '#6B5A7A',
    counties: 'Norfolk, Suffolk, Cambridgeshire, Bedfordshire, Lincolnshire, Oxfordshire, Buckinghamshire',
  },
  {
    slug: 'south-west',
    name: 'South West',
    color: '#7A5A48',
    counties: 'Devon, Cornwall, Somerset, Dorset, Wiltshire, Gloucestershire, Bristol',
  },
  {
    slug: 'london-home-counties',
    name: 'London, Home Counties & Hampshire',
    color: '#4A6B6B',
    counties: 'London, Kent, Surrey, Sussex, Essex, Hertfordshire, Berkshire, Hampshire, Oxfordshire, Buckinghamshire',
  },
]

export default function LocalPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs crumbs={[{ label: 'Find local support' }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
        Find local support
      </h1>
      <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>
        Select your region to find services and resources near you.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* SVG Map */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <UKMap regions={regions} />
        </div>

        {/* Region list */}
        <div className="flex-1 w-full">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--muted)' }}>
            All regions
          </h2>
          <ul className="flex flex-col gap-2">
            {regions.map(region => (
              <li key={region.slug}>
                <Link
                  href={`/local/${region.slug}`}
                  className="flex items-center gap-3 rounded-lg border px-4 py-3 card-hover no-underline"
                  style={{ borderColor: 'var(--border)', backgroundColor: '#fff' }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: region.color }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                      {region.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {region.counties}
                    </p>
                  </div>
                  <svg className="ml-auto flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--muted)' }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
