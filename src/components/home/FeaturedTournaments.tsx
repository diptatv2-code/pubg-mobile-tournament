'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Tournament {
  id: string
  title: string
  prize_pool: number
  registered_teams: number
  max_teams: number
  status: string
  map: string
  game_mode: string
  format: string
  starts_at: string
}

const ACCENT_COLORS = ['gold', 'cyan', 'red'] as const
type Accent = typeof ACCENT_COLORS[number]

const accentStyles: Record<Accent, { bar: string; bg: string; border: string }> = {
  gold: {
    bar: 'linear-gradient(90deg, #E5C76B, #C8A951, #FF8C00)',
    bg: 'linear-gradient(135deg, rgba(200,169,81,0.12), rgba(15,27,46,0.8) 60%)',
    border: 'rgba(200, 169, 81, 0.3)',
  },
  cyan: {
    bar: 'linear-gradient(90deg, #5BE9FF, #00D4FF, #007FA3)',
    bg: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(15,27,46,0.8) 60%)',
    border: 'rgba(0, 212, 255, 0.3)',
  },
  red: {
    bar: 'linear-gradient(90deg, #FF6B6B, #FF4444, #CC0000)',
    bg: 'linear-gradient(135deg, rgba(255,68,68,0.12), rgba(15,27,46,0.8) 60%)',
    border: 'rgba(255, 68, 68, 0.3)',
  },
}

export default function FeaturedTournaments({ tournaments }: { tournaments: Tournament[] }) {
  const hasFeatured = tournaments && tournaments.length > 0

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>FEATURED BATTLES</div>
          <h2 className="heading-section">
            Active <span className="gradient-gold">Tournaments</span>
          </h2>
          <p style={{ marginTop: 16, color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '16px auto 0' }}>
            Join the biggest battles happening right now
          </p>
        </motion.div>

        {hasFeatured ? (
          <div className="grid-tournaments">
            {tournaments.map((t, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]
              const style = accentStyles[accent]
              const fillPct = t.max_teams > 0 ? Math.round((t.registered_teams / t.max_teams) * 100) : 0

              return (
                <motion.article
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="card-glass"
                  style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Top accent bar */}
                  <div aria-hidden style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: style.bar, zIndex: 2,
                  }} />

                  {/* Banner */}
                  <div style={{
                    height: 120, background: style.bg,
                    position: 'relative', overflow: 'hidden',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div className="hex-bg" style={{ opacity: 0.8 }} />
                    <div style={{
                      position: 'absolute', top: 14, left: 18,
                      fontFamily: 'var(--font-heading)', fontSize: 11,
                      color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em',
                    }}>{t.format?.replace('_', ' ')}</div>
                    <div style={{
                      position: 'absolute', bottom: 10, right: 18,
                      fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 700,
                      color: 'rgba(255,255,255,0.04)', textTransform: 'uppercase',
                      lineHeight: 0.85, letterSpacing: '-0.04em',
                    }}>{t.map}</div>
                    <div style={{ position: 'absolute', top: 14, right: 14 }}>
                      {t.status === 'ongoing' && <span className="tag-live">● LIVE</span>}
                      {t.status === 'registration_open' && <span className="tag-open">OPEN</span>}
                    </div>
                  </div>

                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{t.title}</h3>

                    {/* Prize */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
                      <span className="gradient-gold" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, lineHeight: 1,
                      }}>৳{(t.prize_pool ?? 0).toLocaleString()}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Prize Pool</span>
                    </div>

                    {/* Teams progress */}
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>Teams</span>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700 }}>
                          {t.registered_teams}<span style={{ color: 'var(--text-muted)' }}>/{t.max_teams}</span>
                        </span>
                      </div>
                      <div className="progress-track">
                        <div
                          className={'progress-fill' + (fillPct >= 85 ? ' progress-fill-hot' : fillPct >= 50 ? ' progress-fill-warn' : '')}
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                      <span className="tag tag-cyan">{t.map}</span>
                      <span className="tag tag-gold">{t.game_mode}</span>
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {t.status === 'ongoing' ? '● Live Now' : t.starts_at ? new Date(t.starts_at).toLocaleDateString() : 'TBA'}
                      </span>
                      <Link href={`/tournaments/${t.id}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>
                        {t.status === 'ongoing' ? 'Watch Live' : 'Register →'}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '72px 24px', textAlign: 'center',
              background: 'rgba(15, 27, 46, 0.4)',
              border: '1px dashed var(--border)',
              borderRadius: 16,
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.6 }}>🏆</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Tournaments Coming Soon
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 420, margin: '0 auto 28px' }}>
              We&apos;re setting up epic battles. Check back soon or be the first to register!
            </p>
            <Link href="/auth/register" className="btn-primary">
              Register Now →
            </Link>
          </motion.div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/tournaments" className="btn-secondary">Browse All Tournaments →</Link>
        </div>
      </div>
    </section>
  )
}
