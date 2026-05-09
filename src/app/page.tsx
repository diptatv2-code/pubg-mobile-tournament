import Link from 'next/link'
import PubgCharacter from '@/components/pubg/PubgCharacter'
import AnimatedCounter from '@/components/home/AnimatedCounter'
import NewsTicker from '@/components/home/NewsTicker'
import LiveTicker from '@/components/home/LiveTicker'

const FEATURED = [
  {
    id: '1',
    title: 'PMGC Qualifier Series — Asia',
    prize: 10000,
    teams: 112,
    max: 128,
    status: 'live',
    map: 'Erangel',
    mode: 'Squad TPP',
    format: 'Group → Knockout',
    accent: 'red',
  },
  {
    id: '2',
    title: 'Asia Open Championship 2026',
    prize: 5000,
    teams: 48,
    max: 64,
    status: 'open',
    map: 'Miramar',
    mode: 'Squad FPP',
    format: 'Single Elimination',
    accent: 'gold',
    countdown: 'Starts in 4D 12H',
  },
  {
    id: '3',
    title: 'Weekday Warriors #48',
    prize: 500,
    teams: 22,
    max: 32,
    status: 'upcoming',
    map: 'Sanhok',
    mode: 'Squad TPP',
    format: 'Battle Royale',
    accent: 'cyan',
    countdown: 'May 10 · 8 PM',
  },
] as const

const HOW_STEPS = [
  { n: '01', title: 'Register', desc: 'Create your free account and verify your PUBG Mobile UID. Takes less than 60 seconds.' },
  { n: '02', title: 'Form Team', desc: 'Build your squad of 4 elite players. Invite friends or join the open lobby.' },
  { n: '03', title: 'Compete', desc: 'Receive encrypted room codes at match time. Battle it out across iconic maps.' },
  { n: '04', title: 'Win Prizes', desc: 'Real-time scoring. Automatic payouts. Transparent leaderboard. Glory awaits.' },
]

const STATS = [
  { label: 'Tournaments', value: 2847, prefix: '', suffix: '+', color: 'var(--gold-bright)' },
  { label: 'Players', value: 127493, prefix: '', suffix: '', color: 'var(--cyan-bright)' },
  { label: 'Distributed', value: 1.2, prefix: '$', suffix: 'M', decimals: 1, color: 'var(--gold)' },
  { label: 'Countries', value: 42, prefix: '', suffix: '', color: 'var(--green)' },
]

const accentBar = (a: 'red' | 'gold' | 'cyan') =>
  a === 'red'
    ? 'linear-gradient(90deg, #FF4444, #FF8C00)'
    : a === 'gold'
      ? 'linear-gradient(90deg, #E5C76B, #C8A951, #FF8C00)'
      : 'linear-gradient(90deg, #5BE9FF, #00D4FF, #007FA3)'

const accentMap = (a: 'red' | 'gold' | 'cyan') =>
  a === 'red'
    ? 'linear-gradient(135deg, rgba(255,68,68,0.18), rgba(15,27,46,0.7) 60%)'
    : a === 'gold'
      ? 'linear-gradient(135deg, rgba(200,169,81,0.18), rgba(15,27,46,0.7) 60%)'
      : 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(15,27,46,0.7) 60%)'

