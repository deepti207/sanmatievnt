import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Registration = {
  id?: string
  full_name: string
  school_name: string
  class: string
  phone: string
  email: string
  event: string
  team_members?: string
  status?: string
  created_at?: string
}

export type TeamMember = {
  id?: string
  name: string
  position: string
  department: string
  bio?: string
  photo_url?: string
  category: string
  social_linkedin?: string
  social_instagram?: string
  display_order?: number
}

export type GalleryItem = {
  id?: string
  title: string
  image_url: string
  category?: string
  year?: number
}

export type LeaderboardEntry = {
  id?: string
  participant_name: string
  school_name: string
  event: string
  rank: number
  score: number
  medal: string
}

export type Announcement = {
  id?: string
  title: string
  message: string
  type: string
  is_active: boolean
  created_at?: string
}
