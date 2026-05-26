import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Tournaments — PUBG Mobile Tournament',
  description: 'Find and join PUBG Mobile esports tournaments. Compete, climb the leaderboard, and represent your squad.',
}

export default function TournamentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
