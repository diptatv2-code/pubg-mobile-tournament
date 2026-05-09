import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })
  const [profile, txns] = await Promise.all([
    supabase.from('profiles').select('wallet_balance').eq('id', userId).single(),
    supabase.from('wallet_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20)
  ])
  return NextResponse.json({ balance: profile.data?.wallet_balance ?? 0, transactions: txns.data ?? [] })
}
export async function POST(req: NextRequest) {
  const { userId, type, amount, tournamentId, reference } = await req.json()
  const delta = ['deposit', 'prize'].includes(type) ? amount : -amount
  const { data } = await supabase.from('wallet_transactions').insert({ user_id: userId, type, amount, status: 'completed', tournament_id: tournamentId ?? null, reference: reference ?? null }).select().single()
  return NextResponse.json({ success: true, transaction: data, delta })
}
