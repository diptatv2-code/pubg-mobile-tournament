import { redis, LeaderboardEntry } from './redis'

const LEADERBOARD_KEY = (tournamentId: string) => `leaderboard:${tournamentId}`

export async function incrementTeamScore(
  tournamentId: string,
  teamId: string,
  points: number
): Promise<void> {
  if (!redis) return
  await redis.zincrby(LEADERBOARD_KEY(tournamentId), points, teamId)
}

export async function setTeamScore(
  tournamentId: string,
  teamId: string,
  score: number
): Promise<void> {
  if (!redis) return
  await redis.zadd(LEADERBOARD_KEY(tournamentId), { score, member: teamId })
}

export async function getTeamRank(tournamentId: string, teamId: string): Promise<number> {
  if (!redis) return -1
  const rank = await redis.zrevrank(LEADERBOARD_KEY(tournamentId), teamId)
  return rank ?? -1
}

export async function getFullLeaderboard(tournamentId: string): Promise<LeaderboardEntry[]> {
  if (!redis) return []
  // Returns array of [member, score] tuples
  const results = await redis.zrange(LEADERBOARD_KEY(tournamentId), 0, -1, {
    rev: true,
    withScores: true,
  })
  const entries: LeaderboardEntry[] = []
  for (let i = 0; i < results.length; i += 2) {
    entries.push({
      teamId: results[i] as string,
      score: Number(results[i + 1]),
      rank: entries.length + 1,
    })
  }
  return entries
}

export async function getTopTeams(tournamentId: string, n: number): Promise<LeaderboardEntry[]> {
  if (!redis) return []
  const results = await redis.zrange(LEADERBOARD_KEY(tournamentId), 0, n - 1, {
    rev: true,
    withScores: true,
  })
  const entries: LeaderboardEntry[] = []
  for (let i = 0; i < results.length; i += 2) {
    entries.push({
      teamId: results[i] as string,
      score: Number(results[i + 1]),
      rank: entries.length + 1,
    })
  }
  return entries
}

export async function clearLeaderboard(tournamentId: string): Promise<void> {
  if (!redis) return
  await redis.del(LEADERBOARD_KEY(tournamentId))
}
