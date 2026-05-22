'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PubgCharacter from '@/components/pubg/PubgCharacter'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setSubmitting(false)
      return
    }
    setDone(true)
    setSubmitting(false)
    router.push('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      background: 'var(--bg-base)',
    }} className="login-grid">
      {/* LEFT — Dark panel */}
      <aside style={{
        position: 'relative',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200,169,81,0.15), transparent 60%), linear-gradient(180deg, rgba(15,27,46,0.95), rgba(4,8,16,1))',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(40px, 6vw, 80px) clamp(32px, 4vw, 64px)',
        overflow: 'hidden',
      }} className="login-aside">
        <div className="hex-bg" aria-hidden />
        <div aria-hidden style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -10%)',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" className="bz-logo">
            <span aria-hidden style={{ color: 'var(--gold-bright)', fontSize: 22 }}>⊕</span>
            <span style={{
              fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              <span className="gradient-gold">PUBG</span>
              <span style={{ color: 'var(--text)' }}>MOBILE</span>
            </span>
          </Link>
        </div>

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1, gap: 32,
        }}>
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{
              position: 'absolute', inset: -40, borderRadius: '50%',
              border: '1px dashed var(--border-strong)', animation: 'spin 60s linear infinite',
            }} />
            <PubgCharacter />
          </div>
          <div style={{ textAlign: 'center', maxWidth: 380 }}>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginBottom: 12 }}>
              Enter the <span className="gradient-gold">Battleground</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
              Sign in to manage your teams, register for tournaments, and climb the global leaderboard.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
          © 2026 PUBGMOBILETOURNAMENT
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </aside>

      {/* RIGHT — Form panel */}
      <main style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
        position: 'relative',
      }} className="login-main">
        <div className="card-glass animate-fade-up" style={{
          width: '100%', maxWidth: 460, padding: 'clamp(28px, 4vw, 44px)',
        }}>
          <div style={{ marginBottom: 32 }}>
            <div className="section-eyebrow">SIGN IN</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 8 }}>
              Welcome <span className="gradient-gold">Back</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              New here?{' '}
              <Link href="/auth/register" style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>
                Create an account →
              </Link>
            </p>
          </div>

          {done ? (
            <div role="status" style={{
              padding: 20, background: 'rgba(34,214,122,0.1)',
              border: '1px solid rgba(34,214,122,0.3)', borderRadius: 8,
              color: 'var(--green)', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.04em',
            }}>
              ✓ Signed in successfully. Redirecting…
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="commander@battlezone.gg"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  <Link href="/auth/forgot-password" style={{ fontSize: 12, color: 'var(--cyan)', textDecoration: 'none' }}>Forgot?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    className="input"
                    type={show ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: 56 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', padding: 8, fontSize: 12,
                      fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}
                  >{show ? 'Hide' : 'Show'}</button>
                </div>
              </div>

              {error && (
                <div role="alert" style={{
                  padding: '12px 16px', borderRadius: 6,
                  background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)',
                  color: '#ff6666', fontSize: 13,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', padding: '14px 32px', fontSize: 14, marginTop: 4, opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Signing in…' : 'Sign In →'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.18em', fontFamily: 'var(--font-heading)' }}>OR</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              <button type="button" className="btn-outline" style={{ width: '100%', padding: '12px 24px', fontSize: 13 }}>
                Continue with Google
              </button>
              <button type="button" className="btn-outline" style={{ width: '100%', padding: '12px 24px', fontSize: 13 }}>
                Continue with Discord
              </button>
            </form>
          )}
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .login-aside { display: none !important; }
        }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 8,
  fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 600,
  color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.14em',
}
