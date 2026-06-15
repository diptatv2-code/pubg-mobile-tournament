'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

interface LiveItem {
  id: string
  title: string
  prize_pool: number
  registered_teams: number
  max_teams: number
  status: string
  map: string
}

export default function LiveTicker() {
  const [items, setItems] = useState<LiveItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) { setLoaded(true); return }

    const supabase = createClient(url, key)
    supabase
      .from('tournaments')
      .select('id, title, prize_pool, registered_teams, max_teams, status, map')
      .in('status', ['ongoing', 'registration_open'])
      .order('starts_at', { ascending: true })
      .limit(8)
      .then(({ data }) => {
        setItems((data as LiveItem[]) || [])
        setLoaded(true)
      })
  }, [])

  if (!loaded) return null

  if (items.length === 0) {
    return (
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10, 16, 32, 0.7)',
        padding: '16px 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500,
            color: 'var(--text-muted)', letterSpacing: '0.06em',
          }}>
            No live tournaments right now — check back soon or create one!
          </span>
        </div>
      </section>
    )
  }

  const list = items.length < 4 ? [...items, ...items, ...items] : [...items, ...items]

  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(10, 16, 32, 0.7)',
      padding: '18px 0',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700,
            color: 'var(--red-bright)', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span className="status-live" />
            LIVE: {items.filter(i => i.status === 'ongoing').length || items.length} Active
          </span>
          <span style={{ width: 1, height: 24, background: 'var(--border-strong)' }} aria-hidden />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div className="ticker-content" style={{ gap: 16 }}>
            {list.map((t, i) => (
              <Link
                key={`${t.id}-${i}`}
                href={`/tournaments/${t.id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  padding: '8px 16px',
                  background: 'rgba(15, 27, 46, 0.6)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'border-color 0.3s',
                }}
              >
                <span className="status-live" style={{ width: 6, height: 6 }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.title}</span>
                <span className="tag tag-gold" style={{ fontSize: 10, padding: '2px 8px' }}>৳{(t.prize_pool ?? 0).toLocaleString()}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.map}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
