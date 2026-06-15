import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rules — PUBG Mobile Tournament',
  description: 'Official tournament rules and regulations for PUBG Mobile Tournament platform.',
}

const RULES = [
  {
    title: 'General Rules',
    icon: '📋',
    items: [
      'All players must register with their real PUBG Mobile UID and in-game name.',
      'Players must be at least 16 years old to participate.',
      'One account per player — multi-accounting results in permanent ban.',
      'All communication must be respectful. Toxic behavior leads to disqualification.',
      'Tournament organizers have final say on all disputes.',
    ],
  },
  {
    title: 'Match Rules',
    icon: '⚔️',
    items: [
      'Teams must join the room within 5 minutes of room code distribution.',
      'Late entries will NOT be accommodated — your slot will be forfeited.',
      'All matches are played on the official PUBG Mobile app (latest version).',
      'Emulators are NOT allowed unless specifically stated by the tournament.',
      'Screen recording may be required for verification purposes.',
    ],
  },
  {
    title: 'Fair Play Policy',
    icon: '⚖️',
    items: [
      'Any form of hacking, modding, or exploiting is strictly prohibited.',
      'Use of third-party tools (aimbots, wallhacks, ESP) results in permanent ban.',
      'Teaming with opponents (collusion) is not allowed.',
      'Stream sniping is prohibited in all tournaments.',
      'Suspicious gameplay will be reviewed and may result in disqualification.',
    ],
  },
  {
    title: 'Scoring System',
    icon: '📊',
    items: [
      'Points are awarded based on placement and kills.',
      'Default scoring: 1st place = 15 pts, 2nd = 12 pts, 3rd = 10 pts (varies by tournament).',
      'Each kill = 1 point (unless tournament specifies otherwise).',
      'WWCD (Winner Winner Chicken Dinner) bonus may apply.',
      'Final standings are determined by total points across all matches.',
    ],
  },
  {
    title: 'Prize Distribution',
    icon: '💰',
    items: [
      'Prizes are distributed via bKash within 24-48 hours of tournament completion.',
      'Winners must provide valid bKash number for prize collection.',
      'Prize distribution breakdown is shown on each tournament page.',
      'Disqualified teams forfeit all prize money.',
      'Minimum withdrawal amount: ৳50.',
    ],
  },
  {
    title: 'Team Requirements',
    icon: '👥',
    items: [
      'Squad mode: 4 players required (no substitutes during match).',
      'Duo mode: 2 players required.',
      'Solo mode: Individual participation only.',
      'Team captain is responsible for all team communications.',
      'Team name must be appropriate — offensive names will be rejected.',
    ],
  },
]

export default function RulesPage() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <section style={{
        padding: '80px 0 60px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>REGULATIONS</div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Tournament <span className="gradient-gold">Rules</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Fair play is our foundation. Read and understand these rules before competing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {RULES.map((section, i) => (
              <div key={i} className="card-glass" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-dim))',
                  opacity: 0.5,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{section.icon}</span>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>{section.title}</h2>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7,
                      paddingLeft: 4,
                    }}>
                      <span style={{
                        color: 'var(--gold)', fontSize: 10, marginTop: 7,
                        flexShrink: 0,
                      }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 48, padding: 24, textAlign: 'center',
            background: 'rgba(255, 68, 68, 0.06)',
            border: '1px solid rgba(255, 68, 68, 0.2)',
            borderRadius: 12,
          }}>
            <p style={{ color: 'var(--red-bright)', fontSize: 14, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.06em' }}>
              ⚠️ Violation of any rules may result in temporary or permanent ban from the platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
