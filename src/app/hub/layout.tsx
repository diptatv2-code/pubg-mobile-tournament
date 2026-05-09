import Link from 'next/link'
import type { ReactNode } from 'react'

const NAV_ITEMS = [
  { href: '/hub/roster', label: 'Roster', icon: '👥', emoji: true },
  { href: '/hub/wallet', label: 'Wallet', icon: '💰', emoji: true },
  { href: '/hub/live', label: 'Live', icon: '🔴', emoji: true },
  { href: '/hub/leaderboard', label: 'Leaderboard', icon: '🏆', emoji: true },
  { href: '/hub/schedule', label: 'Schedule', icon: '📅', emoji: true },
]

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="hub-layout">
      {/* Hub Header */}
      <header className="hub-header">
        <div className="hub-header-inner">
          <span className="hub-logo">⚡ Player Hub</span>
          <span className="hub-player-name">Welcome, Player</span>
        </div>
      </header>

      <div className="hub-body">
        {/* Sidebar — desktop only */}
        <aside className="hub-sidebar hide-mobile">
          <nav aria-label="Hub navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hub-nav-link"
              >
                <span className="hub-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="hub-main">{children}</main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="hub-mobile-tabs show-mobile" aria-label="Hub mobile navigation">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="hub-tab-item">
            <span className="hub-tab-icon">{item.icon}</span>
            <span className="hub-tab-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <style>{`
        .hub-layout {
          min-height: 100vh;
          background: var(--bg-base, #040810);
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .hub-header {
          background: var(--bg-surface, #0A1020);
          border-bottom: 1px solid var(--border, rgba(200,169,81,0.15));
          position: sticky;
          top: 72px;
          z-index: 40;
        }
        .hub-header-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hub-logo {
          font-family: var(--font-heading, 'Rajdhani', sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gold, #C8A951);
          letter-spacing: 0.05em;
        }
        .hub-player-name {
          font-size: 0.875rem;
          color: var(--text-secondary, #B5BCC9);
        }

        /* Body */
        .hub-body {
          flex: 1;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          padding: 24px 24px 80px;
          gap: 24px;
        }

        /* Sidebar */
        .hub-sidebar {
          width: 220px;
          flex-shrink: 0;
        }
        .hub-sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: sticky;
          top: calc(72px + 56px + 24px);
        }
        .hub-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: var(--radius-md, 10px);
          color: var(--text-secondary, #B5BCC9);
          text-decoration: none;
          font-size: 0.9375rem;
          font-family: var(--font-body, 'Barlow', sans-serif);
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          border: 1px solid transparent;
        }
        .hub-nav-link:hover {
          background: var(--bg-card, #0F1B2E);
          color: var(--text, #E8E8E8);
          border-color: var(--border, rgba(200,169,81,0.15));
        }
        .hub-nav-icon {
          font-size: 1.1rem;
          width: 24px;
          text-align: center;
        }

        /* Main */
        .hub-main {
          flex: 1;
          min-width: 0;
        }

        /* Mobile tabs */
        .hub-mobile-tabs {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--bg-surface, #0A1020);
          border-top: 1px solid var(--border, rgba(200,169,81,0.15));
          display: flex;
          justify-content: space-around;
          padding: 6px 0 env(safe-area-inset-bottom, 0);
        }
        .hub-tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 8px;
          text-decoration: none;
          color: var(--text-secondary, #B5BCC9);
          min-width: 56px;
          font-size: 0.6875rem;
          font-family: var(--font-body, 'Barlow', sans-serif);
        }
        .hub-tab-icon { font-size: 1.25rem; }
        .hub-tab-label { line-height: 1; }

        /* Responsive visibility helpers */
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
          .hub-body { padding-left: 16px; padding-right: 16px; padding-bottom: 80px; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
