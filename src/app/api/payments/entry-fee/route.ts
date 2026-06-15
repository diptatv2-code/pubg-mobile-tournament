import { supabaseAdmin } from "@/lib/supabase"
import { withAuth } from "@/lib/auth-guard"
import { NextResponse } from 'next/server'

export const POST = withAuth(async (req, ctx, userId) => {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { tournamentId, amount } = body
  if (!tournamentId || !amount) return NextResponse.json({ error: 'tournamentId and amount required' }, { status: 400 })

  const { data: profile } = await supabaseAdmin.from('profiles').select('wallet_balance').eq('id', userId).single()
  if (!profile || profile.wallet_balance < amount) {
    return NextResponse.json({ error: 'Insufficient balance', code: 'INSUFFICIENT_FUNDS' }, { status: 400 })
  }

  // Deduct balance
  await supabaseAdmin.from('profiles').update({ wallet_balance: profile.wallet_balance - amount }).eq('id', userId)

  const { data: txn } = await supabaseAdmin.from('wallet_transactions').insert({
    user_id: userId, type: 'entry_fee', amount: -amount, status: 'completed', tournament_id: tournamentId
  }).select().single()

  return NextResponse.json({ success: true, newBalance: profile.wallet_balance - amount, transactionId: txn?.id })
})
