'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TournamentStatusBadge } from '@/components/ui/badge'
import { Trophy, Users, Save } from 'lucide-react'

const RANK_TIERS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown', 'Ace', 'Conqueror']
const RANK_COLORS: Record<string, string> = {
  Bronze: '#CD7F32', Silver: '#9CA3AF', Gold: '#C8A951', Platinum: '#00D4FF',
  Diamond: '#818CF8', Crown: '#F59E0B', Ace: '#EF4444', Conqueror: '#FF6B35'
}

interface Profile { id: string; display_name: string; pubg_uid: string | null; rank_tier: string; role: string; avatar_url: string | null }

export default function ProfileClient({ profile: initialProfile, teams, roster, email }: {
  profile: Profile | null; teams: Record<string, unknown>[]; roster: Record<string, unknown>[]; email: string
}) {
  const [profile, setProfile] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ display_name: initialProfile?.display_name || '', pubg_uid: initialProfile?.pubg_uid || '', rank_tier: initialProfile?.rank_tier || 'Bronze' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const supabase = createClient()

  const handleSave = async () => {
    setSaving(true)
    const { data, error } = await supabase.from('profiles').update({ display_name: form.display_name, pubg_uid: form.pubg_uid || null, rank_tier: form.rank_tier }).eq('id', profile?.id || '').select().single()
    if (error) { setMsg(error.message); setSaving(false); return }
    setProfile(data)
    setEditing(false)
    setMsg('Profile updated!')
    setSaving(false)
  }

  const rankColor = RANK_COLORS[profile?.rank_tier || 'Bronze'] || '#C8A951'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="p-8 rounded-2xl mb-8" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
        <div className="flex items-start gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0" style={{ backgroundColor: '#0A1020', border: `2px solid ${rankColor}`, color: rankColor, fontFamily: 'Rajdhani, sans-serif' }}>
            {profile?.display_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>{profile?.display_name}</h1>
            <p className="text-sm" style={{ color: '#6B7A99' }}>{email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(200,169,81,0.1)', color: rankColor, border: `1px solid ${rankColor}40` }}>
                🏆 {profile?.rank_tier}
              </span>
              <span className="text-sm" style={{ color: '#6B7A99' }}>UID: {profile?.pubg_uid || 'Not set'}</span>
            </div>
          </div>
          <Button variant={editing ? 'ghost' : 'outline'} onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : '✏️ Edit Profile'}
          </Button>
        </div>

        {editing && (
          <div className="mt-6 pt-6 border-t flex flex-col gap-4" style={{ borderColor: '#1A2A4A' }}>
            <Input label="Display Name" value={form.display_name} onChange={e => setForm(p => ({ ...p, display_name: e.target.value }))} />
            <Input label="PUBG Mobile UID" value={form.pubg_uid} onChange={e => setForm(p => ({ ...p, pubg_uid: e.target.value }))} placeholder="Your in-game UID" />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Rank Tier</label>
              <div className="flex flex-wrap gap-2">
                {RANK_TIERS.map(tier => (
                  <button key={tier} onClick={() => setForm(p => ({ ...p, rank_tier: tier }))}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: form.rank_tier === tier ? RANK_COLORS[tier] + '20' : '#0A1020', color: form.rank_tier === tier ? RANK_COLORS[tier] : '#6B7A99', border: `1px solid ${form.rank_tier === tier ? RANK_COLORS[tier] : '#1A2A4A'}` }}>
                    {tier}
                  </button>
                ))}
              </div>
            </div>
            {msg && <p className="text-sm" style={{ color: '#00D4FF' }}>{msg}</p>}
            <Button onClick={handleSave} isLoading={saving}><Save size={16} className="mr-2" /> Save Changes</Button>
          </div>
        )}
        {msg && !editing && <p className="mt-4 text-sm" style={{ color: '#00D4FF' }}>{msg}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* My Teams */}
        <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
          <h2 className="font-bold text-lg mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>
            <Trophy size={18} className="inline mr-2" style={{ color: '#C8A951' }} /> My Teams
          </h2>
          {teams.length === 0 ? (<p className="text-sm" style={{ color: '#6B7A99' }}>No teams yet.</p>) : (
            <div className="space-y-3">
              {teams.map(team => {
                const tournament = team.tournaments as Record<string, unknown>
                return (
                  <div key={team.id as string} className="p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                    <div className="font-medium text-sm" style={{ color: '#E8EAF0' }}>{team.name as string}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: '#6B7A99' }}>{tournament?.name as string}</span>
                      <TournamentStatusBadge status={tournament?.status as string} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Playing As */}
        <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
          <h2 className="font-bold text-lg mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>
            <Users size={18} className="inline mr-2" style={{ color: '#C8A951' }} /> Playing In
          </h2>
          {roster.length === 0 ? (<p className="text-sm" style={{ color: '#6B7A99' }}>Not in any team roster.</p>) : (
            <div className="space-y-3">
              {roster.map(r => {
                const team = r.teams as Record<string, unknown>
                const tournament = team?.tournaments as Record<string, unknown>
                return (
                  <div key={r.id as string} className="p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                    <div className="font-medium text-sm" style={{ color: '#E8EAF0' }}>{team?.name as string}</div>
                    <div className="text-xs" style={{ color: '#6B7A99' }}>{tournament?.name as string}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
