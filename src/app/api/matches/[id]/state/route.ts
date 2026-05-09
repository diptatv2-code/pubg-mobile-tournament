import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const VALID_TRANSITIONS: Record<string, string[]> = {
  scheduled: ['lobby_open'], lobby_open: ['in_progress', 'scheduled'],
  in_progress: ['completed'], completed: ['results_verified']
}
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { status, map, perspective } = await req.json()
  const { data: match } = await supabase.from('matches').select('status').eq('id', id).single()
  if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  if (!VALID_TRANSITIONS[match.status]?.includes(status))
    return NextResponse.json({ error: `Invalid transition: ${match.status} → ${status}` }, { status: 400 })
  const updates: Record<string, unknown> = { status }
  if (map) updates.map_selection = map
  if (perspective) updates.perspective = perspective
  await supabase.from('matches').update(updates).eq('id', id)
  return NextResponse.json({ success: true, newStatus: status })
}
