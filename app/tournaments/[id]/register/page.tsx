'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Users, Swords } from 'lucide-react'

export default function RegisterTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = use(params)
  const router = useRouter()
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (teamName.trim().length < 3) { setError('Team name must be at least 3 characters'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournament_id: tournamentId, name: teamName.trim() }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to register'); setLoading(false); return }
    router.push(`/tournaments/${tournamentId}?registered=true`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#040810' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Swords size={48} className="mx-auto mb-3" style={{ color: '#C8A951' }} />
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Register Your Team</h1>
          <p style={{ color: '#6B7A99', marginTop: '0.5rem' }}>You will be the team captain</p>
        </div>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Team Name"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Team Alpha"
                error={error}
                required
                helperText="3-30 characters. Visible to all participants."
              />
              <Button type="submit" isLoading={loading} className="w-full mt-2">
                <Trophy size={16} className="mr-2" /> Register Team
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
