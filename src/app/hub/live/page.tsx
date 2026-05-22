import LiveEventDashboard from './LiveEventDashboard'

export const metadata = { title: 'Live Event | Player Hub' }

export default function LivePage() {
  return (
    <div className="hub-page">
      <div className="hub-page-header">
        <h1 className="hub-page-title">Live Event</h1>
        <p className="hub-page-subtitle">Room code, match status, and live event details for your current tournament.</p>
      </div>
      <LiveEventDashboard />
      <style>{`
        .hub-page { padding: 0; }
        .hub-page-header { margin-bottom: 24px; }
        .hub-page-title {
          font-family: var(--font-heading, 'Rajdhani', sans-serif);
          font-size: 2rem; font-weight: 700;
          color: var(--text, #E8E8E8);
          text-transform: uppercase; letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        .hub-page-subtitle { font-size: 0.9rem; color: var(--text-secondary, #B5BCC9); }
      `}</style>
    </div>
  )
}
