import { NextRequest, NextResponse } from 'next/server'
import { getFullLeaderboard, getTopTeams } from '@/lib/leaderboard'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

      leaderboard = (data ?? []).map((row: any, i: number) => ({
        teamId: row.team_id,
        teamName: row.teams?.team_name,
        logoUrl: row.teams?.logo_url,
        score: row.total_points ?? 0,
        rank: i + 1,
      }))
    }

    return NextResponse.json({ leaderboard })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
