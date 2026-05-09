'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import TournamentCard from '@/components/tournament/TournamentCard'

const MOCK = [
  { id: '1', title: 'PMGC Qualifier Series — Asia', prize: 10000, maxTeams: 128, registeredTeams: 112, status: 'ongoing', map: 'Erangel', gameMode: 'Squad TPP', format: 'group_knockout', startsAt: '2026-05-08T18:00:00Z', premium: true },
  { id: '2', title: 'Asia Open Championship 2026', prize: 5000, maxTeams: 64, registeredTeams: 48, status: 'registration_open', map: 'Miramar', gameMode: 'Squad FPP', format: 'single_elim', startsAt: '2026-05-12T14:00:00Z', premium: true },
  { id: '3', title: 'Weekday Warriors #48', prize: 500, maxTeams: 32, registeredTeams: 22, status: 'registration_open', map: 'Sanhok', gameMode: 'Squad TPP', format: 'battle_royale', startsAt: '2026-05-10T20:00:00Z', premium: false },
  { id: '4', title: 'Pro League Season 8 Finals', prize: 25000, maxTeams: 16, registeredTeams: 16, status: 'registration_closed', map: 'Vikendi', gameMode: 'Squad FPP', format: 'double_elim', startsAt: '2026-05-15T16:00:00Z', premium: true },
  { id: '5', title: 'Weekend Blitz Open', prize: 0, maxTeams: 64, registeredTeams: 18, status: 'registration_open', map: 'Livik', gameMode: 'Duo TPP', format: 'round_robin', startsAt: '2026-05-11T12:00:00Z', premium: false },
  { id: '6', title: 'Community Cup #12', prize: 1000, maxTeams: 32, registeredTeams: 32, status: 'completed', map: 'Erangel', gameMode: 'Squad TPP', format: 'battle_royale', startsAt: '2026-05-01T15:00:00Z', premium: false },
  { id: '7', title: 'Mobile Esports Pro Invitational', prize: 50000, maxTeams: 24, registeredTeams: 20, status: 'ongoing', map: 'Erangel', gameMode: 'Squad FPP', format: 'group_knockout', startsAt: '2026-05-08T10:00:00Z', premium: true },
  { id: '8', title: 'Dawn Patrol Daily', prize: 100, maxTeams: 16, registeredTeams: 8, status: 'registration_open', map: 'Karakin', gameMode: 'Squad TPP', format: 'battle_royale', startsAt: '2026-05-09T07:00:00Z', premium: false },
]

const FILTERS = [
  { key: 'all', label: 'All', icon: '⊕' },
  { key: 'live', label: 'Live', icon: '🔴' },
  { key: 'open', label: 'Open', icon: '🟢' },
  { key: 'upcoming', label: 'Upcoming', icon: '🔵' },
  { key: 'ended', label: 'Ended', icon: '✅' },
  { key: 'premium', label: 'Premium', icon: '🎖' },
] as const

const MAPS = ['All Maps', 'Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Livik', 'Karakin']
const MODES = ['All Modes', 'Squad TPP', 'Squad FPP', 'Duo TPP', 'Solo']
const SORTS = [
  { v: 'starts', l: 'Start Date' },
  { v: 'prize', l: 'Prize Pool' },
  { v: 'teams', l: 'Teams Filled' },
]

const PAGE_SIZE = 6

export default function TournamentsPage() {
  const [filter, setFilter] = useState<string>('all')
  const [map, setMap] = useState('All Maps')
  const [mode, setMode] = useState('All Modes')
  const [sort, setSort] = useState('starts')
  const [search, setSearch] = useState('')
  const [shown, setShown] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const out = MOCK.filter(t => {
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filter === 'all'
        || (filter === 'live' && t.status === 'ongoing')
        || (filter === 'open' && t.status === 'registration_open')
        || (filter === 'upcoming' && t.status === 'registration_closed')
        || (filter === 'ended' && t.status === 'completed')
        || (filter === 'premium' && t.premium)
      const matchMap = map === 'All Maps' || t.map === map
      const matchMode = mode === 'All Modes' || t.gameMode === mode
      return matchSearch && matchFilter && matchMap && matchMode
    })
    if (sort === 'prize') out.sort((a, b) => b.prize - a.prize)
    else if (sort === 'teams') out.sort((a, b) => (b.registeredTeams / b.maxTeams) - (a.registeredTeams / a.maxTeams))
    else out.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    return out
  }, [filter, map, mode, sort, search])

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
            Compete in {MOCK.length}+ tournaments across every skill tier. Free entry, real prizes.
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

          {/* Cards grid */}
          {visible.length > 0 ? (
            <div className="grid-tournaments" style={{ marginBottom: 40 }}>
              {visible.map(t => <TournamentCard key={t.id} {...t} />)}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 8 }}>No tournaments found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Try clearing some filters or checking back later.</p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
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
