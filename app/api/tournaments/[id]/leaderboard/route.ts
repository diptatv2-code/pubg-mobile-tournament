import { NextRequest, NextResponse } from 'next/server'
import { getFullLeaderboard } from '@/lib/leaderboard'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = await context.params
  const admin = createAdminClient()
  const leaderboard = await getFullLeaderboard(tournamentId)
  // Enrich with team names if not already present
  if (leaderboard.length > 0 && !leaderboard[0].teamName) {
    const teamIds = leaderboard.map(e => e.teamId)
    const { data: teams } = await admin.from('teams').select('id, name').in('id', teamIds)
    const teamMap = Object.fromEntries((teams || []).map(t => [t.id, t.name]))
    return NextResponse.json({ leaderboard: leaderboard.map(e => ({ ...e, teamName: teamMap[e.teamId] || 'Unknown' })) })
  }
  return NextResponse.json({ leaderboard })
}
