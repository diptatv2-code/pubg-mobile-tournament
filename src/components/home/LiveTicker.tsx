'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

interface LiveItem {
  id: string
  title: string
  prize_pool: number
  registered_teams: number
  max_teams: number
}

export default function LiveTicker() {
  const [items, setItems] = useState<LiveItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('tournaments')
      .select('id, title, prize_pool, registered_teams, max_teams, status')
      .in('status', ['ongoing', 'registration_open'])
      .order('prize_pool', { ascending: false })
      .limit(6)
      .then(({ data }: { data: unknown }) => {
        if (cancelled) return
        setItems((data as LiveItem[]) || [])
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Don't render until loaded (avoids flash)
  if (!loaded) return null

  const liveCount = items.length

  // BUG-03: Show proper message when no live tournaments
  if (liveCount === 0) {
    return (
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10, 16, 32, 0.7)',
        padding: '16px 0',
        position: 'relative',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500,
            color: 'var(--text-muted)', letterSpacing: '0.06em',
          }}>
            No live tournaments right now — check back soon
          </span>
        </div>
      </section>
    )
  }

  const list = liveCount < 4 ? [...items, ...items, ...items] : [...items, ...items]

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
          {/* BUG-03: Proper pluralization for live count */}
          <span className="live-badge">
            {`🔴 LIVE: ${liveCount} tournament${liveCount === 1 ? '' : 's'} happening now`}
          </span>
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
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--gold-bright)' }}>${(t.prize_pool ?? 0).toLocaleString()}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.registered_teams ?? 0}/{t.max_teams ?? 0}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
