import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const admin = createAdminClient()
  const { data: tournament, error } = await admin.from('tournaments')
    .select('*, profiles(display_name, avatar_url)')
    .eq('id', id).single()
  if (error || !tournament) return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
  const { data: teams } = await admin.from('teams')
    .select('*, profiles(display_name, avatar_url)')
    .eq('tournament_id', id).eq('status', 'registered')
  return NextResponse.json({ tournament, teams: teams || [] })
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const admin = createAdminClient()
  const { data: tournament } = await admin.from('tournaments').select('organizer_id, status').eq('id', id).single()
  if (!tournament) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (tournament.organizer_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json()
  const { data, error } = await admin.from('tournaments').update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tournament: data })
}
