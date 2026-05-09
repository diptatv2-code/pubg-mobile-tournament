export interface ScoringMatrix {
  placement: number[]
  kill_points: number
  wwcd_bonus: number
}

export const DEFAULT_SCORING_MATRIX: ScoringMatrix = {
  placement: [10, 6, 5, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  kill_points: 1,
  wwcd_bonus: 0,
}

export interface TeamMatchResult {
  teamId: string
  placement: number
  kills: number
  survivalTimeSeconds: number
  isWWCD: boolean
}

export interface TeamTournamentStats {
  teamId: string
  totalPoints: number
  wwcdCount: number
  totalKills: number
  avgSurvivalTime: number
  matchesPlayed: number
}

export function calculateMatchPoints(result: TeamMatchResult, matrix: ScoringMatrix): number {
  const placementPoints = matrix.placement[result.placement - 1] ?? 0
  const killPoints = result.kills * matrix.kill_points
  const wwcdBonus = result.isWWCD ? matrix.wwcd_bonus : 0
  return placementPoints + killPoints + wwcdBonus
}

export function resolveTiebreaker(teams: TeamTournamentStats[]): TeamTournamentStats[] {
  return [...teams].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints
    if (b.wwcdCount !== a.wwcdCount) return b.wwcdCount - a.wwcdCount
    if (b.totalKills !== a.totalKills) return b.totalKills - a.totalKills
    return b.avgSurvivalTime - a.avgSurvivalTime
  })
}

export function checkSmashRule(stats: TeamTournamentStats, threshold: number, enabled: boolean): boolean {
  if (!enabled || threshold <= 0) return false
  return stats.totalPoints >= threshold
}
