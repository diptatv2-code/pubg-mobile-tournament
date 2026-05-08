'use client'
import { useState } from 'react'
import TournamentCard from '@/components/tournament/TournamentCard'
import Link from 'next/link'

const MOCK_TOURNAMENTS = [
  { id: '1', title: 'PMGC Qualifier Series — Asia', prize: 10000, maxTeams: 128, registeredTeams: 112, status: 'ongoing', map: 'Erangel', gameMode: 'Squad TPP', format: 'group_knockout', startsAt: '2026-05-08T18:00:00Z' },
  { id: '2', title: 'Asia Open Championship 2026', prize: 5000, maxTeams: 64, registeredTeams: 48, status: 'registration_open', map: 'Miramar', gameMode: 'Squad FPP', format: 'single_elim', startsAt: '2026-05-12T14:00:00Z' },
  { id: '3', title: 'Weekday Warriors #48', prize: 500, maxTeams: 32, registeredTeams: 22, status: 'registration_open', map: 'Sanhok', gameMode: 'Squad TPP', format: 'battle_royale', startsAt: '2026-05-10T20:00:00Z' },
  { id: '4', title: 'Pro League Season 8 Finals', prize: 25000, maxTeams: 16, registeredTeams: 16, status: 'registration_closed', map: 'Vikendi', gameMode: 'Squad FPP', format: 'double_elim', startsAt: '2026-05-15T16:00:00Z' },
  { id: '5', title: 'Weekend Blitz Open', prize: 0, maxTeams: 64, registeredTeams: 18, status: 'registration_open', map: 'Livik', gameMode: 'Duo TPP', format: 'round_robin', startsAt: '2026-05-11T12:00:00Z' },
  { id: '6', title: 'Community Cup #12', prize: 1000, maxTeams: 32, registeredTeams: 32, status: 'completed', map: 'Erangel', gameMode: 'Squad TPP', format: 'battle_royale', startsAt: '2026-05-01T15:00:00Z' },
]

const FILTERS = ['All', 'Live', 'Open', 'Upcoming', 'Completed']
const MAPS = ['All Maps', 'Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Livik']

export default function TournamentsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeMap, setActiveMap] = useState('All Maps')
  const [search, setSearch] = useState('')

  const filtered = MOCK_TOURNAMENTS.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'All' ||
      (activeFilter === 'Live' && t.status === 'ongoing') ||
      (activeFilter === 'Open' && t.status === 'registration_open') ||
      (activeFilter === 'Upcoming' && t.status === 'registration_closed') ||
      (activeFilter === 'Completed' && t.status === 'completed')
    const matchMap = activeMap === 'All Maps' || t.map === activeMap
    return matchSearch && matchFilter && matchMap
  })

  return (
    <div style={{ minHeight: '100vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>● Tournaments</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Find Your <span className="gradient-gold">Battle</span>
            </h1>
          </div>
          <Link href="/tournaments/create" className="btn btn-gold" style={{ textDecoration: 'none' }}>+ Host Tournament</Link>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="input"
            placeholder="Search tournaments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="btn btn-sm" style={{
                background: activeFilter === f ? 'linear-gradient(135deg,#f5c518,#e6a800)' : 'var(--bg-elevated)',
                color: activeFilter === f ? '#000' : 'var(--text-secondary)',
                border: '1px solid ' + (activeFilter === f ? '#f5c518' : 'var(--border)'),
              }}>{f}</button>
            ))}
          </div>
          <select
            value={activeMap}
            onChange={e => setActiveMap(e.target.value)}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)',
              padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', outline: 'none',
            }}
          >
            {MAPS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Results count */}
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          Showing <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{filtered.length}</span> tournaments
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid-tournaments">
            {filtered.map(t => <TournamentCard key={t.id} {...t} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>No tournaments found</div>
            <div style={{ marginTop: 8, fontSize: 14 }}>Try adjusting your filters</div>
          </div>
        )}
      </div>
    </div>
  )
}
