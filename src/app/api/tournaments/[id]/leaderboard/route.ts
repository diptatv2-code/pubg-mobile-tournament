import { NextRequest, NextResponse } from 'next/server'
import { getFullLeaderboard, getTopTeams } from '@/lib/leaderboard'
import { supabaseAdmin } from '@/lib/supabase'
const supabase = supabaseAdmin


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: tournamentId } = await context.params
  const { searchParams } = new URL(request.url)
  const top = searchParams.get('top')

  try {
    let leaderboard = top
      ? await getTopTeams(tournamentId, parseInt(top))
      : await getFullLeaderboard(tournamentId)

    if (leaderboard.length === 0) {
      const { data, error } = await supabase
        .from('match_results')
        .select('team_id, total_points, teams(team_name, logo_url)')
        .order('total_points', { ascending: false })

      if (error) throw error

      type LeaderboardRow = {
        team_id: string
        total_points: number | null
        teams: { team_name?: string; logo_url?: string } | { team_name?: string; logo_url?: string }[] | null
      }
      leaderboard = (data ?? []).map((row: LeaderboardRow, i: number) => {
        const team = Array.isArray(row.teams) ? row.teams[0] : row.teams
        return {
          teamId: row.team_id,
          teamName: team?.team_name,
          logoUrl: team?.logo_url,
          score: row.total_points ?? 0,
          rank: i + 1,
        }
      })
    }

    return NextResponse.json({ leaderboard })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
