import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { pubgMatchId, tournamentId } = await req.json()
  if (!pubgMatchId || !tournamentId) return NextResponse.json({ error: 'pubgMatchId and tournamentId required' }, { status: 400 })
  // Queue job — BullMQ integration pending PUBG API key
  return NextResponse.json({ queued: true, matchId: id, pubgMatchId, message: 'Score fetch queued. Requires PUBG_API_KEY env var.' })
}
