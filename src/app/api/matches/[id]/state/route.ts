import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser } from "@/lib/auth-guard"
import { NextRequest, NextResponse } from 'next/server'

const VALID_TRANSITIONS: Record<string, string[]> = {
  scheduled: ['lobby_open'], lobby_open: ['in_progress', 'scheduled'],
  in_progress: ['completed'], completed: ['results_verified']
}
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await context.params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { status, map, perspective } = body
  const { data: match } = await supabaseAdmin.from('matches').select('status').eq('id', id).single()
  if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  if (!VALID_TRANSITIONS[match.status]?.includes(status))
    return NextResponse.json({ error: `Invalid transition: ${match.status} → ${status}` }, { status: 400 })
  const updates: Record<string, unknown> = { status }
  if (map) updates.map_selection = map
  if (perspective) updates.perspective = perspective
  await supabaseAdmin.from('matches').update(updates).eq('id', id)
  return NextResponse.json({ success: true, newStatus: status })
}
