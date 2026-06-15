import { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — PUBG Mobile Tournament',
  description: 'Get in touch with the PUBG Mobile Tournament team.',
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <section style={{
        padding: '80px 0 60px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>GET IN TOUCH</div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Contact <span className="gradient-gold">Us</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Have questions, feedback, or need support? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48 }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, marginBottom: 24, textTransform: 'uppercase' }}>
                Reach Out
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { icon: '📧', label: 'Email', value: 'support@pubgmobiletournament.com', href: 'mailto:support@pubgmobiletournament.com' },
                  { icon: '💬', label: 'Discord', value: 'Join our Discord Server', href: '#' },
                  { icon: '📱', label: 'Facebook', value: 'PUBG Mobile Tournament BD', href: '#' },
                  { icon: '🕐', label: 'Response Time', value: 'Within 24 hours', href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 10,
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ color: 'var(--gold)', fontSize: 15, fontWeight: 500 }}>{item.value}</a>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div style={{ marginTop: 40, padding: 24, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Quick Answers
                </h3>
                {[
                  { q: 'How do I join a tournament?', a: 'Register an account, browse tournaments, and click "Register" on any open tournament.' },
                  { q: 'When do I receive prizes?', a: 'Prizes are sent via bKash within 24-48 hours after tournament completion.' },
                  { q: 'Can I use an emulator?', a: 'No, emulators are not allowed unless specifically stated by the tournament organizer.' },
                ].map((faq, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 16 : 0, paddingBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? '1px solid var(--border-muted)' : 'none' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{faq.q}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
