'use client'
import { CSSProperties } from 'react'

const ITEMS = [
  { icon: '🔴', text: 'LIVE: 3 tournaments happening now', color: 'var(--red)' },
  { icon: '🏆', text: 'Grand Finals tonight 9PM IST', color: 'var(--gold-bright)' },
  { icon: '⚡', text: 'New season starts May 15', color: 'var(--cyan)' },
  { icon: '🎖', text: 'Register for PMGC Qualifier — closes May 12', color: 'var(--gold)' },
  { icon: '🔥', text: 'Prize pool boosted to $1.2M for global league', color: 'var(--orange)' },
  { icon: '🎮', text: 'New map rotation: Erangel · Miramar · Sanhok', color: 'var(--cyan-bright)' },
]

const itemStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '0 28px',
  fontFamily: 'var(--font-heading)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text)',
  whiteSpace: 'nowrap',
  position: 'relative',
}

const sepStyle: CSSProperties = {
  width: 1,
  height: 14,
  background: 'var(--border-strong)',
  alignSelf: 'center',
}

export default function NewsTicker() {
  const list = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="ticker-wrap" style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(90deg, rgba(15,27,46,0.9), rgba(20,32,53,0.95), rgba(15,27,46,0.9))',
      padding: '12px 0',
    }}>
      <div className="ticker-track">
        {list.map((it, i) => (
          <span key={i} style={itemStyle}>
            <span style={{ color: it.color, fontSize: 14 }} aria-hidden>{it.icon}</span>
            <span>{it.text}</span>
            <span style={sepStyle} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
