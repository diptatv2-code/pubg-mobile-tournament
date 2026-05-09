-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (linked to auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text unique not null,
  pubg_uid text,
  rank_tier text default 'Bronze',
  role text default 'player',
  avatar_url text,
  created_at timestamptz default now()
);

-- Tournaments
create table if not exists tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  organizer_id uuid references profiles(id) on delete cascade not null,
  bracket_type text not null default 'group_stage',
  max_teams int not null default 16,
  status text not null default 'registration_open',
  registration_deadline timestamptz not null,
  start_date timestamptz not null,
  map text default 'Erangel',
  perspective text default 'TPP',
  scoring_matrix jsonb default '{"placement":[10,6,5,4,3,2,1,1,0,0,0,0,0,0,0,0],"kill_points":1,"wwcd_bonus":0}',
  smash_rule_enabled bool default false,
  smash_rule_threshold int default 0,
  created_at timestamptz default now()
);

-- Teams
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid references tournaments(id) on delete cascade not null,
  captain_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  logo_url text,
  status text default 'registered',
  seed_rank int,
  created_at timestamptz default now(),
  unique(tournament_id, name)
);

-- Roster
create table if not exists roster (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade not null,
  player_id uuid references profiles(id) on delete cascade not null,
  is_substitute bool default false,
  status text default 'active',
  joined_at timestamptz default now(),
  unique(team_id, player_id)
);

-- Matches
create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid references tournaments(id) on delete cascade not null,
  round int not null default 1,
  match_number int not null default 1,
  status text default 'scheduled',
  map text default 'Erangel',
  perspective text default 'TPP',
  room_code_encrypted text,
  checkin_opens_at timestamptz,
  checkin_closes_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz default now()
);

-- Match Results
create table if not exists match_results (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade not null,
  team_id uuid references teams(id) on delete cascade not null,
  placement int,
  kills int default 0,
  survival_time int default 0,
  is_wwcd bool default false,
  total_points int default 0,
  created_at timestamptz default now(),
  unique(match_id, team_id)
);

-- Room Distributions
create table if not exists room_distributions (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade not null,
  team_id uuid references teams(id) on delete cascade not null,
  delivered_at timestamptz default now(),
  unique(match_id, team_id)
);

-- Indexes
create index if not exists idx_tournaments_status on tournaments(status);
create index if not exists idx_tournaments_organizer on tournaments(organizer_id);
create index if not exists idx_teams_tournament on teams(tournament_id);
create index if not exists idx_teams_captain on teams(captain_id);
create index if not exists idx_roster_team on roster(team_id);
create index if not exists idx_roster_player on roster(player_id);
create index if not exists idx_matches_tournament on matches(tournament_id);
create index if not exists idx_match_results_match on match_results(match_id);

-- RLS
alter table profiles enable row level security;
alter table tournaments enable row level security;
alter table teams enable row level security;
alter table roster enable row level security;
alter table matches enable row level security;
alter table match_results enable row level security;
alter table room_distributions enable row level security;

-- RLS Policies
create policy "profiles_read_all" on profiles for select using (true);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);

create policy "tournaments_read_all" on tournaments for select using (true);
create policy "tournaments_insert_auth" on tournaments for insert with check (auth.uid() = organizer_id);
create policy "tournaments_update_own" on tournaments for update using (auth.uid() = organizer_id);

create policy "teams_read_all" on teams for select using (true);
create policy "teams_insert_auth" on teams for insert with check (auth.uid() = captain_id);
create policy "teams_update_own" on teams for update using (auth.uid() = captain_id);
create policy "teams_delete_own" on teams for delete using (auth.uid() = captain_id);

create policy "roster_read_all" on roster for select using (true);
create policy "roster_insert_captain" on roster for insert with check (true);
create policy "roster_update_own" on roster for update using (auth.uid() = player_id);

create policy "matches_read_all" on matches for select using (true);
create policy "matches_update_organizer" on matches for update using (
  auth.uid() = (select organizer_id from tournaments where id = tournament_id)
);

create policy "match_results_read_all" on match_results for select using (true);
create policy "match_results_insert_organizer" on match_results for insert with check (true);
create policy "match_results_update_organizer" on match_results for update using (true);

create policy "room_dist_read_own" on room_distributions for select using (
  auth.uid() = (select captain_id from teams where id = team_id)
);
create policy "room_dist_insert" on room_distributions for insert with check (true);
