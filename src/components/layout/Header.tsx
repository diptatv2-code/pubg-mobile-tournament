'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(6,10,18,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
        {/* Logo */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width:36, height:36, borderRadius:8,
            background: 'linear-gradient(135deg, #f5c518, #e6a800)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'var(--font-display)', fontWeight:900, fontSize:16, color:'#000'
          }}>BZ</div>
          <span style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, letterSpacing:'0.08em', color:'var(--text-primary)' }}>
            BATTLE<span style={{ color:'var(--gold)' }}>ZONE</span>
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display:'flex', alignItems:'center', gap:4 }} className="desktop-nav">
          {[
            { href:'/tournaments', label:'Tournaments' },
            { href:'/leaderboard', label:'Leaderboard' },
            { href:'/dashboard', label:'Dashboard' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              padding:'6px 16px', borderRadius:6, color:'var(--text-secondary)',
              textDecoration:'none', fontSize:14, fontWeight:500, transition:'all 0.2s',
              fontFamily:'var(--font-heading)', letterSpacing:'0.04em', textTransform:'uppercase',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text-primary)'; (e.target as HTMLElement).style.background = 'var(--bg-elevated)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >{item.label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Link href="/auth/login" className="btn btn-ghost btn-sm" style={{ textDecoration:'none', fontFamily:'var(--font-heading)' }}>Login</Link>
          <Link href="/auth/register" className="btn btn-gold btn-sm" style={{ textDecoration:'none' }}>Register</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}
