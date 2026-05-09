'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Trophy, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ display_name: '', email: '', password: '', pubg_uid: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const validate = () => {
    const e: Record<string, string> = {}
    if (formData.display_name.length < 3) e.display_name = 'Minimum 3 characters'
    if (formData.display_name.length > 30) e.display_name = 'Maximum 30 characters'
    if (!formData.email.includes('@')) e.email = 'Invalid email'
    if (formData.password.length < 8) e.password = 'Minimum 8 characters'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setErrors({})
    setLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { display_name: formData.display_name } }
      })
      if (signUpError) { setErrors({ email: signUpError.message }); setLoading(false); return }
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          display_name: formData.display_name,
          pubg_uid: formData.pubg_uid || null,
          role: 'player',
          rank_tier: 'Bronze',
        })
      }
      router.push('/dashboard')
    } catch {
      setErrors({ email: 'Registration failed. Please try again.' })
      setLoading(false)
    }
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#040810' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy size={48} style={{ color: '#C8A951' }} />
          </div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Join the Battle</h1>
          <p style={{ color: '#6B7A99', marginTop: '0.5rem' }}>Create your PUBG MOBILE TOURNAMENT account</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Display Name" value={formData.display_name} onChange={set('display_name')} placeholder="YourGamerTag" error={errors.display_name} required />
            <Input label="Email" type="email" value={formData.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} required />
            <Input label="Password" type="password" value={formData.password} onChange={set('password')} placeholder="Min 8 characters" error={errors.password} required />
            <Input label="PUBG Mobile UID (Optional)" value={formData.pubg_uid} onChange={set('pubg_uid')} placeholder="Your in-game UID" helperText="Find in PUBG Mobile → Profile → UID" />
            <Button type="submit" isLoading={loading} className="w-full mt-2">
              <UserPlus size={16} className="mr-2" /> Create Account
            </Button>
          </form>
          <p className="text-center mt-4 text-sm" style={{ color: '#6B7A99' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#00D4FF' }}>Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
