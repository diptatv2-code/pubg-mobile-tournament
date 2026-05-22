import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
  // Basic validation — ensure required fields present
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { userId, tournamentId, amount } = body
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })
  const { data: profile } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single()
  if (!profile || profile.wallet_balance < amount) return NextResponse.json({ error: 'Insufficient balance', code: 'INSUFFICIENT_FUNDS' }, { status: 400 })
  const { data: txn } = await supabase.from('wallet_transactions').insert({ user_id: userId, type: 'entry_fee', amount, status: 'completed', tournament_id: tournamentId }).select().single()
  return NextResponse.json({ success: true, newBalance: profile.wallet_balance - amount, transactionId: txn?.id })
}
