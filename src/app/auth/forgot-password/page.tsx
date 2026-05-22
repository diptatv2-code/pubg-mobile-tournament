'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <div className="min-h-screen grid place-items-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center">
        <div className="text-4xl mb-4">📧</div>
        <h1 className="font-display text-2xl font-bold uppercase mb-2">Check Your Email</h1>
        <p className="text-[var(--color-muted)] text-sm">We sent a password reset link to <strong>{email}</strong></p>
        <a href="/auth/login" className="mt-6 inline-block text-sm text-[var(--color-primary)] hover:underline">Back to Login</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen grid place-items-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">Reset Password</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Enter your email to receive a reset link</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="player@example.com" className="pl-9" required />
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--color-muted)]">Remember it? <a href="/auth/login" className="text-[var(--color-primary)] hover:underline">Sign in</a></p>
      </div>
    </div>
  )
}
