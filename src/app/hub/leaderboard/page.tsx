import LeaderboardViewer from './LeaderboardViewer'

export const metadata = { title: 'Leaderboard | Player Hub' }

export default function LeaderboardPage() {
  return (
    <div className="hub-page">
      <div className="hub-page-header">
        <h1 className="hub-page-title">Leaderboard</h1>
        <p className="hub-page-subtitle">Live tournament rankings — auto-refreshes every 30 seconds.</p>
      </div>
      <LeaderboardViewer />
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
