import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { TournamentStatusBadge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Trophy, Users, Map, Clock, Shield, Target, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

interface PageProps { params: Promise<{ id: string }> }

const BRACKET_LABELS: Record<string, string> = {
  group_stage: 'Group Stage', single_elim: 'Single Elimination',
  round_robin: 'Round Robin', async_ffa: 'Async FFA'
}

export default async function TournamentDetailPage({ params }: PageProps) {
  const { id } = await params
  const admin = createAdminClient()
  const { data: tournament } = await admin.from('tournaments')
    .select('*, profiles(display_name, avatar_url)').eq('id', id).single()
  if (!tournament) notFound()
  const { data: teams } = await admin.from('teams')
    .select('*, profiles(display_name)').eq('tournament_id', id).eq('status', 'registered')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userTeam = user ? teams?.find((t: Record<string, unknown>) => t.captain_id === user.id) : null
  const canRegister = user && tournament.status === 'registration_open' && !userTeam && (teams?.length || 0) < tournament.max_teams
  const isOrganizer = user?.id === tournament.organizer_id
  const organizer = tournament.profiles as Record<string, string>

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#E8EAF0' }}>{tournament.name}</h1>
              <TournamentStatusBadge status={tournament.status} />
            </div>
            <p style={{ color: '#6B7A99' }}>Organized by {organizer?.display_name}</p>
          </div>
          <div className="flex gap-3">
            {isOrganizer && (
              <Link href={`/tournaments/${id}/manage`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#C8A951', color: '#040810', fontWeight: 600 }}>
                <Settings size={16} /> Manage
              </Link>
            )}
            {canRegister && (
              <Link href={`/tournaments/${id}/register`} className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-bold" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
                <Trophy size={16} /> Register Team
              </Link>
            )}
            {!user && tournament.status === 'registration_open' && (
              <Link href={`/auth/login?redirect=/tournaments/${id}`} className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-bold" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
                Login to Register
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ icon: Trophy, label: 'Format', value: BRACKET_LABELS[tournament.bracket_type] || tournament.bracket_type },
              { icon: Users, label: 'Teams', value: `${teams?.length || 0} / ${tournament.max_teams}` },
              { icon: Map, label: 'Map', value: `${tournament.map} · ${tournament.perspective}` },
              { icon: Clock, label: 'Starts', value: formatDate(tournament.start_date) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
                <Icon size={20} style={{ color: '#C8A951' }} />
                <div>
                  <div className="text-xs" style={{ color: '#6B7A99' }}>{label}</div>
                  <div className="font-semibold" style={{ color: '#E8EAF0' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          {tournament.description && (
            <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>About</h3>
              <p style={{ color: '#6B7A99', lineHeight: 1.7 }}>{tournament.description}</p>
            </div>
          )}

          {/* Scoring Matrix */}
          <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>Scoring System</h3>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {tournament.scoring_matrix.placement.slice(0, 8).map((pts: number, i: number) => (
                <div key={i} className="text-center p-2 rounded" style={{ backgroundColor: '#0A1020' }}>
                  <div className="text-xs" style={{ color: '#6B7A99' }}>#{i + 1}</div>
                  <div className="font-bold" style={{ color: i === 0 ? '#C8A951' : '#E8EAF0' }}>{pts}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-sm" style={{ color: '#6B7A99' }}>
              <span><Target size={14} className="inline mr-1" style={{ color: '#00D4FF' }} />Kill: +{tournament.scoring_matrix.kill_points}pt</span>
              {tournament.smash_rule_enabled && <span><Shield size={14} className="inline mr-1" style={{ color: '#FF4444' }} />Smash Rule: {tournament.smash_rule_threshold}pts</span>}
            </div>
          </div>
        </div>

        {/* Sidebar - Teams */}
        <div>
          <div className="p-6 rounded-xl sticky top-24" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>Registered Teams ({teams?.length || 0})</h3>
            {teams && teams.length > 0 ? (
              <div className="space-y-3">
                {teams.map((team: Record<string, unknown>) => (
                  <div key={team.id as string} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: '#040810' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#1A2A4A', color: '#C8A951' }}>
                      {(team.name as string)[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#E8EAF0' }}>{team.name as string}</div>
                      <div className="text-xs" style={{ color: '#6B7A99' }}>by {(team.profiles as Record<string, string>)?.display_name}</div>
                    </div>
                    {userTeam && (userTeam as Record<string, unknown>).id === team.id && (
                      <span className="ml-auto text-xs" style={{ color: '#00D4FF' }}>You</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Users size={32} className="mx-auto mb-2" style={{ color: '#1A2A4A' }} />
                <p className="text-sm" style={{ color: '#6B7A99' }}>No teams yet. Be the first!</p>
              </div>
            )}
            <div className="mt-4 pt-4 text-xs" style={{ borderTop: '1px solid #1A2A4A', color: '#4A5A79' }}>
              Registration deadline: {formatDate(tournament.registration_deadline)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
