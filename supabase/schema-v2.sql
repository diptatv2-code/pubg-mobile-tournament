-- ============================================================
-- PUBG Tournament Platform — Schema v2 Migration
-- Phase 1: Database & Real-Time Infrastructure
-- Apply this in Supabase SQL Editor at api.diptait.com.bd
-- ============================================================

-- 1A. UPGRADE EXISTING TABLES

-- Tournaments upgrades
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS licensing_tier TEXT DEFAULT 'community' CHECK (licensing_tier IN ('community', 'high_tier'));
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS esports_hub_id TEXT;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS pre_launch_gate BOOLEAN DEFAULT FALSE;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS smash_rule_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS smash_rule_threshold INTEGER DEFAULT 0;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS scoring_matrix JSONB DEFAULT '{"placement":[10,6,5,4,3,2,1,1,0,0,0,0,0,0,0,0],"kill_points":1,"wwcd_bonus":0}';

-- Profiles upgrades
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS game_uid TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS rank_tier TEXT DEFAULT 'Bronze';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medal_score INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(12,2) DEFAULT 0.00;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medal_gem TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medal_chassis TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medal_light_effect TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medal_halo TEXT;

-- Matches upgrades
ALTER TABLE matches ADD COLUMN IF NOT EXISTS map_selection TEXT DEFAULT 'Erangel';
ALTER TABLE matches ADD COLUMN IF NOT EXISTS perspective TEXT DEFAULT 'TPP';
ALTER TABLE matches ADD COLUMN IF NOT EXISTS room_code_encrypted TEXT;
ALTER TABLE matches ADD COLUMN IF NOT EXISTS host_uid TEXT;
ALTER TABLE matches ADD COLUMN IF NOT EXISTS checkin_opens_at TIMESTAMPTZ;
ALTER TABLE matches ADD COLUMN IF NOT EXISTS checkin_closes_at TIMESTAMPTZ;

-- Teams upgrades
ALTER TABLE teams ADD COLUMN IF NOT EXISTS seed_rank INTEGER;

-- 1B. NEW TABLES

CREATE TABLE IF NOT EXISTS roster (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_substitute BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  roster_lock_date TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, player_id)
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  tournament_id UUID REFERENCES tournaments(id) ON DELETE SET NULL,
  reference TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS room_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  delivered_at TIMESTAMPTZ DEFAULT NOW(),
  channel_id TEXT NOT NULL,
  UNIQUE(match_id, team_id)
);

CREATE TABLE IF NOT EXISTS dispute_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence_urls TEXT[],
  metadata JSONB,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsor_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  category TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  status TEXT DEFAULT 'pending',
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS licensing_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  region TEXT NOT NULL,
  prize_pool_usd DECIMAL(12,2) DEFAULT 0,
  status TEXT DEFAULT 'draft',
  event_schedule JSONB,
  expected_teams INTEGER,
  broadcast_info TEXT,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  esports_hub_export JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS power_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE SET NULL,
  pmgc_points INTEGER DEFAULT 0,
  season TEXT NOT NULL,
  source TEXT DEFAULT 'platform',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1C. INDEXES

CREATE INDEX IF NOT EXISTS idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_teams_tournament_id ON teams(tournament_id);
CREATE INDEX IF NOT EXISTS idx_roster_team_id ON roster(team_id);
CREATE INDEX IF NOT EXISTS idx_roster_player_id ON roster(player_id);
CREATE INDEX IF NOT EXISTS idx_wallet_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_dispute_reporter ON dispute_tickets(reporter_id);
CREATE INDEX IF NOT EXISTS idx_dispute_tournament ON dispute_tickets(tournament_id);
CREATE INDEX IF NOT EXISTS idx_power_rankings_team ON power_rankings(team_id);
CREATE INDEX IF NOT EXISTS idx_power_rankings_season ON power_rankings(season);

-- 1D. ROW LEVEL SECURITY

ALTER TABLE roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE licensing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE power_rankings ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "roster_read_all" ON roster FOR SELECT USING (true);
CREATE POLICY "wallet_own_read" ON wallet_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "room_dist_read" ON room_distributions FOR SELECT USING (true);
CREATE POLICY "disputes_own_read" ON dispute_tickets FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "sponsors_read_all" ON sponsor_listings FOR SELECT USING (true);
CREATE POLICY "licensing_read_all" ON licensing_applications FOR SELECT USING (true);
CREATE POLICY "power_rankings_read_all" ON power_rankings FOR SELECT USING (true);

-- ============================================================
-- END OF MIGRATION
-- After applying: confirm with SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
-- ============================================================