export default function HomePage() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ============ HERO ============ */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-h))',
        paddingTop: 'calc(var(--header-h) + 32px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        {/* Hex grid bg */}
        <div className="hex-bg" aria-hidden />
        {/* Glow orbs */}
        <div aria-hidden style={{
          position: 'absolute', top: '20%', right: '8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,81,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '10%', left: '0%',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{
          position: 'relative', zIndex: 2, flex: 1,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center',
          paddingTop: 32, paddingBottom: 64,
        }}>
          {/* LEFT: Headline + CTAs + Stats */}
          <div className="hero-left animate-fade-up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 600,
              color: 'var(--cyan)', letterSpacing: '0.22em', textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              <span aria-hidden style={{ color: 'var(--gold-bright)', fontSize: 16 }}>⊕</span>
              Official Tournament Platform
            </div>

            <h1 className="heading-display" style={{ marginBottom: 24 }}>
              <span style={{ display: 'block', color: 'var(--text)' }}>Battle for</span>
              <span className="gradient-gold" style={{ display: 'block' }}>Supremacy</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'var(--text-secondary)',
              maxWidth: 560, marginBottom: 36, lineHeight: 1.7,
            }}>
              Join <strong style={{ color: 'var(--gold-bright)' }}>127,000+</strong> players competing in PUBG Mobile tournaments worldwide. Real-time scoring, encrypted rooms, automatic payouts.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/tournaments" className="btn-primary" style={{ fontSize: 15, padding: '16px 36px' }}>
                Join Tournament →
              </Link>
              <Link href="/tournaments/create" className="btn-secondary" style={{ fontSize: 15, padding: '16px 36px' }}>
                Host Your Own
              </Link>
            </div>

            {/* Inline stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 40,
              paddingTop: 32, borderTop: '1px solid var(--border)', justifyContent: 'start',
            }}>
              {[
                { v: 2847, l: 'Tournaments', c: 'var(--gold-bright)' },
                { v: 127493, l: 'Players', c: 'var(--cyan-bright)' },
                { v: 1.2, l: 'Prize Money', c: 'var(--gold)', prefix: '$', suffix: 'M', decimals: 1 },
              ].map(s => (
                <div key={s.l}>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: 30, fontWeight: 700,
                    color: s.c, lineHeight: 1, letterSpacing: '-0.01em',
                  }}>
                    <AnimatedCounter to={s.v} prefix={s.prefix ?? ''} suffix={s.suffix ?? '+'} decimals={s.decimals ?? 0} />
                  </div>
                  <div style={{
                    fontSize: 11, color: 'var(--text-muted)', marginTop: 6,
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                    fontFamily: 'var(--font-heading)', fontWeight: 600,
                  }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Character */}
          <div className="hero-right" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'relative',
          }}>
            {/* Decorative concentric rings */}
            <div aria-hidden style={{
              position: 'absolute', width: 460, height: 460, borderRadius: '50%',
              border: '1px solid var(--border)', boxShadow: '0 0 80px rgba(200,169,81,0.12) inset',
            }} />
            <div aria-hidden style={{
              position: 'absolute', width: 360, height: 360, borderRadius: '50%',
              border: '1px dashed var(--border-strong)',
              animation: 'spin 60s linear infinite',
            }} />
            <PubgCharacter />
          </div>
        </div>

        {/* News ticker bottom */}
        <NewsTicker />
      </section>

      {/* ============ LIVE NOW ============ */}
      <LiveTicker />

      {/* ============ FEATURED TOURNAMENTS ============ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>FEATURED</div>
            <h2 className="heading-section underline-gold underline-gold-center" style={{ display: 'inline-block' }}>
              Featured <span className="gradient-gold">Tournaments</span>
            </h2>
            <p style={{ marginTop: 18, color: 'var(--text-secondary)', fontSize: 16 }}>
              The biggest battles happening right now and coming up
            </p>
          </div>

          <div className="grid-tournaments">
            {FEATURED.map((t, i) => (
              <article
                key={t.id}
                className="card-glass border-glow animate-fade-up"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Top accent bar */}
                <div aria-hidden style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: accentBar(t.accent),
                  zIndex: 2,
                }} />

                {/* Banner with map watermark */}
                <div style={{
                  height: 110,
                  background: accentMap(t.accent),
                  position: 'relative',
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div aria-hidden className="hex-grid" style={{ opacity: 0.6 }} />
                  <div style={{
                    position: 'absolute', top: 16, left: 20,
                    fontFamily: 'var(--font-heading)', fontSize: 11,
                    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em',
                  }}>{t.format}</div>
                  <div style={{
                    position: 'absolute', bottom: 12, right: 20,
                    fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)', textTransform: 'uppercase', lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                  }}>{t.map}</div>
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    {t.status === 'live' && <span className="tag-live">LIVE</span>}
                    {t.status === 'open' && <span className="tag-open">OPEN</span>}
                    {t.status === 'upcoming' && <span className="tag-upcoming">UPCOMING</span>}
                  </div>
                </div>

                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.25 }}>{t.title}</h3>

                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700,
                      lineHeight: 1, letterSpacing: '-0.02em',
                    }} className="gradient-gold">${t.prize.toLocaleString()}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Prize Pool</span>
                  </div>

                  {/* Team progress */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>Teams</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                        {t.teams}<span style={{ color: 'var(--text-muted)' }}>/{t.max}</span>
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        className={
                          'progress-fill' +
                          (t.teams / t.max >= 0.85 ? ' progress-fill-hot' : t.teams / t.max >= 0.5 ? ' progress-fill-warn' : '')
                        }
                        style={{ width: `${Math.round((t.teams / t.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Pills */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                    <span className="tag tag-cyan">{t.map}</span>
                    <span className="tag tag-gold">{t.mode}</span>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {t.status === 'live' ? '● Match in progress' : t.countdown}
                    </span>
                    <Link href={`/tournaments/${t.id}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>
                      {t.status === 'live' ? 'Watch Live' : 'Register'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/tournaments" className="btn-secondary">View All Tournaments →</Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, transparent, rgba(10,16,32,0.6), transparent)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}>
        <div className="dot-grid" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-eyebrow section-eyebrow-cyan" style={{ justifyContent: 'center' }}>HOW IT WORKS</div>
            <h2 className="heading-section">
              From Register to <span className="gradient-cyan">Champion</span>
            </h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
            position: 'relative',
          }}>
            {/* Connecting dashed line */}
            <div aria-hidden style={{
              position: 'absolute',
              top: 44, left: '12%', right: '12%', height: 1,
              backgroundImage: 'linear-gradient(90deg, transparent, var(--gold-dim) 20%, var(--gold) 50%, var(--gold-dim) 80%, transparent)',
              backgroundSize: '12px 1px',
              opacity: 0.5,
              zIndex: 0,
            }} className="how-line" />

            {HOW_STEPS.map((s, i) => (
              <div key={s.n} className="animate-fade-up" style={{
                textAlign: 'center', position: 'relative', zIndex: 1,
                animationDelay: `${i * 0.12}s`,
              }}>
                <div className="hex-step" style={{ margin: '0 auto 20px' }}>
                  <span>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS COUNTERS ============ */}
      <section style={{
        padding: '80px 0',
        background: 'rgba(10, 16, 32, 0.6)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="animate-fade-up" style={{
                textAlign: 'center',
                padding: '24px 16px',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                  fontWeight: 700, color: s.color, lineHeight: 1,
                  letterSpacing: '-0.02em', textShadow: `0 0 30px ${s.color}33`,
                }}>
                  <AnimatedCounter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div style={{
                  marginTop: 14, fontSize: 12, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.18em',
                  fontFamily: 'var(--font-heading)', fontWeight: 600,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section">
        <div className="container">
          <div style={{
            position: 'relative',
            background:
              'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(200,169,81,0.25), transparent 60%), linear-gradient(180deg, rgba(15,27,46,0.95), rgba(10,16,32,0.95))',
            border: '1px solid var(--border-strong)',
            borderRadius: 20,
            padding: 'clamp(48px, 8vw, 96px) 32px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(200,169,81,0.15)',
          }}>
            <div className="hex-grid" aria-hidden style={{ opacity: 0.4 }} />
            <div aria-hidden style={{
              position: 'absolute', top: -100, right: -80,
              width: 360, height: 360, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,169,81,0.18), transparent 70%)',
            }} />
            <div aria-hidden style={{
              position: 'absolute', bottom: -100, left: -60,
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}>JOIN THE BATTLE</div>
              <h2 className="heading-section" style={{ marginBottom: 18, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', textTransform: 'uppercase' }}>
                Ready to <span className="gradient-gold">Dominate?</span>
              </h2>
              <p style={{
                color: 'var(--text-secondary)', fontSize: 17, maxWidth: 580,
                margin: '0 auto 36px', lineHeight: 1.7,
              }}>
                Free to register. Free to compete. Earn real prizes by climbing the global leaderboard.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/auth/register" className="btn-primary" style={{ fontSize: 16, padding: '18px 40px' }}>
                  Create Free Account
                </Link>
                <Link href="/tournaments" className="btn-secondary" style={{ fontSize: 16, padding: '18px 40px' }}>
                  Browse Tournaments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page-scoped responsive helpers */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          .hero-left, .hero-right { grid-column: 1 / -1; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 768px) {
          .grid-tournaments { grid-template-columns: 1fr !important; }
          .how-line { display: none !important; }
          section .section,
          section[class~="section"] { padding: 56px 0; }
        }
      `}</style>
    </div>
  )
}
