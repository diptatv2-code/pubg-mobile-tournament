export interface Profile {
  id: string
  display_name: string
  pubg_uid: string | null
  rank_tier: string
  role: string
  avatar_url: string | null
  created_at: string
}

export interface Tournament {
  id: string
  name: string
  description: string | null
  organizer_id: string
  bracket_type: string
  max_teams: number
  status: string
  registration_deadline: string
  start_date: string
  map: string
  perspective: string
  scoring_matrix: { placement: number[]; kill_points: number; wwcd_bonus: number }
  smash_rule_enabled: boolean
  smash_rule_threshold: number
  created_at: string
}

export interface Team {
  id: string
  tournament_id: string
  captain_id: string
  name: string
  logo_url: string | null
  status: string
  seed_rank: number | null
  created_at: string
}

export interface Match {
  id: string
  tournament_id: string
  round: number
  match_number: number
  status: string
  map: string
  perspective: string
  room_code_encrypted: string | null
  checkin_opens_at: string | null
  checkin_closes_at: string | null
  scheduled_at: string | null
  created_at: string
}

export interface MatchResult {
  id: string
  match_id: string
  team_id: string
  placement: number | null
  kills: number
  survival_time: number
  is_wwcd: boolean
  total_points: number
  created_at: string
}

export type TournamentStatus = 'registration_open' | 'started' | 'completed' | 'cancelled'
export type MatchStatus = 'scheduled' | 'lobby_open' | 'in_progress' | 'completed'
export type RosterStatus = 'active' | 'invited' | 'declined'
