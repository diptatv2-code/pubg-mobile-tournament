import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
  // Basic validation — ensure required fields present
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { tournamentId, distribution } = body as { tournamentId: string; distribution: { teamId: string; placement: number; amount: number }[] }
  if (!tournamentId) return NextResponse.json({ error: 'tournamentId required' }, { status: 400 })
  let totalAmount = 0
  for (const d of distribution) {
    const { data: team } = await supabase.from('teams').select('captain_id').eq('id', d.teamId).single()
    if (!team?.captain_id) continue
    await supabase.from('wallet_transactions').insert({ user_id: team.captain_id, type: 'prize', amount: d.amount, status: 'completed', tournament_id: tournamentId })
    totalAmount += d.amount
  }
  return NextResponse.json({ distributed: true, count: distribution.length, totalAmount })
}
