import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — PUBG Mobile Tournament',
  description: 'Sign in to your tournament account',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
