import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { email, password, display_name, pubg_uid } = await req.json()
  if (!email || !password || !display_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (display_name.length < 3 || display_name.length > 30) {
    return NextResponse.json({ error: 'Display name must be 3-30 characters' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }
  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.admin.createUser({
    email, password,
    user_metadata: { display_name },
    email_confirm: true,
  })
  if (error) {
    if (error.message.includes('already')) return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  await supabase.from('profiles').insert({
    id: data.user.id,
    display_name,
    pubg_uid: pubg_uid || null,
    role: 'player',
    rank_tier: 'Bronze',
  })
  return NextResponse.json({ success: true, userId: data.user.id }, { status: 201 })
}
