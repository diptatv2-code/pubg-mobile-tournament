'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Trophy, LogIn } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }
    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#040810' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy size={48} style={{ color: '#C8A951' }} />
          </div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Welcome Back</h1>
          <p style={{ color: '#6B7A99', marginTop: '0.5rem' }}>Sign in to PUBG MOBILE TOURNAMENT</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            {error && <p className="text-sm text-center" style={{ color: '#FF4444' }}>{error}</p>}
            <Button type="submit" isLoading={loading} className="w-full mt-2">
              <LogIn size={16} className="mr-2" /> Sign In
            </Button>
          </form>
          <p className="text-center mt-4 text-sm" style={{ color: '#6B7A99' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" style={{ color: '#00D4FF' }}>Register here</Link>
          </p>
          <form action={logout} className="text-center mt-2">
            <button type="submit" className="text-xs hover:underline" style={{ color: '#6B7A99' }}>
              Sign out of an existing session
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>
}
