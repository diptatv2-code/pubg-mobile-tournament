import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withPmtAdmin } from '@/lib/pmt-admin'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const POST = withPmtAdmin(async (req, ctx, userId) => {
  const body = await req.json()
  const { userId: targetUserId, banned } = body as { userId: string; banned: boolean }

  if (!targetUserId || typeof banned !== 'boolean') {
    return NextResponse.json(
      { error: 'userId and banned (boolean) are required' },
      { status: 400 }
    )
  }

  const { error } = await admin
    .from('profiles')
    .update({ is_banned: banned })
    .eq('id', targetUserId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, userId: targetUserId, banned })
})
