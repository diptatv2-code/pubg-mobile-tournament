export type ScoringMatrix = {
  placement: number[]
  kill_points: number
  wwcd_bonus: number
}

export const DEFAULT_SCORING_MATRIX: ScoringMatrix = {
  placement: [10, 6, 5, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  kill_points: 1,
  wwcd_bonus: 0,
}

export type TeamMatchResult = {
  teamId: string
  placement: number
  kills: number
  survivalTimeSeconds: number
  isWWCD: boolean
}

export type TeamTournamentStats = {
  teamId: string
  totalPoints: number
  wwcdCount: number
  totalKills: number
  avgSurvivalTime: number
  matchesPlayed: number
}

export function calculateMatchPoints(
  result: TeamMatchResult,
  matrix: ScoringMatrix
): number {
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

export function checkSmashRule(
  stats: TeamTournamentStats,
  threshold: number,
  enabled: boolean
): boolean {
  if (!enabled || threshold <= 0) return false
  return stats.totalPoints >= threshold
}

export function aggregateTournamentStats(
  allResults: TeamMatchResult[],
  matrix: ScoringMatrix
): Map<string, TeamTournamentStats> {
  const statsMap = new Map<string, TeamTournamentStats>()

  for (const result of allResults) {
    const existing = statsMap.get(result.teamId) ?? {
      teamId: result.teamId,
      totalPoints: 0,
      wwcdCount: 0,
      totalKills: 0,
      avgSurvivalTime: 0,
      matchesPlayed: 0,
    }

    const matchPoints = calculateMatchPoints(result, matrix)
    const newMatchesPlayed = existing.matchesPlayed + 1
    const newAvgSurvival =
      (existing.avgSurvivalTime * existing.matchesPlayed + result.survivalTimeSeconds) /
      newMatchesPlayed

    statsMap.set(result.teamId, {
      teamId: result.teamId,
      totalPoints: existing.totalPoints + matchPoints,
      wwcdCount: existing.wwcdCount + (result.isWWCD ? 1 : 0),
      totalKills: existing.totalKills + result.kills,
      avgSurvivalTime: newAvgSurvival,
      matchesPlayed: newMatchesPlayed,
    })
  }

  return statsMap
}
