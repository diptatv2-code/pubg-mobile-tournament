import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function GET(req: NextRequest) {
  const teamId = req.nextUrl.searchParams.get('teamId')
  if (!teamId) return NextResponse.json({ error: 'teamId required' }, { status: 400 })
  const { data } = await supabase.from('roster').select('*, profiles(username, game_uid, rank_tier, avatar_url)').eq('team_id', teamId)
  return NextResponse.json({ roster: data ?? [] })
}
export async function POST(req: NextRequest) {
  // Basic validation — ensure required fields present
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { teamId, playerId, isSubstitute = false } = body
  if (!teamId || !playerId) return NextResponse.json({ error: 'teamId and playerId required' }, { status: 400 })
  const { data: existing } = await supabase.from('roster').select('id, is_substitute').eq('team_id', teamId)
  const active = existing?.filter(r => !r.is_substitute).length ?? 0
  const subs = existing?.filter(r => r.is_substitute).length ?? 0
  if (!isSubstitute && active >= 4) return NextResponse.json({ error: 'Max 4 active players' }, { status: 400 })
  if (isSubstitute && subs >= 2) return NextResponse.json({ error: 'Max 2 substitutes' }, { status: 400 })
  const { data, error } = await supabase.from('roster').insert({ team_id: teamId, player_id: playerId, is_substitute: isSubstitute }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, member: data })
}
