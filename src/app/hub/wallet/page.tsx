import WalletDashboard from './WalletDashboard'

export const metadata = { title: 'Wallet | Player Hub' }

export default function WalletPage() {
  return (
    <div className="hub-page">
      <div className="hub-page-header">
        <h1 className="hub-page-title">Digital Wallet</h1>
        <p className="hub-page-subtitle">Manage your tournament funds — deposit, withdraw, and track transactions.</p>
      </div>
      <WalletDashboard />
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
