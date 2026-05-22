'use client'
import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import TournamentCard from '@/components/tournament/TournamentCard'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
import type { Tournament } from '@/types/database'

const FILTERS = [
  { key: 'all', label: 'All', icon: '⊕' },
  { key: 'live', label: 'Live', icon: '🔴' },
  { key: 'open', label: 'Open', icon: '🟢' },
  { key: 'upcoming', label: 'Upcoming', icon: '🔵' },
  { key: 'ended', label: 'Ended', icon: '✅' },
] as const

const MAPS = ['All Maps', 'Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Livik', 'Karakin']
const MODES = ['All Modes', 'squad', 'duo', 'solo']
const SORTS = [
  { v: 'starts', l: 'Start Date' },
  { v: 'prize', l: 'Prize Pool' },
  { v: 'teams', l: 'Teams Filled' },
]

const PAGE_SIZE = 6

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [map, setMap] = useState('All Maps')
  const [mode, setMode] = useState('All Modes')
  const [sort, setSort] = useState('starts')
  const [search, setSearch] = useState('')
  const [shown, setShown] = useState(PAGE_SIZE)

  useEffect(() => {
    supabase
      .from('tournaments')
      .select('*')
      .order('starts_at', { ascending: true })
      .then(({ data }: { data: unknown }) => {
        setTournaments((data as Tournament[]) || [])
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    const out = tournaments.filter(t => {
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filter === 'all'
        || (filter === 'live' && t.status === 'ongoing')
        || (filter === 'open' && t.status === 'registration_open')
        || (filter === 'upcoming' && t.status === 'registration_closed')
        || (filter === 'ended' && t.status === 'completed')
      const matchMap = map === 'All Maps' || t.map === map
      const matchMode = mode === 'All Modes' || t.game_mode === mode
      return matchSearch && matchFilter && matchMap && matchMode
    })
    if (sort === 'prize') out.sort((a, b) => b.prize_pool - a.prize_pool)
    else if (sort === 'teams') out.sort((a, b) => (b.registered_teams / b.max_teams) - (a.registered_teams / a.max_teams))
    else out.sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
    return out
  }, [tournaments, filter, map, mode, sort, search])

  const visible = filtered.slice(0, shown)
  const hasMore = shown < filtered.length

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Top banner */}
      <section style={{
        position: 'relative',
        padding: 'clamp(80px, 12vw, 140px) 0 56px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(15,27,46,0.6), transparent)',
        overflow: 'hidden',
      }}>
        <div className="hex-bg" aria-hidden />
        <div aria-hidden style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,81,0.1), transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>BROWSE</div>
          <h1 className="heading-display animate-fade-up" style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', marginBottom: 16,
          }}>
            Find Your <span className="gradient-gold">Battle</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Compete in tournaments across every skill tier. Free entry, real prizes.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section style={{ padding: '40px 0 0', position: 'relative' }}>
        <div className="container">
          {/* Filter pills */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, justifyContent: 'center',
          }}>
            {FILTERS.map(f => {
              const active = filter === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => { setFilter(f.key); setShown(PAGE_SIZE) }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 999,
                    background: active ? 'linear-gradient(135deg, rgba(200,169,81,0.25), rgba(200,169,81,0.1))' : 'rgba(15,27,46,0.6)',
                    border: active ? '1px solid var(--gold)' : '1px solid var(--border)',
                    color: active ? 'var(--gold-bright)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: active ? '0 0 16px rgba(200,169,81,0.25)' : 'none',
                  }}
                >
                  <span aria-hidden style={{ fontSize: 12 }}>{f.icon}</span>
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* Filters row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32,
            padding: 16,
            background: 'rgba(15, 27, 46, 0.5)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            backdropFilter: 'blur(8px)',
          }}>
            {/* Search */}
            <div style={{ flex: '1 1 240px', position: 'relative' }}>
              <span aria-hidden style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-muted)', fontSize: 16, pointerEvents: 'none',
              }}>🔍</span>
              <input
                className="input"
                type="search"
                placeholder="Search tournaments..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShown(PAGE_SIZE) }}
                style={{ paddingLeft: 40 }}
              />
            </div>
            <select className="input" value={map} onChange={e => { setMap(e.target.value); setShown(PAGE_SIZE) }} style={{ flex: '0 0 180px' }}>
              {MAPS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="input" value={mode} onChange={e => { setMode(e.target.value); setShown(PAGE_SIZE) }} style={{ flex: '0 0 180px' }}>
              {MODES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="input" value={sort} onChange={e => setSort(e.target.value)} style={{ flex: '0 0 180px' }}>
              {SORTS.map(s => <option key={s.v} value={s.v}>Sort: {s.l}</option>)}
            </select>
            <Link href="/tournaments/create" className="btn-primary" style={{ flexShrink: 0 }}>
              + Host
            </Link>
          </div>

          {/* Results count */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
              <strong style={{ color: 'var(--gold-bright)', fontSize: 18, marginRight: 6 }}>{filtered.length}</strong>
              tournament{filtered.length !== 1 ? 's' : ''} found
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>
              Showing {visible.length} of {filtered.length}
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div style={{
              padding: '80px 24px', textAlign: 'center',
              background: 'rgba(15, 27, 46, 0.4)',
              border: '1px dashed var(--border)',
              borderRadius: 16,
              marginBottom: 40,
            }}>
              <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.4 }} aria-hidden>⏳</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>Loading...</h3>
            </div>
          ) : visible.length > 0 ? (
            /* Cards grid */
            <div className="grid-tournaments" style={{ marginBottom: 40 }}>
              {visible.map(t => (
                <TournamentCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  prize={t.prize_pool}
                  maxTeams={t.max_teams}
                  registeredTeams={t.registered_teams}
                  status={t.status}
                  map={t.map}
                  gameMode={t.game_mode}
                  format={t.format}
                  startsAt={t.starts_at}
                />
              ))}
            </div>
          ) : (
            <div style={{
              padding: '80px 24px', textAlign: 'center',
              background: 'rgba(15, 27, 46, 0.4)',
              border: '1px dashed var(--border)',
              borderRadius: 16,
              marginBottom: 40,
            }}>
              <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.4 }} aria-hidden>🎯</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>No tournaments yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Try clearing some filters or checking back later.</p>
            </div>
          )}

          {/* Load more */}
          {!loading && hasMore && (
            <div style={{ textAlign: 'center', padding: '0 0 80px' }}>
              <button
                type="button"
                onClick={() => setShown(s => s + PAGE_SIZE)}
                className="btn-secondary"
                style={{ fontSize: 14, padding: '14px 36px' }}
              >
                Load More ({filtered.length - shown} remaining) ↓
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
