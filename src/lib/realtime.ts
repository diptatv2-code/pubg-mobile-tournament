import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const CHANNELS = {
  leaderboard: (tournamentId: string) => `leaderboard:${tournamentId}`,
  matchRoom: (matchId: string) => `match:${matchId}:room`,
  announcements: (tournamentId: string) => `tournament:${tournamentId}:announcements`,
}

export function subscribeToLeaderboard(
  tournamentId: string,
  onUpdate: (payload: unknown) => void
) {
  return supabase
    .channel(CHANNELS.leaderboard(tournamentId))
    .on('broadcast', { event: 'score_update' }, onUpdate)
    .subscribe()
}

export function subscribeToRoomCode(
  matchId: string,
  onRoomCode: (payload: { room_id: string; password: string }) => void
) {
  return supabase
    .channel(CHANNELS.matchRoom(matchId))
    .on('broadcast', { event: 'room_credentials' }, (payload) =>
      onRoomCode(payload.payload as { room_id: string; password: string })
    )
    .subscribe()
}

export function subscribeToAnnouncements(
  tournamentId: string,
  onAnnouncement: (payload: { message: string; type: string }) => void
) {
  return supabase
    .channel(CHANNELS.announcements(tournamentId))
    .on('broadcast', { event: 'announcement' }, (payload) =>
      onAnnouncement(payload.payload as { message: string; type: string })
    )
    .subscribe()
}

export async function broadcastScoreUpdate(tournamentId: string, data: unknown) {
  return supabase
    .channel(CHANNELS.leaderboard(tournamentId))
    .send({ type: 'broadcast', event: 'score_update', payload: data })
}

export async function broadcastRoomCredentials(
  matchId: string,
  roomId: string,
  password: string
) {
  return supabase
    .channel(CHANNELS.matchRoom(matchId))
    .send({
      type: 'broadcast',
      event: 'room_credentials',
      payload: { room_id: roomId, password },
    })
}
