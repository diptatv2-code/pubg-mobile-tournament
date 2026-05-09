'use client'

import { useState, useEffect, useCallback } from 'react'

interface TeamEntry {
  rank: number
  prevRank: number
  teamName: string
  kills: number
  placement: number
  total: number
}

function generateTeams(): TeamEntry[] {
  const names = [
    'Nova Esports', 'Team Queso', 'Alpha Wolf', 'Ghost Squad', 'Iron Eagles',
    'Red Devils', 'Blue Phoenix', 'Storm Riders', 'Zero Hour', 'Dark Matter',
  ]
  return names.map((name, i) => {
    const kills = Math.floor(Math.random() * 20 + 5)
    const placement = Math.floor(Math.random() * 15 + 5)
    return {
      rank: i + 1,
      prevRank: i + 1,
      teamName: name,
      kills,
      placement,
      total: kills * 1 + placement,
    }
  }).sort((a, b) => b.total - a.total).map((t, i) => ({ ...t, rank: i + 1 }))
}

const INITIAL_TEAMS = generateTeams()

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }
const RANK_COLORS: Record<number, { border: string; bg: string }> = {
  1: { border: '#C8A951', bg: 'rgba(200,169,81,0.08)' },
  2: { border: 'rgba(181,188,201,0.5)', bg: 'rgba(181,188,201,0.05)' },
  3: { border: 'rgba(176,104,55,0.5)', bg: 'rgba(176,104,55,0.05)' },
}

export default function LeaderboardViewer() {
  const [teams, setTeams] = useState<TeamEntry[]>(INITIAL_TEAMS)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [countdown, setCountdown] = useState(30)

  const refresh = useCallback(() => {
    setTeams((prev) => {
      const shuffled = prev.map((t) => ({
        ...t,
        prevRank: t.rank,
        kills: Math.max(0, t.kills + Math.floor(Math.random() * 3 - 1)),
        placement: Math.max(1, t.placement + Math.floor(Math.random() * 3 - 1)),
      })).map((t) => ({ ...t, total: t.kills + t.placement }))
        .sort((a, b) => b.total - a.total)
        .map((t, i) => ({ ...t, rank: i + 1 }))
      return shuffled
    })
    setLastRefresh(new Date())
    setCountdown(30)
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refresh, 30_000)
    return () => clearInterval(interval)
  }, [refresh])

  // Countdown ticker
  useEffect(() => {
    const tick = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="lb-viewer">
      {/* Header bar */}
      <div className="lb-header-bar">
        <div className="lb-header-info">
          <span className="lb-title">Live Rankings</span>
          <span className="lb-subtitle">Top 10 Teams · PMCO Spring Split</span>
        </div>
        <div className="lb-refresh-info">
          <span className="lb-countdown">Refresh in {countdown}s</span>
          <button className="lb-refresh-btn" onClick={refresh}>⟳ Refresh</button>
        </div>
      </div>
      <div className="lb-last-refresh">Last updated: {lastRefresh.toLocaleTimeString()}</div>

      {/* Table */}
      <div className="lb-table-wrap">
        <table className="lb-table">
          <thead>
            <tr>
              <th className="lb-th-rank">Rank</th>
              <th>Team</th>
              <th>Kills</th>
              <th>Placement</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              const diff = team.prevRank - team.rank
              const rankStyle = RANK_COLORS[team.rank] ?? { border: 'transparent', bg: 'transparent' }
              return (
                <tr
                  key={team.teamName}
                  className="lb-row"
                  style={{
                    borderLeft: team.rank <= 3 ? `3px solid ${rankStyle.border}` : '3px solid transparent',
                    background: rankStyle.bg,
                  }}
                >
                  <td className="lb-td-rank">
                    {MEDAL[team.rank] ? (
                      <span className="lb-medal">{MEDAL[team.rank]}</span>
                    ) : (
                      <span className="lb-rank-num">#{team.rank}</span>
                    )}
                  </td>
                  <td className="lb-td-team">
                    <span className="lb-team-name">{team.teamName}</span>
                    {diff !== 0 && (
                      <span className={`lb-rank-change${diff > 0 ? ' lb-up' : ' lb-down'}`}>
                        {diff > 0 ? '↑' : '↓'}{Math.abs(diff)}
                      </span>
                    )}
                  </td>
                  <td className="lb-td-stat">{team.kills}</td>
                  <td className="lb-td-stat">{team.placement}</td>
                  <td className="lb-td-total">{team.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .lb-viewer { display: flex; flex-direction: column; gap: 16px; }

        .lb-header-bar {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap;
        }
        .lb-title {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 1.4rem; font-weight: 700;
          color: var(--text, #E8E8E8); display: block;
        }
        .lb-subtitle { font-size: 0.8rem; color: var(--text-muted, #6B7280); display: block; }
        .lb-refresh-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .lb-countdown { font-size: 0.8rem; color: var(--text-muted, #6B7280); font-family: monospace; }
        .lb-refresh-btn {
          padding: 6px 14px; background: rgba(0,212,255,0.12); color: var(--cyan, #00D4FF);
          border: 1px solid rgba(0,212,255,0.3); border-radius: 6px;
          font-size: 0.8rem; font-family: var(--font-body); cursor: pointer;
          transition: background 0.15s;
        }
        .lb-refresh-btn:hover { background: rgba(0,212,255,0.22); }
        .lb-last-refresh { font-size: 0.75rem; color: var(--text-dim, #475569); margin-top: -8px; }

        .lb-table-wrap {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 12px; overflow: hidden;
        }
        .lb-table { width: 100%; border-collapse: collapse; }
        .lb-table thead tr {
          background: rgba(200,169,81,0.05);
          border-bottom: 1px solid var(--border, rgba(200,169,81,0.15));
        }
        th {
          padding: 10px 14px; text-align: left; font-size: 0.68rem;
          text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted, #6B7280);
          font-weight: 600;
        }
        .lb-th-rank { width: 60px; text-align: center; }
        .lb-row {
          border-bottom: 1px solid var(--border-muted, rgba(255,255,255,0.04));
          transition: background 0.2s;
        }
        .lb-row:last-child { border-bottom: none; }
        .lb-row:hover { background: rgba(255,255,255,0.03) !important; }
        .lb-table td { padding: 12px 14px; vertical-align: middle; }
        .lb-td-rank { text-align: center; }
        .lb-medal { font-size: 1.3rem; }
        .lb-rank-num { font-family: var(--font-heading); font-weight: 700; color: var(--text-muted, #6B7280); font-size: 0.9rem; }

        .lb-td-team { display: flex; align-items: center; gap: 8px; }
        .lb-team-name { font-family: var(--font-heading); font-weight: 700; font-size: 1rem; color: var(--text, #E8E8E8); }
        .lb-rank-change {
          font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;
          letter-spacing: 0.02em;
        }
        .lb-up { background: rgba(34,214,122,0.12); color: #22D67A; }
        .lb-down { background: rgba(255,68,68,0.12); color: #FF4444; }

        .lb-td-stat { color: var(--text-secondary, #B5BCC9); font-size: 0.9rem; text-align: center; }
        .lb-td-total {
          font-family: var(--font-heading); font-weight: 700; font-size: 1.1rem;
          color: var(--gold, #C8A951); text-align: right;
        }
      `}</style>
    </div>
  )
}
