import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — PUBG Mobile Tournament',
  description: 'Learn about Bangladesh\'s premier PUBG Mobile tournament platform.',
}

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0 60px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>ABOUT US</div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            About <span className="gradient-gold">PUBG Mobile Tournament</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            We are Bangladesh&apos;s dedicated PUBG Mobile competitive gaming platform, built by gamers for gamers.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow">OUR MISSION</div>
              <h2 className="heading-section" style={{ marginBottom: 20 }}>
                Empowering <span className="gradient-cyan">Competitive Gaming</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                We believe every PUBG Mobile player in Bangladesh deserves access to fair, transparent, and exciting tournament experiences. Our platform eliminates the barriers to competitive gaming by providing:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Free tournament registration for community events',
                  'Transparent real-time scoring and leaderboards',
                  'Secure bKash payment integration for prizes',
                  'Encrypted room code delivery system',
                  'Anti-cheat monitoring and fair play enforcement',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 15 }}>
                    <span style={{ color: 'var(--gold-bright)', fontSize: 14 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 48,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div className="hex-bg" aria-hidden />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 72, marginBottom: 20 }}>🎮</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, marginBottom: 12, textTransform: 'uppercase' }}>
                  Built for Gamers
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                  Every feature is designed with the competitive PUBG Mobile community in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'rgba(10,16,32,0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow section-eyebrow-cyan" style={{ justifyContent: 'center' }}>OUR VALUES</div>
            <h2 className="heading-section">What We <span className="gradient-cyan">Stand For</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '⚖️', title: 'Fair Play', desc: 'Every match is monitored. Every score is verified. No tolerance for cheating.' },
              { icon: '🔒', title: 'Security', desc: 'Encrypted room codes, secure payments, and protected player data.' },
              { icon: '🌍', title: 'Community', desc: 'Building a thriving esports ecosystem for Bangladeshi gamers.' },
              { icon: '💰', title: 'Transparency', desc: 'Real-time leaderboards, public prize distributions, and open scoring.' },
              { icon: '🚀', title: 'Innovation', desc: 'Constantly improving with new features, better UX, and faster systems.' },
              { icon: '🤝', title: 'Accessibility', desc: 'Free to join, easy to use, available to every player regardless of skill level.' },
            ].map((v, i) => (
              <div key={i} className="card-glass" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="heading-section" style={{ marginBottom: 16 }}>
            Have Questions?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
            We&apos;d love to hear from you. Reach out anytime.
          </p>
          <a href="/contact" className="btn-primary" style={{ fontSize: 15, padding: '16px 36px' }}>
            Contact Us →
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
