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

type Form = { username: string; email: string; pubgUid: string; password: string }

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({ username: '', email: '', pubgUid: '', password: '' })
  const [show, setShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [tooltip, setTooltip] = useState(false)
  const router = useRouter()

  const update = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
          pubg_uid: form.pubgUid,
        }
      }
    })
    if (authError) {
      setError(authError.message)
      setSubmitting(false)
      return
    }
    setDone(true)
    setSubmitting(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '40% 60%',
      background: 'var(--bg-base)',
    }} className="reg-grid">
      {/* LEFT panel */}
      <aside style={{
        position: 'relative',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,212,255,0.12), transparent 60%), linear-gradient(180deg, rgba(15,27,46,0.95), rgba(4,8,16,1))',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(40px, 6vw, 80px) clamp(32px, 4vw, 64px)',
        overflow: 'hidden',
      }} className="reg-aside">
        <div className="hex-bg" aria-hidden />

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
              border: '1px dashed var(--border-cyan)', animation: 'spin 60s linear infinite',
            }} />
            <PubgCharacter />
          </div>
          <div style={{ textAlign: 'center', maxWidth: 380 }}>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginBottom: 12 }}>
              Join the <span className="gradient-cyan">Elite</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
              Forge your legend. Compete with 127,000+ players in the world&apos;s most competitive PUBG Mobile tournaments.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
          © 2026 PUBGMOBILETOURNAMENT
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </aside>

      {/* RIGHT panel */}
      <main style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
      }} className="reg-main">
        <div className="card-glass animate-fade-up" style={{
          width: '100%', maxWidth: 480, padding: 'clamp(28px, 4vw, 44px)',
        }}>
          <div style={{ marginBottom: 28 }}>
            <div className="section-eyebrow section-eyebrow-cyan">CREATE ACCOUNT</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 8 }}>
              Forge Your <span className="gradient-cyan">Legend</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>
                Sign in →
              </Link>
            </p>
          </div>

          {done ? (
            <div role="status" style={{
              padding: 20, background: 'rgba(34,214,122,0.1)',
              border: '1px solid rgba(34,214,122,0.3)', borderRadius: 8,
              color: 'var(--green)', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.04em',
            }}>
              ✓ Account created! Check your email to confirm your account, then{' '}
              <Link href="/auth/login" style={{ color: 'var(--gold-bright)' }}>sign in</Link>.
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label htmlFor="username" style={labelStyle}>Username</label>
                <input
                  id="username"
                  className="input"
                  type="text"
                  required
                  minLength={3}
                  maxLength={20}
                  placeholder="ShadowSniper"
                  value={form.username}
                  onChange={update('username')}
                />
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="commander@battlezone.gg"
                  value={form.email}
                  onChange={update('email')}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <label htmlFor="pubgUid" style={{ ...labelStyle, marginBottom: 0 }}>PUBG UID</label>
                  <button
                    type="button"
                    onClick={() => setTooltip(t => !t)}
                    onMouseEnter={() => setTooltip(true)}
                    onMouseLeave={() => setTooltip(false)}
                    aria-label="What is PUBG UID?"
                    style={{
                      position: 'relative',
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'rgba(0,212,255,0.15)',
                      border: '1px solid var(--border-cyan)',
                      color: 'var(--cyan)',
                      fontSize: 10, fontFamily: 'var(--font-heading)', fontWeight: 700,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      lineHeight: 1, padding: 0,
                    }}
                  >
                    ?
                    {tooltip && (
                      <span role="tooltip" style={{
                        position: 'absolute', left: 24, top: -4, zIndex: 5,
                        whiteSpace: 'nowrap',
                        padding: '8px 14px', borderRadius: 6,
                        background: 'rgba(2,5,10,0.95)',
                        border: '1px solid var(--border-cyan)',
                        color: 'var(--text)', fontSize: 11, fontWeight: 500,
                        fontFamily: 'var(--font-body)', letterSpacing: 'normal', textTransform: 'none',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      }}>Your in-game unique ID (8-10 digits)</span>
                    )}
                  </button>
                </div>
                <input
                  id="pubgUid"
                  className="input"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{8,12}"
                  placeholder="5512387401"
                  value={form.pubgUid}
                  onChange={update('pubgUid')}
                />
              </div>

              <div>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    className="input"
                    type={show ? 'text' : 'password'}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={update('password')}
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

              <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--gold-bright)' }}>Terms</Link> and{' '}
                <Link href="/privacy" style={{ color: 'var(--gold-bright)' }}>Privacy Policy</Link>.
                You must be 13 or older to compete.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', padding: '14px 32px', fontSize: 14, marginTop: 4, opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Creating Account…' : 'Create Account →'}
              </button>
            </form>
          )}
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .reg-grid { grid-template-columns: 1fr !important; }
          .reg-aside { display: none !important; }
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
