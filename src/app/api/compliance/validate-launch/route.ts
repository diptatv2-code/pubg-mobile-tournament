import { NextRequest, NextResponse } from 'next/server'
import { validateTournamentForLaunch } from '@/lib/compliance'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
  const { tournamentId } = await req.json()
  const { data } = await supabase.from('tournaments').select('prize_pool, licensing_tier, pre_launch_gate, esports_hub_id').eq('id', tournamentId).single()
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const result = validateTournamentForLaunch({ prizePool: data.prize_pool, licensingTier: data.licensing_tier, prelaunchGate: data.pre_launch_gate, esportsHubId: data.esports_hub_id })
  return NextResponse.json(result)
}
