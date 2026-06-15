'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/winners', label: 'Winners' },
  { href: '/rules', label: 'Rules' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [liveCount, setLiveCount] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase
      .from('tournaments')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'ongoing')
      .then(({ count }) => setLiveCount(count || 0))
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [menuOpen])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (pathname != null && pathname.startsWith(href + '/'))

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(4, 8, 16, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200, 169, 81, 0.15)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            gap: 24,
          }}
        >
          {/* LOGO */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
            aria-label="PUBG Mobile Tournament — home"
          >
            <div
              aria-hidden
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                background: 'linear-gradient(135deg, #C8A951, #8B7536)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1,
                boxShadow: '0 0 12px rgba(200, 169, 81, 0.4)',
                flexShrink: 0,
              }}
            >
              ⊕
            </div>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#E8E8E8',
                whiteSpace: 'nowrap',
              }}
            >
              PUBGMOBILE
              <span style={{ color: '#C8A951' }}>TOURNAMENT</span>
            </span>
          </Link>

          {/* NAV */}
          <nav
            className="header-desktop-nav"
            style={{ alignItems: 'center', gap: 4 }}
            aria-label="Primary"
          >
            {NAV_LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-nav-link${active ? ' is-active' : ''}`}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? '#C8A951' : '#6B7280',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {liveCount !== null && liveCount > 0 && (
              <div
                className="header-live-badge"
                aria-label={`${liveCount} live tournament${liveCount !== 1 ? 's' : ''}`}
                style={{
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(255, 68, 68, 0.12)',
                  border: '1px solid rgba(255, 68, 68, 0.3)',
                  color: '#FF4444',
                  padding: '4px 12px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#FF4444',
                    boxShadow: '0 0 8px #FF4444',
                    animation: 'pulseRed 1.4s ease-in-out infinite',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {liveCount} Live
              </div>
            )}

            <Link
              href="/tournaments"
              className="btn-primary header-play-btn"
              style={{ fontSize: 13, padding: '10px 22px' }}
            >
              Play Now
            </Link>

            <button
              type="button"
              className="header-hamburger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              style={{
                width: 40,
                height: 40,
                background: 'transparent',
                border: '1px solid rgba(200, 169, 81, 0.3)',
                borderRadius: 4,
                cursor: 'pointer',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: 0,
              }}
            >
              <span aria-hidden style={{ width: 18, height: 2, background: '#C8A951', display: 'block' }} />
              <span aria-hidden style={{ width: 18, height: 2, background: '#C8A951', display: 'block' }} />
              <span aria-hidden style={{ width: 18, height: 2, background: '#C8A951', display: 'block' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(4, 8, 16, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 44,
            height: 44,
            background: 'transparent',
            border: '1px solid rgba(200, 169, 81, 0.3)',
            borderRadius: 4,
            color: '#C8A951',
            fontSize: 28,
            lineHeight: 1,
            cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          ×
        </button>

        {NAV_LINKS.map(link => {
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: active ? '#C8A951' : '#E8E8E8',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          )
        })}

        <Link
          href="/tournaments"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ marginTop: 8 }}
        >
          Play Now
        </Link>
      </div>

      <style>{`
        .header-desktop-nav { display: flex; }
        .header-live-badge { display: inline-flex; }
        .header-hamburger { display: none; }

        .header-nav-link::after {
          content: '';
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 2px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C8A951, transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          box-shadow: 0 0 6px rgba(200, 169, 81, 0.5);
        }
        .header-nav-link:hover { color: #ffffff !important; }
        .header-nav-link:hover::after { transform: scaleX(1); }
        .header-nav-link.is-active::after { transform: scaleX(1); }

        @media (max-width: 900px) {
          .header-desktop-nav { display: none !important; }
          .header-live-badge { display: none !important; }
          .header-play-btn { display: none !important; }
          .header-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
