export type Team = { id: string; name: string; seedRank?: number }
export type Group = { id: string; teams: Team[] }
export type BracketType = 'group_knockout' | 'single_elim' | 'double_elim' | 'round_robin' | 'async_ffa'
export type MatchState = 'scheduled' | 'lobby_open' | 'in_progress' | 'completed' | 'results_verified'

export function generateGroups(teams: Team[], groupSize: number, seeded = false): Group[] {
  const sorted = seeded ? [...teams].sort((a, b) => (a.seedRank ?? 999) - (b.seedRank ?? 999)) : shuffle([...teams])
  const groups: Group[] = []
  for (let i = 0; i < sorted.length; i += groupSize) {
    groups.push({ id: crypto.randomUUID(), teams: sorted.slice(i, i + groupSize) })
  }
  return groups
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function resolveTiebreaker(teams: { teamId: string; totalPoints: number; wwcdCount: number; totalKills: number; avgSurvival: number }[]) {
  return [...teams].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints
    if (b.wwcdCount !== a.wwcdCount) return b.wwcdCount - a.wwcdCount
    if (b.totalKills !== a.totalKills) return b.totalKills - a.totalKills
    return b.avgSurvival - a.avgSurvival
  })
}

export function checkSmashRule(totalPoints: number, threshold: number, enabled: boolean): boolean {
  return enabled && threshold > 0 && totalPoints >= threshold
}

export function generateMatchSchedule(tournamentId: string, bracketType: BracketType, teams: Team[], config: { groupSize?: number; matchesPerGroup?: number } = {}) {
  const groupSize = config.groupSize ?? 16
  if (bracketType === 'group_knockout' || bracketType === 'async_ffa') {
    const groups = generateGroups(teams, groupSize)
    const schedule = groups.flatMap((g, gi) =>
      Array.from({ length: config.matchesPerGroup ?? 3 }, (_, mi) => ({
        round: gi + 1, matchNumber: mi + 1,
        teams: g.teams.map(t => t.id),
        matchId: crypto.randomUUID(), groupId: g.id
      }))
    )
    return { groups, schedule }
  }
  const schedule = teams.map((t, i) => ({
    round: 1, matchNumber: i + 1,
    teams: [t.id, teams[(i + 1) % teams.length]?.id ?? 'BYE'],
    matchId: crypto.randomUUID()
  }))
  return { schedule }
}
