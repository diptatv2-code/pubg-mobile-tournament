import Link from 'next/link'
import { Trophy } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#040810', borderTop: '1px solid #1A2A4A' }} className="mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy size={20} style={{ color: '#C8A951' }} />
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#6B7A99' }}>PUBG MOBILE TOURNAMENT</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs" style={{ color: '#6B7A99' }}>© 2026 PUBG MOBILE TOURNAMENT. All rights reserved.</p>
            <p className="text-xs" style={{ color: '#4A5A79' }}>Not affiliated with Krafton Inc. or PUBG Mobile.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tournaments" className="text-xs hover:text-white transition-colors" style={{ color: '#6B7A99' }}>Tournaments</Link>
            <Link href="/auth/register" className="text-xs hover:text-white transition-colors" style={{ color: '#6B7A99' }}>Join</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
