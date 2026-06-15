import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { withPmtAdmin } from '@/lib/pmt-admin'

const admin = supabaseAdmin

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
