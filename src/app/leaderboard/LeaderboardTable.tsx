'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Player {
  id: string
  username: string
  pubg_name: string | null
  avatar_url: string | null
  total_tournaments: number
  total_wins: number
  total_kills: number
}

function getRankBadge(rank: number) {
  if (rank === 1) return { emoji: '🥇', color: 'var(--gold-bright)' }
  if (rank === 2) return { emoji: '🥈', color: '#C0C0C0' }
  if (rank === 3) return { emoji: '🥉', color: '#CD7F32' }
  return { emoji: `#${rank}`, color: 'var(--text-muted)' }
}

export default function LeaderboardTable({ players }: { players: Player[] }) {
  if (players.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '80px 24px',
        background: 'var(--bg-card)', borderRadius: 16,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.5 }}>📊</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, marginBottom: 12 }}>
          No Rankings Yet
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          Rankings will appear once tournaments are completed.
        </p>
        <Link href="/tournaments" className="btn-primary">Browse Tournaments</Link>
      </div>
    )
  }

  return (
    <>
    <div className="leaderboard-table" style={{ background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '60px 1fr 120px 120px 120px',
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(200, 169, 81, 0.04)',
      }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Rank</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Player</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center' }}>Tournaments</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center' }}>Wins</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center' }}>Kills</span>
      </div>

      {/* Rows */}
      {players.map((player, i) => {
        const rank = i + 1
        const badge = getRankBadge(rank)
        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 120px 120px 120px',
              padding: '14px 24px',
              borderBottom: '1px solid var(--border-muted)',
              alignItems: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200, 169, 81, 0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: rank <= 3 ? 20 : 14, fontWeight: 700, color: badge.color }}>
              {badge.emoji}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: 'var(--gold)',
                fontFamily: 'var(--font-heading)',
              }}>
                {player.username?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{player.username}</div>
                {player.pubg_name && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{player.pubg_name}</div>
                )}
              </div>
            </div>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {player.total_tournaments || 0}
            </span>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--gold-bright)' }}>
              {player.total_wins || 0}
            </span>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--red-bright)' }}>
              {player.total_kills || 0}
            </span>
          </motion.div>
        )
      })}
    </div>
    <style>{`
      @media (max-width: 640px) {
        .leaderboard-table > div {
          grid-template-columns: 40px 1fr 60px 60px !important;
          padding: 12px 12px !important;
          font-size: 12px;
        }
        .leaderboard-table > div > span:nth-child(5) {
          display: none !important;
        }
      }
    `}</style>
    </>
  )
}
