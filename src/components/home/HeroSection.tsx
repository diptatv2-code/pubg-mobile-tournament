'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  tournamentCount: number
  playerCount: number
}

export default function HeroSection({ tournamentCount, playerCount }: Props) {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount1(Math.round(eased * tournamentCount))
      setCount2(Math.round(eased * playerCount))
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [tournamentCount, playerCount])

  return (
    <section style={{
      position: 'relative',
      minHeight: 'calc(100vh - var(--header-h))',
      paddingTop: 'calc(var(--header-h) + 40px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background layers */}
      <div className="hex-bg" aria-hidden />
      <div className="scan-line" aria-hidden />

      {/* Animated glow orbs */}
      <div aria-hidden style={{
        position: 'absolute', top: '15%', right: '5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,81,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
        animation: 'pulse 4s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        animation: 'pulse 5s ease-in-out infinite 1s',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,68,68,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Floating particles */}
      <div className="particles" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.2 + Math.random() * 0.3,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 60,
          alignItems: 'center',
          paddingBottom: 80,
        }}>
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 16px',
                background: 'rgba(200, 169, 81, 0.08)',
                border: '1px solid rgba(200, 169, 81, 0.2)',
                borderRadius: 6,
                marginBottom: 28,
              }}
            >
              <span style={{ color: 'var(--gold-bright)', fontSize: 14 }}>⚔️</span>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700,
                color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                PUBG Mobile Tournament Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="heading-display"
              style={{ marginBottom: 24 }}
            >
              <span style={{ display: 'block', color: 'var(--text)' }}>Battle for</span>
              <span className="gradient-gold" style={{ display: 'block' }}>Glory & Victory</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{
                fontSize: 18, color: 'var(--text-secondary)',
                maxWidth: 540, marginBottom: 40, lineHeight: 1.8,
              }}
            >
              Join Bangladesh&apos;s premier PUBG Mobile tournament platform.
              Compete in squad battles, earn real prizes via bKash, and climb the
              leaderboard to become the ultimate champion.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}
            >
              <Link href="/tournaments" className="btn-primary" style={{ fontSize: 15, padding: '16px 40px' }}>
                🎯 Join Tournament
              </Link>
              <Link href="/auth/register" className="btn-secondary" style={{ fontSize: 15, padding: '16px 40px' }}>
                Create Account
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 48,
                paddingTop: 32, borderTop: '1px solid var(--border)',
                justifyContent: 'start',
              }}
            >
              {(tournamentCount > 0 || playerCount > 0) ? (
                <>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700,
                      color: 'var(--gold-bright)', lineHeight: 1,
                    }}>
                      {count1}+
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--text-muted)', marginTop: 6,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      fontFamily: 'var(--font-heading)', fontWeight: 600,
                    }}>Tournaments</div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700,
                      color: 'var(--cyan-bright)', lineHeight: 1,
                    }}>
                      {count2}+
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--text-muted)', marginTop: 6,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      fontFamily: 'var(--font-heading)', fontWeight: 600,
                    }}>Players</div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700,
                      color: 'var(--green)', lineHeight: 1,
                    }}>
                      24/7
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--text-muted)', marginTop: 6,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      fontFamily: 'var(--font-heading)', fontWeight: 600,
                    }}>Live Support</div>
                  </div>
                </>
              ) : (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: 'rgba(200,169,81,0.08)',
                  border: '1px solid rgba(200,169,81,0.2)',
                  borderRadius: 8,
                }}>
                  <span style={{
                    color: 'var(--gold-bright)', fontSize: 13,
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    🚀 Platform Live — Register Now
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right side - PUBG Character/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-right"
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Concentric rings */}
            <div aria-hidden style={{
              position: 'absolute', width: 420, height: 420, borderRadius: '50%',
              border: '1px solid var(--border)',
              boxShadow: '0 0 60px rgba(200,169,81,0.08) inset',
            }} />
            <div aria-hidden className="animate-spin-slow" style={{
              position: 'absolute', width: 340, height: 340, borderRadius: '50%',
              border: '1px dashed var(--border-strong)',
            }} />
            <div aria-hidden style={{
              position: 'absolute', width: 260, height: 260, borderRadius: '50%',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              animation: 'spin 30s linear infinite reverse',
            }} />

            {/* Central emblem */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 180, height: 180,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(200,169,81,0.15), transparent 70%)',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              <div style={{
                fontSize: 80, lineHeight: 1,
                filter: 'drop-shadow(0 0 20px rgba(200,169,81,0.5))',
              }}>
                🏆
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute', top: '15%', right: '10%',
                padding: '8px 14px',
                background: 'rgba(15, 27, 46, 0.9)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 8,
                fontFamily: 'var(--font-heading)',
                fontSize: 12, fontWeight: 700,
                color: 'var(--cyan-bright)',
                letterSpacing: '0.08em',
              }}
            >
              🎮 SQUAD MODE
            </motion.div>

            <motion.div
              animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', bottom: '20%', left: '5%',
                padding: '8px 14px',
                background: 'rgba(15, 27, 46, 0.9)',
                border: '1px solid rgba(200, 169, 81, 0.3)',
                borderRadius: 8,
                fontFamily: 'var(--font-heading)',
                fontSize: 12, fontWeight: 700,
                color: 'var(--gold-bright)',
                letterSpacing: '0.08em',
              }}
            >
              💰 bKash PRIZES
            </motion.div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute', bottom: '10%', right: '15%',
                padding: '8px 14px',
                background: 'rgba(15, 27, 46, 0.9)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                borderRadius: 8,
                fontFamily: 'var(--font-heading)',
                fontSize: 12, fontWeight: 700,
                color: 'var(--red-bright)',
                letterSpacing: '0.08em',
              }}
            >
              🔥 LIVE NOW
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-right { display: none !important; }
          div[style*="gridTemplateColumns: '1.2fr 1fr'"],
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hero-stats-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
