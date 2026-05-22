import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account — PUBG Mobile Tournament',
  description: 'Join the tournament community',
  robots: { index: false, follow: false },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
