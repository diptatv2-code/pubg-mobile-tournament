'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AnimatedCounter from '@/components/home/AnimatedCounter'
import { supabase } from '@/lib/supabase'

interface StatItem {
  label: string
  value: number
  color: string
  icon: string
  prefix?: string
}

interface ActiveTournament {
  id: string
  title: string
  prize: number
  map: string
  mode: string
  nextMatchIn: string
  team: string
  placement: number
}

interface RecentMatch {
  id: string
  title: string
  placement: number
  kills: number
  pts: number
  date: string
  map: string
}

const ACTIONS = [
  { href: '/tournaments', label: 'Browse Tournaments', desc: 'Find your next battle', icon: '🎯' },
  { href: '/tournaments/create', label: 'Host Tournament', desc: 'Run your own event', icon: '🏟️' },
  { href: '/hub/roster', label: 'Manage Team', desc: 'Update roster and tactics', icon: '👥' },
  { href: '/hub/wallet', label: 'Wallet', desc: 'Deposits, withdrawals & history', icon: '💼' },
]

function placementColor(p: number): string {
  if (p === 1) return 'var(--gold-bright)'
  if (p === 2) return '#C0C0C0'
  if (p === 3) return '#CD7F32'
  return 'var(--text-secondary)'
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Tournaments Played', value: 0, color: 'var(--gold-bright)', icon: '🎮' },
    { label: 'Total Wins', value: 0, color: 'var(--cyan-bright)', icon: '🏆' },
    { label: 'Total Kills', value: 0, color: 'var(--red-bright)', icon: '⚔️' },
    { label: 'Wallet Balance', value: 0, prefix: '$', color: 'var(--green)', icon: '💰' },
  ])
  const [active, setActive] = useState<ActiveTournament | null>(null)
  const [recent, setRecent] = useState<RecentMatch[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }

        const userId = user.id

        // Fetch profile (for future use)
        await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        // Fetch user's teams with tournaments
        const { data: myTeams } = await supabase
          .from('teams')
          .select('*, tournaments(*)')
          .eq('captain_id', userId)

        const teamIds = (myTeams || []).map((t: any) => t.id)

        // Fetch recent match results
        let recentResults: any[] = []
        if (teamIds.length > 0) {
          const { data: resultsData } = await supabase
            .from('match_results')
            .select('*, matches(*, tournaments(*))')
            .in('team_id', teamIds)
            .order('created_at', { ascending: false })
            .limit(5)
          recentResults = resultsData || []
        }

        // Compute stats
        const totalPlayed = recentResults.length
        const totalWins = recentResults.filter((r: any) => r.placement === 1).length
        const totalKills = recentResults.reduce((sum: number, r: any) => sum + (r.kills || 0), 0)

        // Wallet balance from wallet_transactions
        const { data: walletTxns } = await supabase
          .from('wallet_transactions')
          .select('amount')
          .eq('user_id', userId)
        const walletBalance = (walletTxns || []).reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0)

        setStats([
          { label: 'Tournaments Played', value: totalPlayed, color: 'var(--gold-bright)', icon: '🎮' },
          { label: 'Total Wins', value: totalWins, color: 'var(--cyan-bright)', icon: '🏆' },
          { label: 'Total Kills', value: totalKills, color: 'var(--red-bright)', icon: '⚔️' },
          { label: 'Wallet Balance', value: Math.max(0, walletBalance), prefix: '$', color: 'var(--green)', icon: '💰' },
        ])

        // Active tournament: find first ongoing team tournament
        const activeTeam = (myTeams || []).find(
          (t: any) => t.tournaments && (t.tournaments.status === 'ongoing' || t.tournaments.status === 'active')
        )
        if (activeTeam) {
          setActive({
            id: activeTeam.tournament_id || activeTeam.tournaments?.id || '',
            title: activeTeam.tournaments?.title || 'Active Tournament',
            prize: activeTeam.tournaments?.prize_pool || 0,
            map: activeTeam.tournaments?.map || 'Erangel',
            mode: activeTeam.tournaments?.mode || 'Squad TPP',
            nextMatchIn: '—',
            team: activeTeam.name || 'Your Team',
            placement: 0,
          })
        }

        // Recent matches
        const mapped: RecentMatch[] = recentResults.map((r: any, idx: number) => ({
          id: r.id || String(idx),
          title: r.matches?.tournaments?.title || r.matches?.title || 'Match',
          placement: r.placement || 0,
          kills: r.kills || 0,
          pts: r.total_points || r.points || 0,
          date: r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—',
          map: r.matches?.tournaments?.map || r.matches?.map || '—',
        }))
        setRecent(mapped)
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className='p-8 text-center text-[var(--color-muted)]' style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

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
                Last sign-in: Today · Rank #— globally
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
            {stats.map((s, i) => (
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
                  {active ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <span className="live-badge">ACTIVE NOW</span>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
                          color: 'var(--orange)', letterSpacing: '0.14em', textTransform: 'uppercase',
                        }}>
                          Next match in {active.nextMatchIn}
                        </span>
                      </div>

                      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{active.title}</h2>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                        <span className="tag tag-cyan">{active.map}</span>
                        <span className="tag tag-gold">{active.mode}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Prize</div>
                          <div className="gradient-gold" style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, marginTop: 4 }}>${active.prize.toLocaleString()}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Team</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginTop: 4 }}>{active.team}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-heading)' }}>Current</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: placementColor(active.placement), marginTop: 4 }}>
                            {active.placement > 0 ? `#${active.placement}` : '—'}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <Link href={`/tournaments/${active.id}`} className="btn-primary" style={{ padding: '12px 28px', fontSize: 13 }}>
                          Open Match Hub →
                        </Link>
                        <Link href={`/tournaments/${active.id}#leaderboard`} className="btn-outline" style={{ padding: '12px 28px', fontSize: 13 }}>
                          Live Leaderboard
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '24px 0', textAlign: 'center' }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No Active Tournament</div>
                      <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>Join a tournament to see your active match here.</div>
                      <Link href="/tournaments" className="btn-primary" style={{ padding: '12px 28px', fontSize: 13 }}>
                        Browse Tournaments →
                      </Link>
                    </div>
                  )}
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
              <Link href="/hub/schedule" style={{ fontSize: 13, color: 'var(--gold-bright)', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                View All →
              </Link>
            </div>

            {recent.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                No recent matches yet.
              </div>
            ) : (
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
                    {recent.map(r => (
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
            )}
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
