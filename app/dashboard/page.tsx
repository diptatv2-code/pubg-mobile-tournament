import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TournamentStatusBadge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Trophy, Users, Plus, Settings } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirect=/dashboard')
  const admin = createAdminClient()
  const { data: profile } = await admin.from('profiles').select('*').eq('id', user.id).single()
  const { data: myTournaments } = await admin.from('tournaments')
    .select('*').eq('organizer_id', user.id).order('created_at', { ascending: false }).limit(10)
  const { data: myTeams } = await admin.from('teams')
    .select('*, tournaments(id, name, status, start_date)').eq('captain_id', user.id).order('created_at', { ascending: false }).limit(10)
  const { data: pendingInvites } = await admin.from('roster')
    .select('*, teams(name, tournaments(name))').eq('player_id', user.id).eq('status', 'invited').limit(5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>
          Welcome, {profile?.display_name || 'Player'}
        </h1>
        <p style={{ color: '#6B7A99' }}>Rank: <span style={{ color: '#C8A951' }}>{profile?.rank_tier}</span> · PUBG UID: {profile?.pubg_uid || 'Not set'}</p>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <Link href="/tournaments/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
          <Plus size={16} /> Create Tournament
        </Link>
        <Link href="/tournaments" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: '#0F1B2E', border: '1px solid #1A2A4A', color: '#E8EAF0' }}>
          <Trophy size={16} /> Browse Tournaments
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Tournaments */}
        <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>My Tournaments</h2>
            <Trophy size={20} style={{ color: '#C8A951' }} />
          </div>
          {myTournaments && myTournaments.length > 0 ? (
            <div className="space-y-3">
              {myTournaments.map((t: Record<string, unknown>) => (
                <div key={t.id as string} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                  <div>
                    <div className="font-medium text-sm" style={{ color: '#E8EAF0' }}>{t.name as string}</div>
                    <TournamentStatusBadge status={t.status as string} />
                  </div>
                  <Link href={`/tournaments/${t.id}/manage`} className="flex items-center gap-1 text-xs px-3 py-1 rounded" style={{ backgroundColor: '#1A2A4A', color: '#C8A951' }}>
                    <Settings size={12} /> Manage
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#6B7A99' }}>No tournaments yet. <Link href="/tournaments/create" style={{ color: '#00D4FF' }}>Create one!</Link></p>
          )}
        </div>

        {/* My Teams */}
        <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>My Teams</h2>
            <Users size={20} style={{ color: '#C8A951' }} />
          </div>
          {myTeams && myTeams.length > 0 ? (
            <div className="space-y-3">
              {myTeams.map((t: Record<string, unknown>) => {
                const tournament = t.tournaments as Record<string, unknown>
                return (
                  <div key={t.id as string} className="p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                    <div className="font-medium text-sm" style={{ color: '#E8EAF0' }}>{t.name as string}</div>
                    <div className="text-xs mt-1" style={{ color: '#6B7A99' }}>
                      {tournament?.name as string} · <TournamentStatusBadge status={tournament?.status as string} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#6B7A99' }}>No teams yet. Browse tournaments to join!</p>
          )}
        </div>

        {/* Pending Invites */}
        {pendingInvites && pendingInvites.length > 0 && (
          <div className="p-6 rounded-xl lg:col-span-2" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #C8A951' }}>
            <h2 className="font-bold text-lg mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#C8A951' }}>
              ⚔️ Pending Team Invites ({pendingInvites.length})
            </h2>
            <div className="space-y-3">
              {pendingInvites.map((inv: Record<string, unknown>) => {
                const team = inv.teams as Record<string, unknown>
                const tournament = team?.tournaments as Record<string, unknown>
                return (
                  <div key={inv.id as string} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                    <div>
                      <div style={{ color: '#E8EAF0' }}>{team?.name as string}</div>
                      <div className="text-xs" style={{ color: '#6B7A99' }}>{tournament?.name as string}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1 rounded" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>Accept</button>
                      <button className="text-xs px-3 py-1 rounded" style={{ backgroundColor: '#1A2A4A', color: '#6B7A99' }}>Decline</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
