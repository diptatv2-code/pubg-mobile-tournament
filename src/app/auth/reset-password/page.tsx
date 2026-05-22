'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => { window.location.href = '/dashboard' }, 2000)
  }

  if (done) return (
    <div className="min-h-screen grid place-items-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-surface)] text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="font-display text-2xl font-bold uppercase">Password Updated!</h1>
        <p className="text-[var(--color-muted)] text-sm mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen grid place-items-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">New Password</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Choose a strong new password</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>New Password</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" className="pl-9" required />
            </div>
          </div>
          <div>
            <Label>Confirm Password</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
              <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" className="pl-9" required />
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}
