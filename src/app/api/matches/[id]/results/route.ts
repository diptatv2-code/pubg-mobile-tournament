import { NextRequest, NextResponse } from 'next/server'
import { incrementTeamScore } from '@/lib/leaderboard'
import { supabaseAdmin } from '@/lib/supabase'
import { calculateMatchPoints, DEFAULT_SCORING_MATRIX } from '@/lib/scoring'

const supabase = supabaseAdmin

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: matchId } = await context.params

  try {
    const body = await request.json()
    const { results, tournamentId } = body as {
      results: Array<{
        teamId: string
        placement: number
        kills: number
        survivalTimeSeconds: number
        isWWCD: boolean
      }>
      tournamentId: string
    }

    if (!results || !tournamentId) {
      return NextResponse.json({ error: 'Missing results or tournamentId' }, { status: 400 })
    }

    const { data: tournament } = await supabase
      .from('tournaments')
      .select('scoring_matrix')
      .eq('id', tournamentId)
      .single()

    const matrix = tournament?.scoring_matrix ?? DEFAULT_SCORING_MATRIX

    for (const result of results) {
      const points = calculateMatchPoints(result, matrix)

      await supabaseAdmin.from('match_results').upsert({
        match_id: matchId,
        team_id: result.teamId,
        placement: result.placement,
        eliminations: result.kills,
        survival_time: result.survivalTimeSeconds,
        total_points: points,
      })

      await incrementTeamScore(tournamentId, result.teamId, points)
    }

    await supabase
      .from('matches')
      .update({ status: 'completed' })
      .eq('id', matchId)

    return NextResponse.json({ success: true, message: `Results saved for ${results.length} teams` })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
