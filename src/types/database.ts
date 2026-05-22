export type UserRole = "player" | "organizer" | "admin";
export type GameMode = "solo" | "duo" | "squad";
export type TournamentFormat =
  | "battle_royale"
  | "single_elim"
  | "double_elim"
  | "round_robin";
export type TournamentStatus =
  | "draft"
  | "registration_open"
  | "registration_closed"
  | "ongoing"
  | "completed"
  | "cancelled";
export type TeamStatus =
  | "registered"
  | "checked_in"
  | "disqualified"
  | "waitlisted";
export type MatchStatus = "scheduled" | "ongoing" | "completed";
export type TeamMemberRole = "captain" | "member";

export interface User {
  id: string;
  email: string;
  username: string;
  pubg_id: string;
  pubg_name: string;
  avatar_url: string;
  bio?: string;
  country?: string;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  username: string;
  pubg_id: string;
  pubg_name: string;
  avatar_url?: string;
  bio?: string;
  country?: string;
  role: UserRole;
  created_at?: string;
}

export interface PlayerStats {
  user_id: string;
  tournaments_played: number;
  tournaments_won: number;
  total_kills: number;
  total_matches: number;
  win_rate: number;
  avg_placement: number;
  total_winnings: number;
  rank_points: number;
}

export interface Tournament {
  id: string;
  title: string;
  slug: string;
  organizer_id: string;
  game_mode: GameMode;
  format: TournamentFormat;
  map: string;
  status: TournamentStatus;
  max_teams: number;
  registered_teams: number;
  entry_fee: number;
  prize_pool: number;
  prize_distribution: { position: number; amount: number; percent: number }[];
  scoring_config: ScoringConfig;
  registration_opens_at: string;
  registration_closes_at: string;
  starts_at: string;
  ends_at: string;
  description: string;
  rules: string;
  banner_url: string;
  total_matches: number;
  created_at: string;
}

export interface ScoringConfig {
  kill_points: number;
  placement_points: { placement: number; points: number }[];
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: TeamMemberRole;
  pubg_id: string;
  pubg_name: string;
  avatar_url: string;
}

export interface Team {
  id: string;
  tournament_id: string;
  name: string;
  tag: string;
  captain_id: string;
  status: TeamStatus;
  logo_url: string;
  members: TeamMember[];
  created_at: string;
}

export interface Match {
  id: string;
  tournament_id: string;
  match_number: number;
  round: number;
  status: MatchStatus;
  started_at: string | null;
  completed_at: string | null;
  map: string;
}

export interface MatchResult {
  id: string;
  match_id: string;
  team_id: string;
  placement: number;
  kills: number;
  kill_points: number;
  placement_points: number;
  total_points: number;
  wwcd: boolean;
}

export interface TournamentAnnouncement {
  id: string;
  tournament_id: string;
  organizer_id: string;
  title: string;
  message: string;
  created_at: string;
}

export interface RoomCode {
  id: string;
  tournament_id: string;
  match_id: string;
  room_code: string;
  room_password: string;
  distributed_at: string | null;
}

export interface LeaderboardEntry {
  team: Team;
  per_match: { match_number: number; placement: number; kills: number; points: number }[];
  total_kills: number;
  total_placement_points: number;
  total_kill_points: number;
  total_points: number;
  wwcd_count: number;
}

type DBTable<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Record<string, unknown>[];
};

export type Database = {
  public: {
    Tables: {
      users: DBTable<User>;
      profiles: DBTable<Profile>;
      tournaments: DBTable<Tournament>;
      teams: DBTable<Team>;
      team_members: DBTable<TeamMember>;
      matches: DBTable<Match>;
      match_results: DBTable<MatchResult>;
      tournament_announcements: DBTable<TournamentAnnouncement>;
      room_codes: DBTable<RoomCode>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
