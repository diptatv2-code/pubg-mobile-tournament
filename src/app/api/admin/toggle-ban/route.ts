import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const userId = formData.get('userId') as string
  const ban = formData.get('ban') === 'true'
  await admin.from('profiles').update({ is_banned: ban }).eq('id', userId)
  return NextResponse.redirect(new URL('/admin/users', req.url))
}
