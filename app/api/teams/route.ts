import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { tournament_id, name, logo_url } = await req.json()
  if (!tournament_id || !name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (name.length < 3 || name.length > 30) return NextResponse.json({ error: 'Team name must be 3-30 characters' }, { status: 400 })
  const admin = createAdminClient()
  // Check tournament exists and is open
  const { data: tournament } = await admin.from('tournaments').select('status, max_teams, registration_deadline').eq('id', tournament_id).single()
  if (!tournament) return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
  if (tournament.status !== 'registration_open') return NextResponse.json({ error: 'Registration is closed' }, { status: 400 })
  if (new Date() > new Date(tournament.registration_deadline)) return NextResponse.json({ error: 'Registration deadline passed' }, { status: 400 })
  // Check if user already has a team
  const { data: existingTeam } = await admin.from('teams').select('id').eq('tournament_id', tournament_id).eq('captain_id', user.id).single()
  if (existingTeam) return NextResponse.json({ error: 'You already have a team in this tournament' }, { status: 400 })
  // Check team count
  const { count } = await admin.from('teams').select('id', { count: 'exact' }).eq('tournament_id', tournament_id).eq('status', 'registered')
  if ((count || 0) >= tournament.max_teams) return NextResponse.json({ error: 'Tournament is full' }, { status: 400 })
  const { data: team, error } = await admin.from('teams').insert({
    tournament_id, name, logo_url: logo_url || null,
    captain_id: user.id, status: 'registered',
  }).select().single()
  if (error) {
    if (error.message.includes('unique')) return NextResponse.json({ error: 'Team name already taken in this tournament' }, { status: 400 })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  // Auto-add captain to roster
  await admin.from('roster').insert({ team_id: team.id, player_id: user.id, is_substitute: false, status: 'active' })
  return NextResponse.json({ team }, { status: 201 })
}
