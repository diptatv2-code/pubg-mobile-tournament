import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'BattleZone — PUBG Mobile Tournaments',
  description: 'Professional PUBG Mobile tournament platform. Host and join competitive esports tournaments worldwide.',
  keywords: 'PUBG Mobile, tournament, esports, battle royale, competitive gaming',
  openGraph: {
    title: 'BattleZone — PUBG Mobile Tournaments',
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
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
