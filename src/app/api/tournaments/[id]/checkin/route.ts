import { NextRequest, NextResponse } from 'next/server'
import { createCheckinWindow, checkinTeam } from '@/lib/checkin'

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await req.json()
  const { teamId, matchStartsAt } = body
  if (!teamId) return NextResponse.json({ error: 'teamId required' }, { status: 400 })
  const state = createCheckinWindow(id, matchStartsAt || new Date(Date.now() + 3600000).toISOString())
  const result = checkinTeam(state, teamId)
  return NextResponse.json(result)
}
