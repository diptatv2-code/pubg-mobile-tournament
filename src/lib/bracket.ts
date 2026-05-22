import { generateGroups, Team } from './tournament-engine'
export type BracketMatch = { id: string; tournamentId: string; round: number; matchNumber: number; teams: string[]; status: string; map?: string; perspective?: string }
export type Bracket = { tournamentId: string; type: string; rounds: BracketMatch[][]; currentRound: number; completed: boolean }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createBracket(tournamentId: string, type: string, teams: Team[], _config: Record<string, unknown>): Bracket {
  const groups = generateGroups(teams, 16)
  const round1: BracketMatch[] = groups.map((g, i) => ({
    id: crypto.randomUUID(), tournamentId, round: 1, matchNumber: i + 1,
    teams: g.teams.map(t => t.id), status: 'scheduled'
  }))
  return { tournamentId, type, rounds: [round1], currentRound: 1, completed: false }
}

export function getBracketStatus(bracket: Bracket) {
  const all = bracket.rounds.flat()
  return { currentRound: bracket.currentRound, completedMatches: all.filter(m => m.status === 'results_verified').length, totalMatches: all.length, isComplete: bracket.completed }
}

export function resetRound(bracket: Bracket, round: number): Bracket {
  const rounds = bracket.rounds.map((r, i) => i === round - 1 ? r.map(m => ({ ...m, status: 'scheduled' })) : r)
  return { ...bracket, rounds }
}
