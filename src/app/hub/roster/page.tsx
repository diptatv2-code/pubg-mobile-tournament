import RosterManager from './RosterManager'

export const metadata = { title: 'Roster Management | Player Hub' }

export default function RosterPage() {
  return (
    <div className="hub-page">
      <div className="hub-page-header">
        <h1 className="hub-page-title">Roster Management</h1>
        <p className="hub-page-subtitle">Manage your team lineup — add players, assign roles, and lock the roster before tournaments.</p>
      </div>
      <RosterManager />
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
