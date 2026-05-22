import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Tournaments — PUBG Mobile Tournament',
  description: 'Find and join PUBG Mobile esports tournaments. Free entry, real prizes.',
}

export default function TournamentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
