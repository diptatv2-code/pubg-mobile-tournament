'use client'
import Link from 'next/link'

const LIVE = [
  { id: 'l1', title: 'PMGC Qualifier — Asia', prize: 10000, teams: 112, max: 128 },
  { id: 'l2', title: 'Pro League S8 Finals', prize: 25000, teams: 16, max: 16 },
  { id: 'l3', title: 'Weekday Warriors #48', prize: 500, teams: 22, max: 32 },
  { id: 'l4', title: 'Asia Cup Premier', prize: 8000, teams: 64, max: 64 },
  { id: 'l5', title: 'Mobile Legends Open', prize: 3000, teams: 28, max: 32 },
]

export default function LiveTicker() {
  const list = [...LIVE, ...LIVE]
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(10, 16, 32, 0.7)',
      padding: '20px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="live-badge">LIVE NOW</span>
          <span style={{ width: 1, height: 24, background: 'var(--border-strong)' }} aria-hidden />
        </div>
        <div className="ticker-wrap" style={{ flex: 1 }}>
          <div className="ticker-track ticker-track-fast">
            {list.map((t, i) => (
              <Link
                key={`${t.id}-${i}`}
                href={`/tournaments/${t.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '8px 18px',
                  background: 'rgba(15, 27, 46, 0.6)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)', animation: 'pulseRed 1.4s infinite' }} aria-hidden />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.04em' }}>{t.title}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--gold-bright)' }}>${t.prize.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.teams}/{t.max}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
