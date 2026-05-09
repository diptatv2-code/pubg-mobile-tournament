import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { getFullLeaderboard } from '@/lib/leaderboard'
import { Trophy, Crown, Swords, Target } from 'lucide-react'
import Link from 'next/link'

interface PageProps { params: Promise<{ id: string }>; searchParams: Promise<{ refresh?: string }> }

export const revalidate = 30

export default async function LeaderboardPage({ params }: PageProps) {
  const { id } = await params
  const admin = createAdminClient()
  const { data: tournament } = await admin.from('tournaments').select('id, name, status, scoring_matrix').eq('id', id).single()
  if (!tournament) notFound()
  const leaderboard = await getFullLeaderboard(id)
  // Enrich with team names
  let enriched = leaderboard
  if (leaderboard.length > 0 && !leaderboard[0].teamName) {
    const teamIds = leaderboard.map(e => e.teamId)
    const { data: teams } = await admin.from('teams').select('id, name').in('id', teamIds)
    const teamMap = Object.fromEntries((teams || []).map(t => [t.id, t.name]))
    enriched = leaderboard.map(e => ({ ...e, teamName: teamMap[e.teamId] || 'Unknown Team' }))
  }
  // If no Redis data, build from match_results directly
  if (enriched.length === 0) {
    const { data: results } = await admin.from('match_results')
      .select('team_id, total_points, teams(name)')
      .eq('matches.tournament_id', id)
    const statsMap = new Map<string, { teamId: string; teamName: string; score: number }>()
    for (const r of (results || [])) {
      const rr = r as Record<string, unknown>
      const teamId = rr.team_id as string
      const existing = statsMap.get(teamId) || { teamId, teamName: (rr.teams as Record<string, string>)?.name || 'Unknown', score: 0 }
      statsMap.set(teamId, { ...existing, score: existing.score + ((rr.total_points as number) || 0) })
    }
    enriched = [...statsMap.values()].sort((a, b) => b.score - a.score).map((e, i) => ({ ...e, rank: i + 1 }))
  }
  const rankStyle = (rank: number) => {
    if (rank === 1) return { color: '#C8A951', background: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.3)' }
    if (rank === 2) return { color: '#9CA3AF', background: 'rgba(156,163,175,0.05)', border: '1px solid rgba(156,163,175,0.2)' }
    if (rank === 3) return { color: '#CD7F32', background: 'rgba(205,127,50,0.05)', border: '1px solid rgba(205,127,50,0.2)' }
    return { color: '#E8EAF0', background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Crown size={48} className="mx-auto mb-3" style={{ color: '#C8A951' }} />
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#E8EAF0' }}>Leaderboard</h1>
        <p style={{ color: '#6B7A99' }}>{tournament.name}</p>
        {tournament.status === 'started' && (
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
            ⚡ Live · Updates every 30s
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link href={`/tournaments/${id}`} className="text-sm" style={{ color: '#6B7A99' }}>← Back to tournament</Link>
        <a href={`/tournaments/${id}/leaderboard?refresh=1`} className="text-sm" style={{ color: '#00D4FF' }}>🔄 Refresh</a>
      </div>
      {enriched.length === 0 ? (
        <div className="text-center py-20">
          <Swords size={48} className="mx-auto mb-4" style={{ color: '#1A2A4A' }} />
          <p style={{ color: '#6B7A99' }}>No results yet. Tournament hasn&apos;t started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enriched.map((entry) => (
            <div key={entry.teamId} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={rankStyle(entry.rank)}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ backgroundColor: entry.rank <= 3 ? 'rgba(200,169,81,0.15)' : '#0A1020', color: entry.rank === 1 ? '#C8A951' : entry.rank === 2 ? '#9CA3AF' : entry.rank === 3 ? '#CD7F32' : '#6B7A99', fontFamily: 'Rajdhani, sans-serif' }}>
                {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
              </div>
              <div className="flex-1">
                <div className="font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0', fontSize: '1.1rem' }}>{entry.teamName || 'Unknown Team'}</div>
              </div>
              <div className="text-right">
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: entry.rank === 1 ? '#C8A951' : '#00D4FF' }}>{entry.score}</div>
                <div className="text-xs" style={{ color: '#6B7A99' }}>points</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
