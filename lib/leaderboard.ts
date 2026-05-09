import { redis, LeaderboardEntry } from './redis'
import { createAdminClient } from './supabase/admin'

const LEADERBOARD_KEY = (tournamentId: string) => `leaderboard:${tournamentId}`

export async function incrementTeamScore(tournamentId: string, teamId: string, points: number): Promise<void> {
  if (!redis) return
  try { await redis.zincrby(LEADERBOARD_KEY(tournamentId), points, teamId) }
  catch (e) { console.warn('Redis ZINCRBY failed:', e) }
}

export async function getFullLeaderboard(tournamentId: string): Promise<LeaderboardEntry[]> {
  if (redis) {
    try {
      const results = await redis.zrange(LEADERBOARD_KEY(tournamentId), 0, -1, { rev: true, withScores: true })
      if (results.length > 0) {
        const entries: LeaderboardEntry[] = []
        for (let i = 0; i < results.length; i += 2) {
          entries.push({ teamId: results[i] as string, score: Number(results[i + 1]), rank: entries.length + 1 })
        }
        return entries
      }
    } catch (e) { console.warn('Redis fallback to DB:', e) }
  }
  const admin = createAdminClient()
  const { data } = await admin.from('match_results')
    .select('team_id, total_points, teams(name)')
    .order('total_points', { ascending: false })
  return (data ?? []).map((row: Record<string, unknown>, i: number) => ({
    teamId: row.team_id as string,
    teamName: (row.teams as Record<string, string>)?.name,
    score: (row.total_points as number) ?? 0,
    rank: i + 1,
  }))
}

export async function clearLeaderboard(tournamentId: string): Promise<void> {
  if (!redis) return
  try { await redis.del(LEADERBOARD_KEY(tournamentId)) } catch {}
}
