"use client"
import Link from 'next/link'

const STATS = [
  { label: 'Tournaments Played', value: '24', icon: '🎮', color: 'var(--gold)' },
  { label: 'Total Wins', value: '7', icon: '🏆', color: 'var(--cyan)' },
  { label: 'Total Kills', value: '342', icon: '⚔️', color: 'var(--purple-light)' },
  { label: 'Wallet Balance', value: '$240', icon: '💰', color: '#22c55e' },
]

const RECENT = [
  { id: '1', title: 'PMGC Qualifier', placement: '#3', kills: 18, pts: 53, date: 'May 7', status: 'completed' },
  { id: '2', title: 'Asia Open Champ', placement: '#1', kills: 24, pts: 68, date: 'May 4', status: 'completed' },
  { id: '3', title: 'Weekend Blitz', placement: '#8', kills: 12, pts: 27, date: 'May 2', status: 'completed' },
]

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>● Dashboard</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700 }}>
              Welcome Back, <span className="gradient-gold">Commander</span>
            </h1>
          </div>
          <Link href="/tournaments" className="btn btn-gold" style={{ textDecoration: 'none' }}>Find Tournament</Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
          {STATS.map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Recent matches */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>Recent Tournaments</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {RECENT.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: r.placement === '#1' ? 'var(--gold)' : 'var(--text-secondary)', width: 36 }}>{r.placement}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.date} · {r.kills} kills</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--cyan)' }}>{r.pts} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/tournaments', label: 'Browse Tournaments', icon: '🎯', desc: 'Find and join active tournaments' },
                { href: '/tournaments/create', label: 'Host a Tournament', icon: '🏟️', desc: 'Create your own tournament' },
                { href: '/profile', label: 'Edit Profile', icon: '👤', desc: 'Update PUBG UID and stats' },
              ].map(action => (
                <Link key={action.href} href={action.href} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--bg-elevated)', borderRadius: 8, transition: 'background 0.2s, border-color 0.2s', border: '1px solid var(--border)', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                  >
                    <span style={{ fontSize: 24 }}>{action.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{action.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{action.desc}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
