'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative',
            background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(200,169,81,0.2), transparent 60%), linear-gradient(180deg, rgba(15,27,46,0.95), rgba(10,16,32,0.95))',
            border: '1px solid var(--border-strong)',
            borderRadius: 20,
            padding: 'clamp(56px, 8vw, 96px) 32px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(200,169,81,0.12)',
          }}
        >
          <div className="hex-bg" aria-hidden style={{ opacity: 0.4 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -100, right: -80,
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,169,81,0.15), transparent 70%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', bottom: -100, left: -60,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>JOIN THE BATTLE</div>
            <h2 className="heading-section" style={{ marginBottom: 18, fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase' }}>
              Ready to <span className="gradient-gold">Dominate?</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: 17, maxWidth: 560,
              margin: '0 auto 36px', lineHeight: 1.7,
            }}>
              Free to register. Free to compete. Climb the leaderboard, win real prizes via bKash, and become the ultimate PUBG Mobile champion.
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
        </motion.div>
      </div>
    </section>
  )
}
