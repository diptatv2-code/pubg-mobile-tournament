import Link from 'next/link'
import { Trophy } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ backgroundColor: '#040810' }}>
      <div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '8rem', fontWeight: 700, color: 'rgba(0,212,255,0.1)', lineHeight: 1 }}>404</div>
        <Trophy size={48} className="mx-auto mb-4" style={{ color: '#C8A951' }} />
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Page Not Found</h1>
        <p className="mt-2 mb-8" style={{ color: '#6B7A99' }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
