'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px',
      background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 60%), var(--bg-base)' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, letterSpacing: '0.06em' }}>
            BATTLE<span style={{ color: 'var(--gold)' }}>ZONE</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>Sign in to your account</div>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Welcome Back</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Email</label>
              <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Password</label>
              <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-gold" style={{ marginTop: 8, width: '100%' }}>Sign In</button>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }}/>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Don&apos;t have an account? </span>
            <Link href="/auth/register" style={{ color: 'var(--gold)', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Create one →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
