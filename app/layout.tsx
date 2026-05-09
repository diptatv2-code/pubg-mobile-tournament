import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PUBG MOBILE TOURNAMENT',
  description: 'Free community-tier PUBG Mobile tournament management platform for Bangladesh and South Asia',
  keywords: ['PUBG Mobile', 'tournament', 'esports', 'Bangladesh'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#040810', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
