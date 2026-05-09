'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ backgroundColor: '#040810' }}>
      <div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '4rem', fontWeight: 700, color: '#FF4444' }}>Error</div>
        <p className="mt-2 mb-6" style={{ color: '#6B7A99' }}>Something went wrong. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>Try Again</button>
          <Link href="/" className="px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: '#0F1B2E', border: '1px solid #1A2A4A', color: '#E8EAF0' }}>Go Home</Link>
        </div>
      </div>
    </div>
  )
}
