'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RegionConfig {
  slug: string
  name: string
  color: string
  counties: string
}

// SVG viewBox "0 0 300 480"
// Geographically approximate paths for each region
// Adjacent regions share boundary coordinates
const regionPaths: Record<string, string> = {
  'scotland':
    'M 80,5 L 228,5 L 260,48 L 250,118 L 220,168 L 192,178 L 158,177 L 122,182 L 100,171 L 78,157 L 70,117 Z',
  'northern-ireland':
    'M 8,140 L 72,130 L 88,150 L 75,182 L 22,182 L 8,162 Z',
  'north-east':
    'M 158,177 L 192,178 L 220,168 L 250,118 L 265,162 L 258,205 L 242,240 L 225,265 L 208,273 L 192,258 L 182,235 Z',
  'north-west':
    'M 122,182 L 158,177 L 182,235 L 165,257 L 150,270 L 130,270 L 108,260 L 95,235 L 95,205 L 108,187 Z',
  'yorkshire':
    'M 182,235 L 208,273 L 225,265 L 245,278 L 248,308 L 225,320 L 202,318 L 180,303 L 170,277 L 165,257 L 182,235 Z',
  'west-midlands':
    'M 95,235 L 108,260 L 130,270 L 150,270 L 165,257 L 170,277 L 170,312 L 160,337 L 140,347 L 115,340 L 95,326 L 90,300 L 90,260 Z',
  'east-midlands':
    'M 170,277 L 202,318 L 235,347 L 218,367 L 195,372 L 173,357 L 160,337 L 170,312 Z',
  'wales':
    'M 62,248 L 95,235 L 90,260 L 90,300 L 95,326 L 115,340 L 113,372 L 95,393 L 70,385 L 46,358 L 44,318 L 46,277 L 55,258 Z',
  'east-of-england':
    'M 202,318 L 248,308 L 262,340 L 272,390 L 250,418 L 220,423 L 196,407 L 182,382 L 173,357 L 195,372 L 218,367 L 235,347 Z',
  'london-home-counties':
    'M 115,340 L 140,347 L 160,337 L 173,357 L 182,382 L 196,407 L 182,428 L 155,447 L 125,447 L 98,430 L 82,408 L 75,388 L 70,385 L 95,393 L 113,372 Z',
}

// Approximate label positions (cx, cy) for each region
const labelPositions: Record<string, [number, number]> = {
  'scotland':           [165,  82],
  'northern-ireland':   [ 48, 158],
  'north-east':         [220, 218],
  'north-west':         [132, 228],
  'yorkshire':          [210, 288],
  'west-midlands':      [126, 300],
  'east-midlands':      [195, 330],
  'wales':              [ 75, 318],
  'east-of-england':    [228, 375],
  'london-home-counties':[138, 408],
}

export default function UKMap({ regions }: { regions: RegionConfig[] }) {
  const [hovered, setHovered] = useState<string | null>(null)

  const regionMap = Object.fromEntries(regions.map(r => [r.slug, r]))

  return (
    <div className="relative" style={{ width: 300 }}>
      <svg
        viewBox="0 0 300 480"
        width={300}
        height={480}
        aria-label="Map of UK regions. Select a region to browse local listings."
        role="img"
      >
        {regions.map(region => {
          const path = regionPaths[region.slug]
          if (!path) return null
          const isHovered = hovered === region.slug
          return (
            <Link key={region.slug} href={`/local/${region.slug}`}>
              <g
                onMouseEnter={() => setHovered(region.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <path
                  d={path}
                  fill={region.color}
                  fillOpacity={isHovered ? 1 : 0.82}
                  stroke="#FAFAF8"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{ transition: 'fill-opacity 150ms ease' }}
                />
                <title>{region.name} — {region.counties}</title>
              </g>
            </Link>
          )
        })}

        {/* Region labels */}
        {regions.map(region => {
          const pos = labelPositions[region.slug]
          if (!pos) return null
          const isLong = region.slug === 'london-home-counties' || region.slug === 'east-of-england'
          const lines = isLong ? region.name.split(',')[0].trim().split(' & ')[0] : region.name
          return (
            <text
              key={`label-${region.slug}`}
              x={pos[0]}
              y={pos[1]}
              textAnchor="middle"
              fill="white"
              fontSize={region.slug === 'northern-ireland' ? 6 : region.slug === 'london-home-counties' || region.slug === 'east-of-england' ? 7 : 8}
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {region.slug === 'london-home-counties' ? (
                <>
                  <tspan x={pos[0]} dy="0">London &</tspan>
                  <tspan x={pos[0]} dy="9">South East</tspan>
                </>
              ) : region.slug === 'east-of-england' ? (
                <>
                  <tspan x={pos[0]} dy="0">East of</tspan>
                  <tspan x={pos[0]} dy="9">England</tspan>
                </>
              ) : region.slug === 'yorkshire' ? (
                <>
                  <tspan x={pos[0]} dy="0">Yorkshire</tspan>
                  <tspan x={pos[0]} dy="9">& Humber</tspan>
                </>
              ) : region.slug === 'west-midlands' ? (
                <>
                  <tspan x={pos[0]} dy="0">West</tspan>
                  <tspan x={pos[0]} dy="9">Midlands</tspan>
                </>
              ) : region.slug === 'east-midlands' ? (
                <>
                  <tspan x={pos[0]} dy="0">East</tspan>
                  <tspan x={pos[0]} dy="9">Midlands</tspan>
                </>
              ) : region.slug === 'north-east' ? (
                <>
                  <tspan x={pos[0]} dy="0">North</tspan>
                  <tspan x={pos[0]} dy="9">East</tspan>
                </>
              ) : region.slug === 'north-west' ? (
                <>
                  <tspan x={pos[0]} dy="0">North</tspan>
                  <tspan x={pos[0]} dy="9">West</tspan>
                </>
              ) : region.slug === 'northern-ireland' ? (
                <>
                  <tspan x={pos[0]} dy="0">N. Ireland</tspan>
                </>
              ) : (
                <tspan>{lines}</tspan>
              )}
            </text>
          )
        })}
      </svg>

      {/* Hover tooltip */}
      {hovered && regionMap[hovered] && (
        <div
          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm shadow-md pointer-events-none z-10 w-48"
          style={{ backgroundColor: '#fff', border: '1px solid var(--border)' }}
        >
          <p className="font-semibold" style={{ color: 'var(--text)' }}>
            {regionMap[hovered].name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {regionMap[hovered].counties}
          </p>
        </div>
      )}
    </div>
  )
}
