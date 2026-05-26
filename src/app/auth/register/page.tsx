'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PubgCharacter from '@/components/pubg/PubgCharacter'

type Form = { username: string; email: string; pubgUid: string; password: string }

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({ username: '', email: '', pubgUid: '', password: '' })
  const [show, setShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tooltip, setTooltip] = useState(false)
  const router = useRouter()

  const update = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        username: form.username,
        pubg_uid: form.pubgUid,
      }),
    })
    const data = await res.json()

    if (!res.ok || data.error) {
      setError(data.error || 'Registration failed')
      setSubmitting(false)
      return
    }

    // Account created (autoconfirm=true) — redirect to login with success banner
    router.push('/auth/login?registered=1')
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
            <PubgCharacter />
          </div>
          <div style={{ textAlign: 'center', maxWidth: 380 }}>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginBottom: 12 }}>
              Join the <span className="gradient-gold">Arena</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
              Create your account and start competing in PUBG Mobile tournaments worldwide.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
          © 2026 PUBGMOBILETOURNAMENT
        </div>
      </aside>

      {/* RIGHT — Form */}
      <main style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
      }} className="reg-main">
        <div className="card-glass animate-fade-up" style={{
          width: '100%', maxWidth: 460, padding: 'clamp(28px, 4vw, 44px)',
        }}>
          <div style={{ marginBottom: 32 }}>
            <div className="section-eyebrow">CREATE ACCOUNT</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 8 }}>
              Join the <span className="gradient-gold">Tournament</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>
                Sign in →
              </Link>
            </p>
          </div>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label htmlFor="username" style={labelStyle}>Username</label>
              <input
                id="username"
                className="input"
                type="text"
                required
                minLength={3}
                maxLength={20}
                placeholder="YourGamerTag"
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
                placeholder="player@example.com"
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
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12, padding: 0 }}
                  aria-label="What is PUBG UID?"
                >
                  ?
                </button>
              </div>
              {tooltip && (
                <div style={{
                  marginBottom: 8, padding: '8px 12px', borderRadius: 6,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  fontSize: 12, color: 'var(--text-secondary)',
                }}>
                  Find your UID in PUBG Mobile → Profile → ID shown below your name
                </div>
              )}
              <input
                id="pubgUid"
                className="input"
                type="text"
                placeholder="e.g. 5123456789"
                value={form.pubgUid}
                onChange={update('pubgUid')}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  className="input"
                  type={show ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min 8 characters"
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

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ width: '100%', padding: '14px 32px', fontSize: 14, marginTop: 4, opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>
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
