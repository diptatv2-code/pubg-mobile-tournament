'use client'
import Link from 'next/link'
import AnimatedCounter from '@/components/home/AnimatedCounter'

const STATS = [
  { label: 'Tournaments Played', value: 24, color: 'var(--gold-bright)', icon: '🎮' },
  { label: 'Total Wins', value: 7, color: 'var(--cyan-bright)', icon: '🏆' },
  { label: 'Total Kills', value: 342, color: 'var(--red-bright)', icon: '⚔️' },
  { label: 'Wallet Balance', value: 240, prefix: '$', color: 'var(--green)', icon: '💰' },
]

const ACTIVE = {
  id: 'pmgc-asia',
  title: 'PMGC Qualifier Series — Asia',
  prize: 10000,
  map: 'Erangel',
  mode: 'Squad TPP',
  nextMatchIn: '2H 18M',
  team: 'Alpha Wolves',
  placement: 3,
}

const RECENT = [
  { id: '1', title: 'PMGC Qualifier — Match 3', placement: 3, kills: 18, pts: 53, date: 'May 7', map: 'Erangel' },
  { id: '2', title: 'Asia Open Champ Finals', placement: 1, kills: 24, pts: 68, date: 'May 4', map: 'Miramar' },
  { id: '3', title: 'Weekend Blitz #12', placement: 8, kills: 12, pts: 27, date: 'May 2', map: 'Sanhok' },
  { id: '4', title: 'Mobile Pro League S7', placement: 5, kills: 16, pts: 42, date: 'Apr 28', map: 'Vikendi' },
  { id: '5', title: 'Community Cup #11', placement: 2, kills: 21, pts: 58, date: 'Apr 24', map: 'Erangel' },
]

const ACTIONS = [
  { href: '/tournaments', label: 'Browse Tournaments', desc: 'Find your next battle', icon: '🎯' },
  { href: '/tournaments/create', label: 'Host Tournament', desc: 'Run your own event', icon: '🏟️' },
  { href: '/teams', label: 'Manage Team', desc: 'Update roster and tactics', icon: '👥' },
  { href: '/profile', label: 'Edit Profile', desc: 'Update PUBG UID & info', icon: '⚙️' },
]

function placementColor(p: number): string {
  if (p === 1) return 'var(--gold-bright)'
  if (p === 2) return '#C0C0C0'
  if (p === 3) return '#CD7F32'
  return 'var(--text-secondary)'
}

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg */}
      <div className="hex-bg" aria-hidden style={{ position: 'fixed', inset: 0, zIndex: -1 }} />

      <section style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 80 }}>
        <div className="container">
          {/* Top welcome */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 24, marginBottom: 40,
          }}>
            <div>
              <div className="section-eyebrow">DASHBOARD</div>
              <h1 className="heading-section animate-fade-up" style={{ marginBottom: 8 }}>
                Welcome Back, <span className="gradient-gold">Commander</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                Last sign-in: Today, 14:32 IST · Rank #847 globally
              </p>
            </div>
            <div className="card-glass" style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 24px', minWidth: 0,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--gold-bright), var(--gold), var(--gold-dim))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: '#000',
                boxShadow: '0 0 16px rgba(200,169,81,0.4)',
              }} aria-hidden>VI</div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Rank</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--gold-bright)' }}>Diamond VI</div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36,
          }} className="dash-stats">
            {STATS.map((s, i) => (
              <div key={s.label} className="card-glass animate-fade-up" style={{
                padding: 24, position: 'relative', overflow: 'hidden',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div aria-hidden style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: 'var(--font-heading)' }}>{s.label}</span>
                  <span aria-hidden style={{ fontSize: 18 }}>{s.icon}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700,
                  color: s.color, lineHeight: 1, letterSpacing: '-0.02em',
                }}>
                  <AnimatedCounter to={s.value} prefix={s.prefix ?? ''} />
                </div>
              </div>
            ))}
          </div>

          {/* Active tournament + actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 36 }} className="dash-row">
            <div className="card-glass animate-fade-up" style={{
              padding: 0, position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, var(--red), var(--orange))',
              }} />
              <div style={{
                padding: 28, position: 'relative',
                background: 'linear-gradient(135deg, rgba(255,68,68,0.08), transparent 60%)',
              }}>
                <div className="hex-grid" aria-hidden style={{ opacity: 0.4 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <span className="live-badge">ACTIVE NOW</span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
                      color: 'var(--orange)', letterSpacing: '0.14em', textTransform: 'uppercase',
                    }}>
                      Next match in {ACTIVE.nextMatchIn}
                    </span>
                  </div>

                  <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{ACTIVE.title}</h2>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                    <span className="tag tag-cyan">{ACTIVE.map}</span>
                    <span className="tag tag-gold">{ACTIVE.mode}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Prize</div>
                      <div className="gradient-gold" style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, marginTop: 4 }}>${ACTIVE.prize.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Team</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginTop: 4 }}>{ACTIVE.team}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Current</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: placementColor(ACTIVE.placement), marginTop: 4 }}>#{ACTIVE.placement}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link href={`/tournaments/${ACTIVE.id}`} className="btn-primary" style={{ padding: '12px 28px', fontSize: 13 }}>
                      Open Match Hub →
                    </Link>
                    <Link href={`/tournaments/${ACTIVE.id}#leaderboard`} className="btn-outline" style={{ padding: '12px 28px', fontSize: 13 }}>
                      Live Leaderboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="card-glass animate-fade-up" style={{ padding: 24, animationDelay: '0.1s' }}>
              <h3 style={{ fontSize: 14, marginBottom: 16, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ACTIONS.map(a => (
                  <Link key={a.href} href={a.href} className="dash-action" style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 14px', borderRadius: 8,
                    background: 'rgba(2, 5, 10, 0.4)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}>
                    <span aria-hidden style={{ fontSize: 22 }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{a.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.desc}</div>
                    </div>
                    <span aria-hidden style={{ color: 'var(--gold)' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent matches table */}
          <div className="card-glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <h3 style={{ fontSize: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Recent Matches</h3>
              <Link href="/profile/matches" style={{ fontSize: 13, color: 'var(--gold-bright)', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                View All →
              </Link>
            </div>

            <div style={{ overflowX: 'auto', margin: '0 -8px' }} className="no-scrollbar">
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Tournament', 'Map', 'Place', 'Kills', 'Points', 'Date'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '12px 8px',
                        fontSize: 11, color: 'var(--text-muted)',
                        textTransform: 'uppercase', letterSpacing: '0.14em',
                        fontFamily: 'var(--font-heading)', fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT.map(r => (
                    <tr key={r.id} className="dash-row-hover" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 8px', fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600 }}>{r.title}</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span className="tag tag-cyan">{r.map}</span>
                      </td>
                      <td style={{ padding: '14px 8px', fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: placementColor(r.placement) }}>
                        #{r.placement}
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: 14, color: 'var(--text)' }}>{r.kills}</td>
                      <td style={{ padding: '14px 8px', fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--cyan-bright)' }}>{r.pts}</td>
                      <td style={{ padding: '14px 8px', fontSize: 13, color: 'var(--text-muted)' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .dash-action:hover {
          background: rgba(15, 27, 46, 0.8) !important;
          border-color: var(--gold) !important;
          transform: translateX(2px);
        }
        .dash-row-hover:hover { background: rgba(15, 27, 46, 0.4); }
        @media (max-width: 1024px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .dash-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
