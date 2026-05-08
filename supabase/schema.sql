create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  pubg_id text,
  pubg_name text,
  avatar_url text,
  role text default 'player' check (role in ('player','organizer','admin')),
  total_tournaments int default 0,
  total_wins int default 0,
  total_kills int default 0,
  created_at timestamptz default now()
);

create table if not exists public.tournaments (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  organizer_id uuid references public.profiles(id) on delete cascade,
  game_mode text not null check (game_mode in ('solo','duo','squad')),
  format text not null check (format in ('battle_royale','single_elim','double_elim','round_robin')),
  map text default 'Erangel',
  status text default 'draft' check (status in ('draft','registration_open','registration_closed','ongoing','completed','cancelled')),
  max_teams int default 16,
  entry_fee int default 0,
  prize_pool int default 0,
  prize_distribution jsonb default '{"1st":60,"2nd":30,"3rd":10}'::jsonb,
  scoring_config jsonb default '{"placement":[10,6,5,4,3,2,1,1,1,1],"kill_point":1}'::jsonb,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  starts_at timestamptz,
  ends_at timestamptz,
  description text,
  rules text,
  banner_url text,
  created_at timestamptz default now()
);

create table if not exists public.teams (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade,
  name text not null,
  captain_id uuid references public.profiles(id),
  status text default 'registered' check (status in ('registered','checked_in','disqualified','waitlisted')),
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade,
  user_id uuid references public.profiles(id),
  role text default 'member' check (role in ('captain','member')),
  pubg_id text,
  pubg_name text,
  created_at timestamptz default now()
);

create table if not exists public.matches (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade,
  match_number int not null,
  round int default 1,
  status text default 'scheduled' check (status in ('scheduled','ongoing','completed')),
  map text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.match_results (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references public.matches(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  placement int,
  kill_points int default 0,
  placement_points int default 0,
  total_points int default 0,
  wwcd boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.tournament_announcements (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade,
  organizer_id uuid references public.profiles(id),
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.room_codes (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade,
  match_id uuid references public.matches(id),
  room_code text not null,
  room_password text,
  distributed_at timestamptz,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.tournaments enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.matches enable row level security;
alter table public.match_results enable row level security;
alter table public.tournament_announcements enable row level security;
alter table public.room_codes enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where policyname='Public read tournaments') then
    create policy "Public read tournaments" on public.tournaments for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read teams') then
    create policy "Public read teams" on public.teams for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read team_members') then
    create policy "Public read team_members" on public.team_members for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read matches') then
    create policy "Public read matches" on public.matches for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read match_results') then
    create policy "Public read match_results" on public.match_results for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read announcements') then
    create policy "Public read announcements" on public.tournament_announcements for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Public read profiles') then
    create policy "Public read profiles" on public.profiles for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='Auth insert tournaments') then
    create policy "Auth insert tournaments" on public.tournaments for insert with check (auth.uid() = organizer_id);
  end if;
  if not exists (select 1 from pg_policies where policyname='Auth manage own profile') then
    create policy "Auth manage own profile" on public.profiles for all using (auth.uid() = id);
  end if;
end $$;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, pubg_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'pubg_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
