import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser } from "@/lib/auth-guard"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const teamId = req.nextUrl.searchParams.get('teamId')
  if (!teamId) return NextResponse.json({ error: 'teamId required' }, { status: 400 })
  const { data } = await supabaseAdmin.from('roster').select('*, profiles(username, game_uid, rank_tier, avatar_url)').eq('team_id', teamId)
  return NextResponse.json({ roster: data ?? [] })
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { teamId, playerId, isSubstitute = false } = body
  if (!teamId || !playerId) return NextResponse.json({ error: 'teamId and playerId required' }, { status: 400 })

  const { data: existing } = await supabaseAdmin.from('roster').select('id, is_substitute').eq('team_id', teamId)
  const active = existing?.filter((r: any) => !r.is_substitute).length ?? 0
  const subs = existing?.filter((r: any) => r.is_substitute).length ?? 0
  if (!isSubstitute && active >= 4) return NextResponse.json({ error: 'Max 4 active players' }, { status: 400 })
  if (isSubstitute && subs >= 2) return NextResponse.json({ error: 'Max 2 substitutes' }, { status: 400 })

  const { data, error } = await supabaseAdmin.from('roster').insert({
    team_id: teamId, player_id: playerId, is_substitute: isSubstitute
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, member: data })
}
