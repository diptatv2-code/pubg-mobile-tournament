'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  id: string
  title: string
  prize: string | number
  maxTeams: number
  registeredTeams?: number
  status: string
  map?: string
  gameMode?: string
  format?: string
  startsAt?: string
}

const FORMAT_LABELS: Record<string, string> = {
  battle_royale: 'Battle Royale',
  single_elim: 'Single Elimination',
  double_elim: 'Double Elimination',
  round_robin: 'Round Robin',
  group_knockout: 'Group → Knockout',
}

function statusInfo(status: string): { label: string; cls: string; accent: 'red' | 'gold' | 'cyan' | 'gray' } {
  switch (status) {
    case 'ongoing':
    case 'live':
      return { label: 'LIVE', cls: 'tag-live', accent: 'red' }
    case 'registration_open':
    case 'open':
      return { label: 'OPEN', cls: 'tag-open', accent: 'gold' }
    case 'registration_closed':
    case 'upcoming':
      return { label: 'UPCOMING', cls: 'tag-upcoming', accent: 'cyan' }
    case 'completed':
    case 'ended':
      return { label: 'ENDED', cls: 'tag-ended', accent: 'gray' }
    case 'cancelled':
      return { label: 'CANCELLED', cls: 'tag-ended', accent: 'gray' }
    default:
      return { label: status.toUpperCase(), cls: 'tag-ended', accent: 'gray' }
  }
}

const accentColor = (a: 'red' | 'gold' | 'cyan' | 'gray') =>
  a === 'red' ? 'linear-gradient(90deg, #FF4444, #FF8C00)'
    : a === 'gold' ? 'linear-gradient(90deg, #E5C76B, #C8A951, #FF8C00)'
    : a === 'cyan' ? 'linear-gradient(90deg, #5BE9FF, #00D4FF)'
    : 'linear-gradient(90deg, #475569, #6B7280)'

const accentBanner = (a: 'red' | 'gold' | 'cyan' | 'gray') =>
  a === 'red' ? 'linear-gradient(135deg, rgba(255,68,68,0.2), rgba(15,27,46,0.7) 60%)'
    : a === 'gold' ? 'linear-gradient(135deg, rgba(200,169,81,0.18), rgba(15,27,46,0.7) 60%)'
    : a === 'cyan' ? 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(15,27,46,0.7) 60%)'
    : 'linear-gradient(135deg, rgba(71,85,105,0.18), rgba(15,27,46,0.7) 60%)'

function relativeTime(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso).getTime()
  const now = Date.now()
  const diff = d - now
  const abs = Math.abs(diff)
  const mins = Math.floor(abs / 60000)
  if (mins < 60) return diff > 0 ? `Starts in ${mins}m` : `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return diff > 0 ? `Starts in ${hrs}h` : `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (diff > 0) return `Starts in ${days}d`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function useCountdown(iso?: string): string | null {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!iso) return
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [iso])
  if (!iso) return null
  const target = new Date(iso).getTime()
  const diff = target - now
  if (diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  const hrs = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days}D ${hrs}H ${mins}M`
  return `${hrs}H ${mins}M`
}

export default function TournamentCard({
  id,
  title,
  prize,
  maxTeams,
  registeredTeams = 0,
  status,
  map = 'Erangel',
  gameMode = 'Squad TPP',
  format = 'battle_royale',
  startsAt,
}: Props) {
  const info = statusInfo(status)
  const fillPct = maxTeams > 0 ? Math.min(100, Math.round((registeredTeams / maxTeams) * 100)) : 0
  const prizeNum = typeof prize === 'number' ? prize : parseInt(String(prize).replace(/\D/g, '')) || 0
  const isLive = info.accent === 'red'
  const countdown = useCountdown(isLive ? undefined : startsAt)

  const fillCls =
    fillPct >= 85 ? 'progress-fill progress-fill-hot' :
    fillPct >= 50 ? 'progress-fill progress-fill-warn' :
    'progress-fill'

  const formatLabel = FORMAT_LABELS[format] ?? format

  return (
    <Link
      href={`/tournaments/${id}`}
      className="tournament-card-link"
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <article
        className="card-glass border-glow tournament-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent bar */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: accentColor(info.accent),
          zIndex: 2,
        }} />

        {/* Map gradient banner */}
        <div style={{
          height: 80,
          background: accentBanner(info.accent),
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="hex-grid" aria-hidden style={{ opacity: 0.5 }} />
          <div style={{
            position: 'absolute', bottom: 4, right: 16,
            fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700,
            color: 'rgba(255,255,255,0.05)', textTransform: 'uppercase',
            letterSpacing: '-0.04em', lineHeight: 0.9,
          }} aria-hidden>{map}</div>
          <div style={{ position: 'absolute', top: 12, left: 14 }}>
            <span className={info.cls}>{info.label}</span>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            #{id}
          </div>
        </div>

        <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700,
            lineHeight: 1.25, marginBottom: 14, color: 'var(--text)',
          }}>{title}</h3>

          {/* Prize pool */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-heading)', marginBottom: 4 }}>
              Prize Pool
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700,
              lineHeight: 1, letterSpacing: '-0.02em',
            }} className={prizeNum > 0 ? 'gradient-gold' : ''}>
              {prizeNum > 0 ? `$${prizeNum.toLocaleString()}` : <span style={{ color: 'var(--text-muted)' }}>FREE</span>}
            </div>
          </div>

          {/* Teams progress */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Teams</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: fillPct >= 85 ? 'var(--red-bright)' : 'var(--text)' }}>
                {registeredTeams}<span style={{ color: 'var(--text-muted)' }}>/{maxTeams}</span>
              </span>
            </div>
            <div className="progress-track">
              <div className={fillCls} style={{ width: `${fillPct}%` }} />
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            <span className="tag tag-cyan">{map}</span>
            <span className="tag tag-gold">{gameMode}</span>
            <span className="tag" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-muted)', color: 'var(--text-secondary)' }}>{formatLabel}</span>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
              {isLive ? '● In Progress' : countdown ? `⏱ ${countdown}` : relativeTime(startsAt) || 'TBA'}
            </span>
            <span style={{
              fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700,
              color: 'var(--gold-bright)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              View →
            </span>
          </div>
        </div>
      </article>

      <style>{`
        .tournament-card-link { transition: transform 0.25s; }
        .tournament-card-link:hover { transform: scale(1.02); }
        .tournament-card-link:hover .tournament-card { box-shadow: 0 0 30px rgba(200,169,81,0.25); }
      `}</style>
    </Link>
  )
}
