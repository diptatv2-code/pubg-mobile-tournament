'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface Invite {
  id: string
  team_id: string
  inviter_id: string
  status: string
  created_at: string
  teams?: { name: string; tournament_id: string }
  inviter?: { username: string; pubg_name: string }
}

export default function InvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvites = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth/login'; return }
      const { data } = await supabase
        .from('team_invites')
        .select('*, teams(name, tournament_id), inviter:inviter_id(username, pubg_name)')
        .eq('invitee_id', user.id)
        .eq('status', 'pending')
      setInvites((data as Invite[]) || [])
      setLoading(false)
    }
    void fetchInvites()
  }, [])

  const respond = async (inviteId: string, teamId: string, accept: boolean) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('team_invites').update({ status: accept ? 'accepted' : 'declined' }).eq('id', inviteId)
    if (accept) {
      await supabase.from('team_members').insert({ team_id: teamId, user_id: user.id, role: 'member', pubg_id: '', pubg_name: '' })
    }
    setInvites(prev => prev.filter(i => i.id !== inviteId))
  }

  if (loading) return <div className="p-8 text-center text-[var(--color-muted)]">Loading...</div>

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight mb-6">Team Invites</h1>
      {invites.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-muted)]">
          No pending invites
        </div>
      ) : (
        <div className="space-y-4">
          {invites.map(inv => (
            <div key={inv.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">{inv.teams?.name ?? 'Unknown Team'}</p>
                <p className="text-sm text-[var(--color-muted)] mt-1">Invited by {inv.inviter?.username ?? 'Unknown'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={() => void respond(inv.id, inv.team_id, true)}>Accept</Button>
                <Button variant="outline" size="sm" onClick={() => void respond(inv.id, inv.team_id, false)}>Decline</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
