import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit
  const admin = createAdminClient()
  let query = admin.from('tournaments')
    .select('*, profiles(display_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (status && status !== 'all') query = query.eq('status', status)
  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tournaments: data, total: count, page, limit })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { name, description, bracket_type, max_teams, registration_deadline, start_date, map, perspective, scoring_matrix, smash_rule_enabled, smash_rule_threshold } = body
  if (!name || !bracket_type || !max_teams || !registration_deadline || !start_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (name.length < 3 || name.length > 60) return NextResponse.json({ error: 'Name must be 3-60 characters' }, { status: 400 })
  if (new Date(registration_deadline) >= new Date(start_date)) {
    return NextResponse.json({ error: 'Start date must be after registration deadline' }, { status: 400 })
  }
  const admin = createAdminClient()
  const { data, error } = await admin.from('tournaments').insert({
    name, description: description || null,
    organizer_id: user.id,
    bracket_type, max_teams,
    registration_deadline, start_date,
    map: map || 'Erangel',
    perspective: perspective || 'TPP',
    scoring_matrix: scoring_matrix || { placement: [10,6,5,4,3,2,1,1,0,0,0,0,0,0,0,0], kill_points: 1, wwcd_bonus: 0 },
    smash_rule_enabled: smash_rule_enabled || false,
    smash_rule_threshold: smash_rule_threshold || 0,
    status: 'registration_open',
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tournament: data }, { status: 201 })
}
