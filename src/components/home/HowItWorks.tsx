'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { n: '01', title: 'Register', desc: 'Create your free account and verify your PUBG Mobile UID. Takes less than 60 seconds.', icon: '📝' },
  { n: '02', title: 'Form Squad', desc: 'Build your team of 4 elite players. Invite friends or find teammates in the lobby.', icon: '👥' },
  { n: '03', title: 'Battle', desc: 'Receive encrypted room codes at match time. Fight across Erangel, Miramar, Sanhok & more.', icon: '⚔️' },
  { n: '04', title: 'Win Prizes', desc: 'Climb the leaderboard with real-time scoring. Winners receive prizes directly via bKash.', icon: '🏆' },
]

export default function HowItWorks() {
  return (
    <section className="section" style={{
      background: 'linear-gradient(180deg, transparent, rgba(10,16,32,0.6), transparent)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
    }}>
      <div className="dot-grid" aria-hidden />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="section-eyebrow section-eyebrow-cyan" style={{ justifyContent: 'center' }}>HOW IT WORKS</div>
          <h2 className="heading-section">
            From Register to <span className="gradient-cyan">Champion</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
          position: 'relative',
        }}>
          {/* Connecting line */}
          <div aria-hidden className="how-line" style={{
            position: 'absolute',
            top: 48, left: '12%', right: '12%', height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold-dim) 20%, var(--gold) 50%, var(--gold-dim) 80%, transparent)',
            opacity: 0.4, zIndex: 0,
          }} />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="hex-step"
                style={{ margin: '0 auto 24px' }}
              >
                <span>{s.icon}</span>
              </motion.div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700,
                color: 'var(--gold-dim)', letterSpacing: '0.2em', marginBottom: 8,
              }}>STEP {s.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .how-line { display: none !important; }
        }
        @media (max-width: 1024px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
