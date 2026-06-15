import { supabaseAdmin } from "@/lib/supabase"
import { NextRequest, NextResponse } from 'next/server'
import { validateTournamentForLaunch } from '@/lib/compliance'

export async function POST(req: NextRequest) {
  const { tournamentId } = await req.json()
  const { data } = await supabaseAdmin.from('tournaments').select('prize_pool, licensing_tier, pre_launch_gate, esports_hub_id').eq('id', tournamentId).single()
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const result = validateTournamentForLaunch({ prizePool: data.prize_pool, licensingTier: data.licensing_tier, prelaunchGate: data.pre_launch_gate, esportsHubId: data.esports_hub_id })
  return NextResponse.json(result)
}
