import { NextRequest, NextResponse } from 'next/server'
import { createBracket } from '@/lib/bracket'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  return NextResponse.json({ tournamentId: id, message: 'Bracket endpoint ready' })
}
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await req.json()
  const { type = 'group_knockout', teams = [], config = {} } = body
  const bracket = createBracket(id, type, teams, config)
  return NextResponse.json({ bracket })
}
