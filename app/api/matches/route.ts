import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { tournament_id, round, match_number } = await req.json()
  if (!tournament_id || !round) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const admin = createAdminClient()
  const { data: tournament } = await admin.from('tournaments').select('organizer_id').eq('id', tournament_id).single()
  if (!tournament || tournament.organizer_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { data: match, error } = await admin.from('matches').insert({ tournament_id, round: round || 1, match_number: match_number || 1, status: 'scheduled', map: 'Erangel', perspective: 'TPP' }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ match }, { status: 201 })
}
