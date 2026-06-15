import { supabaseAdmin } from "@/lib/supabase"
import { withAuth } from "@/lib/auth-guard"
import { NextResponse } from 'next/server'
import { encryptRoomCode } from '@/lib/room-codes'

export const POST = withAuth(async (req, context, userId) => {
  const { id } = await (context as any).params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { roomId, password, hostUid, map, perspective } = body
  if (!roomId || !password || !hostUid) return NextResponse.json({ error: 'roomId, password, hostUid required' }, { status: 400 })
  const encrypted = encryptRoomCode(roomId, password)
  await supabaseAdmin.from('matches').update({
    room_code_encrypted: encrypted, host_uid: hostUid,
    map_selection: map || 'Erangel', perspective: perspective || 'TPP', status: 'in_progress'
  }).eq('id', id)
  return NextResponse.json({ success: true, message: 'Match started. Room code stored and ready to distribute.' })
})
