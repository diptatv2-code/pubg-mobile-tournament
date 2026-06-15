import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser } from "@/lib/auth-guard"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = user.id
  const [profile, txns] = await Promise.all([
    supabaseAdmin.from('profiles').select('wallet_balance').eq('id', userId).single(),
    supabaseAdmin.from('wallet_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20)
  ])
  return NextResponse.json({ balance: profile.data?.wallet_balance ?? 0, transactions: txns.data ?? [] })
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { type, amount, tournamentId, reference } = body
  if (!type || !amount) return NextResponse.json({ error: 'type and amount required' }, { status: 400 })

  const userId = user.id
  const { data } = await supabaseAdmin.from('wallet_transactions').insert({
    user_id: userId, type, amount, status: 'completed',
    tournament_id: tournamentId ?? null, reference: reference ?? null
  }).select().single()

  return NextResponse.json({ success: true, transaction: data })
}
