'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', gameUid: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px',
      background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%), var(--bg-base)' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, letterSpacing: '0.06em' }}>
            BATTLE<span style={{ color: 'var(--gold)' }}>ZONE</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>Join the tournament platform</div>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Create Account</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'username', label: 'Username', placeholder: 'YourGamerTag', type: 'text' },
              { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
              { key: 'gameUid', label: 'PUBG UID', placeholder: '5xxxxxxxxx (optional)', type: 'text' },
              { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input className="input" type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={set(f.key)} />
              </div>
            ))}
            <button className="btn btn-gold" style={{ marginTop: 8, width: '100%' }}>Create Account</button>
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }}/>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Already have an account? </span>
            <Link href="/auth/login" style={{ color: 'var(--gold)', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
