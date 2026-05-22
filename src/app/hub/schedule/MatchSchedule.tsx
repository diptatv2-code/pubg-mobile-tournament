'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type MatchStatus = 'Upcoming' | 'Live' | 'Completed' | 'Today'
type FilterTab = 'All' | 'Today' | 'Upcoming' | 'Completed'

interface Match {
  id: string
  tournament: string
  time: string // ISO string
  map: string
  status: MatchStatus
  opponent?: string
}

const STATUS_CONFIG: Record<MatchStatus, { color: string; bg: string; label: string }> = {
  Today: { color: '#FF8C00', bg: 'rgba(255,140,0,0.12)', label: '🔔 Today' },
  Upcoming: { color: '#00D4FF', bg: 'rgba(0,212,255,0.1)', label: '📆 Upcoming' },
  Live: { color: '#FF4444', bg: 'rgba(255,68,68,0.12)', label: '🔴 LIVE' },
  Completed: { color: '#22D67A', bg: 'rgba(34,214,122,0.1)', label: '✅ Done' },
}

function getMatchStatus(startedAt: string): MatchStatus {
  const matchTime = new Date(startedAt)
  const now = new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (matchTime < now) return 'Completed'
  if (matchTime >= today && matchTime < tomorrow) return 'Today'
  return 'Upcoming'
}

function formatMatchTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const FILTERS: FilterTab[] = ['All', 'Today', 'Upcoming', 'Completed']

export default function MatchSchedule() {
  const [filter, setFilter] = useState<FilterTab>('All')
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }

        const { data: myTeams } = await supabase
          .from('teams')
          .select('id, tournament_id')
          .eq('captain_id', user.id)

        if (!myTeams || myTeams.length === 0) {
          setLoading(false)
          return
        }

        const tournamentIds = (myTeams as any[]).map((t: any) => t.tournament_id).filter(Boolean)

        if (tournamentIds.length === 0) {
          setLoading(false)
          return
        }

        const { data: matchData } = await supabase
          .from('matches')
          .select('*, tournaments(title, map)')
          .in('tournament_id', tournamentIds)
          .order('started_at', { ascending: true })

        const mapped: Match[] = (matchData || []).map((m: any) => ({
          id: m.id,
          tournament: m.tournaments?.title || m.title || 'Match',
          time: m.started_at || m.created_at || new Date().toISOString(),
          map: m.tournaments?.map || m.map || 'Erangel',
          status: getMatchStatus(m.started_at || m.created_at || new Date().toISOString()),
          opponent: m.opponent_team || undefined,
        }))

        setMatches(mapped)
      } catch (err) {
        console.error('MatchSchedule fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const filtered = matches.filter((m) => {
    if (filter === 'All') return true
    if (filter === 'Today') return m.status === 'Today'
    if (filter === 'Upcoming') return m.status === 'Upcoming'
    if (filter === 'Completed') return m.status === 'Completed'
    return true
  })

  if (loading) {
    return <div className='p-8 text-center text-[var(--color-muted)]'>Loading...</div>
  }

  return (
    <div className="schedule-view">
      {/* Filter Tabs */}
      <div className="schedule-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`schedule-tab${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      <div className="schedule-list">
        {filtered.length === 0 && (
          <div className="schedule-empty">
            {matches.length === 0
              ? 'No matches scheduled yet. Join a tournament to see your matches here.'
              : 'No matches found for this filter.'}
          </div>
        )}
        {filtered.map((match) => {
          const sc = STATUS_CONFIG[match.status]
          return (
            <div key={match.id} className="match-card">
              <div className="match-map-icon">🗺️</div>
              <div className="match-info">
                <div className="match-tournament">{match.tournament}</div>
                <div className="match-details">
                  <span className="match-map">{match.map}</span>
                  {match.opponent && (
                    <span className="match-vs">vs {match.opponent}</span>
                  )}
                </div>
                <div className="match-time">{formatMatchTime(match.time)}</div>
              </div>
              <div className="match-right">
                <span
                  className="match-status-badge"
                  style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}44` }}
                >
                  {sc.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .schedule-view { display: flex; flex-direction: column; gap: 20px; }

        .schedule-tabs {
          display: flex; gap: 6px; flex-wrap: wrap;
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 10px; padding: 6px;
          width: fit-content;
        }
        .schedule-tab {
          padding: 7px 18px; border-radius: 7px; border: none;
          font-family: var(--font-body); font-size: 0.875rem; font-weight: 600;
          color: var(--text-muted, #6B7280); background: transparent;
          cursor: pointer; transition: all 0.15s;
        }
        .schedule-tab:hover { color: var(--text, #E8E8E8); background: rgba(255,255,255,0.05); }
        .schedule-tab.active {
          background: var(--gold, #C8A951); color: #040810;
        }

        .schedule-list { display: flex; flex-direction: column; gap: 10px; }
        .schedule-empty {
          padding: 32px; text-align: center; color: var(--text-muted, #6B7280);
          font-size: 0.9rem; background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15)); border-radius: 10px;
        }

        .match-card {
          display: flex; align-items: center; gap: 16px;
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 10px; padding: 16px 18px;
          transition: background 0.15s;
        }
        .match-card:hover { background: var(--bg-card-hover, #142540); }

        .match-map-icon { font-size: 2rem; flex-shrink: 0; }

        .match-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .match-tournament {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 1.05rem; font-weight: 700;
          color: var(--text, #E8E8E8);
        }
        .match-details { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .match-map { font-size: 0.8rem; color: var(--cyan, #00D4FF); font-weight: 500; }
        .match-vs { font-size: 0.8rem; color: var(--text-secondary, #B5BCC9); }
        .match-time { font-size: 0.75rem; color: var(--text-muted, #6B7280); }

        .match-right { flex-shrink: 0; }
        .match-status-badge {
          display: inline-block; padding: 5px 12px; border-radius: 20px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
