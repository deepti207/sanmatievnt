/*
# SANMATIX 2026 - Complete Database Schema

## Summary
Creates all tables needed for the SANMATIX 2026 technology festival website.

## Tables Created
1. `registrations` - Event registrations from participants
2. `team_members` - Faculty/student team members info
3. `gallery_items` - Photo gallery images
4. `leaderboard` - Competition winners/rankings
5. `announcements` - Live announcements
6. `sponsors` - Sponsor information
7. `volunteers` - Volunteer information

## Security
All tables use RLS with anon+authenticated policies (public event website, no login required).
*/

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  school_name text NOT NULL,
  class text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event text NOT NULL,
  team_members text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations" ON registrations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_registrations" ON registrations;
CREATE POLICY "anon_update_registrations" ON registrations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_registrations" ON registrations;
CREATE POLICY "anon_delete_registrations" ON registrations FOR DELETE TO anon, authenticated USING (true);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  bio text,
  photo_url text,
  category text NOT NULL DEFAULT 'faculty',
  social_linkedin text,
  social_instagram text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_team" ON team_members;
CREATE POLICY "anon_select_team" ON team_members FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_team" ON team_members;
CREATE POLICY "anon_insert_team" ON team_members FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_team" ON team_members;
CREATE POLICY "anon_update_team" ON team_members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_team" ON team_members;
CREATE POLICY "anon_delete_team" ON team_members FOR DELETE TO anon, authenticated USING (true);

-- Gallery items
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  category text DEFAULT 'general',
  year integer DEFAULT 2024,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gallery" ON gallery_items;
CREATE POLICY "anon_select_gallery" ON gallery_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_gallery" ON gallery_items;
CREATE POLICY "anon_insert_gallery" ON gallery_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_gallery" ON gallery_items;
CREATE POLICY "anon_update_gallery" ON gallery_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_gallery" ON gallery_items;
CREATE POLICY "anon_delete_gallery" ON gallery_items FOR DELETE TO anon, authenticated USING (true);

-- Leaderboard
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name text NOT NULL,
  school_name text NOT NULL,
  event text NOT NULL,
  rank integer NOT NULL,
  score integer DEFAULT 0,
  medal text DEFAULT 'none',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_leaderboard" ON leaderboard;
CREATE POLICY "anon_select_leaderboard" ON leaderboard FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_leaderboard" ON leaderboard;
CREATE POLICY "anon_insert_leaderboard" ON leaderboard FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_leaderboard" ON leaderboard;
CREATE POLICY "anon_update_leaderboard" ON leaderboard FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_leaderboard" ON leaderboard;
CREATE POLICY "anon_delete_leaderboard" ON leaderboard FOR DELETE TO anon, authenticated USING (true);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_announcements" ON announcements;
CREATE POLICY "anon_select_announcements" ON announcements FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_announcements" ON announcements;
CREATE POLICY "anon_insert_announcements" ON announcements FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_announcements" ON announcements;
CREATE POLICY "anon_update_announcements" ON announcements FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_announcements" ON announcements;
CREATE POLICY "anon_delete_announcements" ON announcements FOR DELETE TO anon, authenticated USING (true);

-- Sponsors
CREATE TABLE IF NOT EXISTS sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  tier text DEFAULT 'silver',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_sponsors" ON sponsors;
CREATE POLICY "anon_select_sponsors" ON sponsors FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_sponsors" ON sponsors;
CREATE POLICY "anon_insert_sponsors" ON sponsors FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_sponsors" ON sponsors;
CREATE POLICY "anon_update_sponsors" ON sponsors FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_sponsors" ON sponsors;
CREATE POLICY "anon_delete_sponsors" ON sponsors FOR DELETE TO anon, authenticated USING (true);

-- Volunteers
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text,
  phone text,
  email text,
  department text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_volunteers" ON volunteers;
CREATE POLICY "anon_select_volunteers" ON volunteers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_volunteers" ON volunteers;
CREATE POLICY "anon_insert_volunteers" ON volunteers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_volunteers" ON volunteers;
CREATE POLICY "anon_update_volunteers" ON volunteers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_volunteers" ON volunteers;
CREATE POLICY "anon_delete_volunteers" ON volunteers FOR DELETE TO anon, authenticated USING (true);
