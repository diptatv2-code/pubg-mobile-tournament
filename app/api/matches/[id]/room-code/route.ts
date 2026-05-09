import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { encryptRoomCode } from '@/lib/room-codes'

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: matchId } = await context.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const admin = createAdminClient()
  const { data: match } = await admin.from('matches').select('*, tournaments(organizer_id)').eq('id', matchId).single()
  if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  const tournament = (match as Record<string, unknown>).tournaments as Record<string, unknown>
  if (tournament?.organizer_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { roomId, password, tournamentId } = await req.json()
  if (!roomId || !password) return NextResponse.json({ error: 'Room ID and password required' }, { status: 400 })
  const encrypted = encryptRoomCode(roomId, password)
  await admin.from('matches').update({ room_code_encrypted: encrypted, status: 'lobby_open' }).eq('id', matchId)
  // Get all registered teams for this tournament
  const { data: teams } = await admin.from('teams').select('id').eq('tournament_id', tournamentId || match.tournament_id).eq('status', 'registered')
  if (teams) {
    for (const team of teams) {
      await admin.from('room_distributions').upsert({ match_id: matchId, team_id: team.id })
    }
  }
  return NextResponse.json({ success: true, teamsNotified: teams?.length || 0 })
}
