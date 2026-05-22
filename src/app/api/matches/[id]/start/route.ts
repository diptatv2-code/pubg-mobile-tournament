import { NextRequest, NextResponse } from 'next/server'
import { encryptRoomCode } from '@/lib/room-codes'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  // Basic validation — ensure required fields present
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { roomId, password, hostUid, map, perspective } = body
  if (!roomId || !password || !hostUid) return NextResponse.json({ error: 'roomId, password, hostUid required' }, { status: 400 })
  const encrypted = encryptRoomCode(roomId, password)
  await supabase.from('matches').update({ room_code_encrypted: encrypted, host_uid: hostUid, map_selection: map || 'Erangel', perspective: perspective || 'TPP', status: 'in_progress' }).eq('id', id)
  return NextResponse.json({ success: true, message: 'Match started. Room code stored and ready to distribute.' })
}
