import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { calculateMatchPoints, DEFAULT_SCORING_MATRIX } from '@/lib/scoring'
import { incrementTeamScore } from '@/lib/leaderboard'

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: matchId } = await context.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const admin = createAdminClient()
  const { data: match } = await admin.from('matches').select('*, tournaments(organizer_id, scoring_matrix)').eq('id', matchId).single()
  if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  const tournament = (match as Record<string, unknown>).tournaments as Record<string, unknown>
  if (tournament?.organizer_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (match.status === 'completed') return NextResponse.json({ error: 'Match already completed and locked' }, { status: 400 })
  const { results, tournamentId } = await req.json() as {
    results: Array<{ teamId: string; placement: number; kills: number; survivalTimeSeconds: number; isWWCD: boolean }>
    tournamentId: string
  }
  if (!results?.length) return NextResponse.json({ error: 'No results provided' }, { status: 400 })
  const placements = results.map(r => r.placement)
  if (new Set(placements).size !== placements.length) return NextResponse.json({ error: 'Duplicate placements found' }, { status: 400 })
  const matrix = (tournament?.scoring_matrix as typeof DEFAULT_SCORING_MATRIX) ?? DEFAULT_SCORING_MATRIX
  for (const result of results) {
    const points = calculateMatchPoints({ teamId: result.teamId, placement: result.placement, kills: result.kills, survivalTimeSeconds: result.survivalTimeSeconds, isWWCD: result.isWWCD }, matrix)
    await admin.from('match_results').upsert({
      match_id: matchId, team_id: result.teamId,
      placement: result.placement, kills: result.kills,
      survival_time: result.survivalTimeSeconds,
      is_wwcd: result.isWWCD, total_points: points,
    })
    await incrementTeamScore(tournamentId, result.teamId, points)
  }
  await admin.from('matches').update({ status: 'completed' }).eq('id', matchId)
  return NextResponse.json({ success: true, resultsCount: results.length })
}
