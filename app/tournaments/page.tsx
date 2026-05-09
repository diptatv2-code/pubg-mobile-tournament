import { createAdminClient } from '@/lib/supabase/admin'
import { TournamentStatusBadge } from '@/components/ui/badge'
import { formatDate, timeUntil } from '@/lib/utils'
import Link from 'next/link'
import { Trophy, Users, Map, Clock, Plus } from 'lucide-react'

interface PageProps { searchParams: Promise<{ status?: string; page?: string }> }

const BRACKET_LABELS: Record<string, string> = {
  group_stage: 'Group Stage', single_elim: 'Single Elimination',
  round_robin: 'Round Robin', async_ffa: 'Async FFA'
}

export default async function TournamentsPage({ searchParams }: PageProps) {
  const { status = 'all', page = '1' } = await searchParams
  const currentPage = parseInt(page)
  const limit = 20
  const offset = (currentPage - 1) * limit
  const admin = createAdminClient()
  let query = admin.from('tournaments')
    .select('*, profiles(display_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (status !== 'all') query = query.eq('status', status)
  const { data: tournaments, count } = await query
  const totalPages = Math.ceil((count || 0) / limit)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#E8EAF0' }}>Tournaments</h1>
          <p style={{ color: '#6B7A99' }}>{count || 0} tournament{(count || 0) !== 1 ? 's' : ''} found</p>
        </div>
        <Link href="/tournaments/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
          <Plus size={16} /> Create Tournament
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[['all', 'All'], ['registration_open', '🟢 Open'], ['started', '⚡ Live'], ['completed', '✅ Completed']].map(([val, label]) => (
          <a key={val} href={`/tournaments?status=${val}`}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={status === val ? { backgroundColor: '#00D4FF', color: '#040810' } : { backgroundColor: '#0F1B2E', color: '#6B7A99', border: '1px solid #1A2A4A' }}>
            {label}
          </a>
        ))}
      </div>

      {/* Tournament grid */}
      {tournaments && tournaments.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((t: Record<string, unknown>) => (
            <Link key={t.id as string} href={`/tournaments/${t.id}`}>
              <div className="p-6 rounded-xl h-full transition-all hover:border-cyan-400 cursor-pointer" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>{t.name as string}</h3>
                  <TournamentStatusBadge status={t.status as string} />
                </div>
                <p className="text-sm mb-4" style={{ color: '#6B7A99' }}>by {(t.profiles as Record<string, string>)?.display_name}</p>
                <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: '#6B7A99' }}>
                  <span className="flex items-center gap-1"><Trophy size={12} style={{ color: '#C8A951' }} /> {BRACKET_LABELS[t.bracket_type as string] || t.bracket_type as string}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> Max {t.max_teams as number}</span>
                  <span className="flex items-center gap-1"><Map size={12} /> {t.map as string} · {t.perspective as string}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {timeUntil(t.start_date as string)}</span>
                </div>
                <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor: '#1A2A4A', color: '#4A5A79' }}>
                  Starts {formatDate(t.start_date as string)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Trophy size={48} className="mx-auto mb-4" style={{ color: '#1A2A4A' }} />
          <p style={{ color: '#6B7A99' }}>No tournaments found. Be the first to create one!</p>
          <Link href="/tournaments/create" className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
            <Plus size={16} /> Create Tournament
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <a key={p} href={`/tournaments?status=${status}&page=${p}`}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-colors"
              style={p === currentPage ? { backgroundColor: '#00D4FF', color: '#040810' } : { backgroundColor: '#0F1B2E', color: '#6B7A99', border: '1px solid #1A2A4A' }}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
