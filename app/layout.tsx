import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export const metadata: Metadata = {
  title: 'PUBG MOBILE TOURNAMENT',
  description: 'Free community-tier PUBG Mobile tournament platform for Bangladesh and South Asia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#040810', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingBottom: '80px' }}>{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}
