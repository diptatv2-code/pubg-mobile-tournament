'use client'
import { motion } from 'framer-motion'

interface Props {
  tournamentCount: number
  playerCount: number
}

export default function StatsSection({ tournamentCount, playerCount }: Props) {
  if (tournamentCount === 0 && playerCount === 0) return null

  const stats = [
    { value: tournamentCount, label: 'Tournaments', color: 'var(--gold-bright)', suffix: '+' },
    { value: playerCount, label: 'Registered Players', color: 'var(--cyan-bright)', suffix: '+' },
    { value: 24, label: 'Hours Support', color: 'var(--green)', suffix: '/7' },
  ]

  return (
    <section style={{
      padding: '80px 0',
      background: 'rgba(10, 16, 32, 0.6)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="hex-bg" aria-hidden />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ textAlign: 'center', padding: '24px 16px' }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                fontWeight: 700, color: s.color, lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: `0 0 30px ${s.color}33`,
              }}>
                {s.value}{s.suffix}
              </div>
              <div style={{
                marginTop: 14, fontSize: 12, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.18em',
                fontFamily: 'var(--font-heading)', fontWeight: 600,
              }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
