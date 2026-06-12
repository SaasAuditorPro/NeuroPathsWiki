export type CostType = 'free' | 'paid' | 'mixed' | 'means_tested'
export type AccessType = 'national' | 'local' | 'online'

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  display_order: number
}

export interface Listing {
  id: string
  name: string
  slug: string
  tagline: string
  category_id: string
  category?: Category
  tags: string[]
  description: string
  audhd_context: string
  cost_type: CostType
  access_type: AccessType
  referral_required: boolean
  website_url: string | null
  apply_url: string | null
  is_verified: boolean
  is_featured: boolean
  is_active: boolean
}

export interface Region {
  id: string
  name: string
  slug: string
  is_national: boolean
}
