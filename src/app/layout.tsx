import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

export const metadata: Metadata = {
  title: 'PUBGMOBILETOURNAMENT — World-Class PUBG Mobile Tournaments',
  description:
    'The official PUBG Mobile esports tournament platform. Host, join, and compete in professional tournaments with real-time scoring, encrypted rooms, and global leaderboards.',
  keywords: 'PUBG Mobile, tournament, esports, battle royale, competitive gaming, PMGC',
  openGraph: {
    title: 'PUBGMOBILETOURNAMENT — World-Class PUBG Mobile Tournaments',
    description: 'Professional PUBG Mobile tournament platform',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}
