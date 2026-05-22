import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

export const metadata: Metadata = {
  metadataBase: new URL('https://pubgmobiletournament.com'),
  title: 'PUBGMOBILETOURNAMENT — World-Class PUBG Mobile Tournaments',
  // BUG-14: Changed "official" to "community-run"
  description:
    'The community-run PUBG Mobile tournament platform. Host, join, and compete in professional tournaments with real-time scoring, encrypted rooms, and global leaderboards.',
  keywords: 'PUBG Mobile, tournament, esports, battle royale, competitive gaming, PMGC',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'PUBGMOBILETOURNAMENT — World-Class PUBG Mobile Tournaments',
    description: 'Community-run PUBG Mobile tournament platform',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PUBG Mobile Tournament' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUBGMOBILETOURNAMENT — World-Class PUBG Mobile Tournaments',
    description: 'Community-run PUBG Mobile tournament platform',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* BUG-30: Preconnect to Supabase API */}
        <link rel="preconnect" href="https://api.diptait.com.bd" />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
