'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge, TournamentStatusBadge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Trophy, Users, Swords, Key, BarChart2, ChevronRight, Plus, Send, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Team { id: string; name: string; status: string; profiles: { display_name: string } }
interface Match { id: string; round: number; match_number: number; status: string; scheduled_at: string | null; room_code_encrypted: string | null }
interface Tournament { id: string; name: string; status: string; max_teams: number; start_date: string; registration_deadline: string; map: string; perspective: string; scoring_matrix: { placement: number[]; kill_points: number; wwcd_bonus: number } }

interface Props { tournament: Tournament; teams: Team[]; matches: Match[] }

export default function ManageClient({ tournament, teams, matches: initialMatches }: Props) {
  const [tab, setTab] = useState<'overview' | 'teams' | 'matches' | 'scores'>('overview')
  const [matches, setMatches] = useState(initialMatches)
  const [creating, setCreating] = useState(false)
  const [scoreEntry, setScoreEntry] = useState<{ matchId: string; results: Array<{ teamId: string; placement: number; kills: number; isWWCD: boolean }> } | null>(null)
  const [msg, setMsg] = useState('')
  const [loadingAction, setLoadingAction] = useState('')

  const handleStatusChange = async (newStatus: string) => {
    setLoadingAction('status')
    const res = await fetch(`/api/tournaments/${tournament.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
    if (res.ok) { setMsg(`Status updated to ${newStatus}`); setTimeout(() => window.location.reload(), 800) }
    else { const d = await res.json(); setMsg(d.error || 'Failed') }
    setLoadingAction('')
  }

  const createMatch = async (round: number) => {
    setCreating(true)
    const res = await fetch('/api/matches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tournament_id: tournament.id, round, match_number: matches.filter(m => m.round === round).length + 1 }) })
    if (res.ok) { const d = await res.json(); setMatches(prev => [...prev, d.match]); setMsg('Match created') }
    else { const d = await res.json(); setMsg(d.error || 'Failed to create match') }
    setCreating(false)
  }

  const distributeRoomCode = async (matchId: string, roomId: string, password: string) => {
    const res = await fetch(`/api/matches/${matchId}/room-code`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roomId, password, tournamentId: tournament.id }) })
    if (res.ok) { setMsg('Room code distributed to all teams!'); setTimeout(() => window.location.reload(), 1000) }
    else { const d = await res.json(); setMsg(d.error || 'Failed') }
  }

  const submitScores = async () => {
    if (!scoreEntry) return
    setLoadingAction('scores')
    const res = await fetch(`/api/matches/${scoreEntry.matchId}/results`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ results: scoreEntry.results.map(r => ({ ...r, survivalTimeSeconds: 1800 })), tournamentId: tournament.id }) })
    if (res.ok) { setMsg('Scores saved!'); setScoreEntry(null); setTimeout(() => window.location.reload(), 800) }
    else { const d = await res.json(); setMsg(d.error || 'Failed') }
    setLoadingAction('')
  }

  const TABS = [{ id: 'overview', icon: Trophy, label: 'Overview' }, { id: 'teams', icon: Users, label: `Teams (${teams.length})` }, { id: 'matches', icon: Swords, label: `Matches (${matches.length})` }, { id: 'scores', icon: BarChart2, label: 'Scores' }] as const

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Manage: {tournament.name}</h1>
          <TournamentStatusBadge status={tournament.status} />
        </div>
        <a href={`/tournaments/${tournament.id}`} className="text-sm" style={{ color: '#6B7A99' }}>← Public view</a>
      </div>

      {msg && <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>{msg} <button onClick={() => setMsg('')} className="ml-2 text-xs opacity-70">✕</button></div>}

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ backgroundColor: '#0A1020' }}>
        {TABS.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id as typeof tab)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
            style={{ backgroundColor: tab === id ? '#0F1B2E' : 'transparent', color: tab === id ? '#E8EAF0' : '#6B7A99', border: tab === id ? '1px solid #1A2A4A' : 'none' }}>
            <Icon size={16} /> <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[{ label: 'Teams', value: `${teams.length}/${tournament.max_teams}`, color: '#00D4FF' }, { label: 'Matches', value: matches.length, color: '#C8A951' }, { label: 'Map', value: `${tournament.map} · ${tournament.perspective}`, color: '#6B7A99' }].map(({ label, value, color }) => (
              <div key={label} className="p-5 rounded-xl text-center" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.75rem', fontWeight: 700, color }}>{value}</div>
                <div className="text-sm" style={{ color: '#6B7A99' }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>Tournament Status</h3>
            <div className="flex flex-wrap gap-3">
              {tournament.status === 'registration_open' && (<Button onClick={() => handleStatusChange('started')} isLoading={loadingAction === 'status'} variant="primary">⚡ Start Tournament</Button>)}
              {tournament.status === 'started' && (<Button onClick={() => handleStatusChange('completed')} isLoading={loadingAction === 'status'} variant="outline">✅ Mark Complete</Button>)}
              {tournament.status !== 'cancelled' && (<Button onClick={() => handleStatusChange('cancelled')} isLoading={loadingAction === 'status'} variant="danger">Cancel Tournament</Button>)}
            </div>
          </div>
        </div>
      )}

      {/* Teams Tab */}
      {tab === 'teams' && (
        <div className="space-y-3">
          {teams.length === 0 ? (<p style={{ color: '#6B7A99' }}>No teams registered yet.</p>) : teams.map(team => (
            <div key={team.id} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
              <div>
                <div className="font-semibold" style={{ color: '#E8EAF0' }}>{team.name}</div>
                <div className="text-sm" style={{ color: '#6B7A99' }}>Captain: {team.profiles?.display_name}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>{team.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Matches Tab */}
      {tab === 'matches' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm" style={{ color: '#6B7A99' }}>Create and manage matches. Set room codes for each match.</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => createMatch(1)} isLoading={creating}><Plus size={14} className="mr-1" /> Round 1</Button>
              <Button size="sm" variant="secondary" onClick={() => createMatch(2)} isLoading={creating}><Plus size={14} className="mr-1" /> Round 2</Button>
            </div>
          </div>
          {matches.length === 0 ? (<div className="text-center py-12" style={{ color: '#6B7A99' }}><Swords size={40} className="mx-auto mb-3" style={{ color: '#1A2A4A' }} /><p>No matches yet. Create your first match!</p></div>) : (
            <div className="space-y-3">
              {matches.map(match => (
                <MatchCard key={match.id} match={match} teams={teams} tournamentId={tournament.id}
                  onRoomCode={distributeRoomCode}
                  onScoreEntry={(matchId) => setScoreEntry({ matchId, results: teams.map((t, i) => ({ teamId: t.id, placement: i + 1, kills: 0, isWWCD: i === 0 })) })}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scores Tab */}
      {tab === 'scores' && (
        <div>
          <p className="mb-6" style={{ color: '#6B7A99' }}>Select a match from the Matches tab to enter scores, or view the full leaderboard.</p>
          <a href={`/tournaments/${tournament.id}/leaderboard`} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: '#0F1B2E', border: '1px solid #C8A951', color: '#C8A951' }}>
            <BarChart2 size={16} /> View Live Leaderboard <ChevronRight size={16} />
          </a>

          {scoreEntry && (
            <div className="mt-6 p-6 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>Enter Match Scores</h3>
              <div className="space-y-3 mb-4">
                {scoreEntry.results.map((r, i) => {
                  const team = teams.find(t => t.id === r.teamId)
                  return (
                    <div key={r.teamId} className="grid grid-cols-4 gap-3 items-center p-3 rounded-lg" style={{ backgroundColor: '#040810' }}>
                      <div className="text-sm font-medium" style={{ color: '#E8EAF0' }}>{team?.name}</div>
                      <input type="number" min="1" max={teams.length} value={r.placement}
                        onChange={e => setScoreEntry(prev => prev ? { ...prev, results: prev.results.map((x, j) => j === i ? { ...x, placement: parseInt(e.target.value) || 1 } : x) } : null)}
                        className="px-3 py-1.5 rounded text-center text-sm" style={{ backgroundColor: '#0A1020', border: '1px solid #1A2A4A', color: '#E8EAF0' }} placeholder="Place" />
                      <input type="number" min="0" value={r.kills}
                        onChange={e => setScoreEntry(prev => prev ? { ...prev, results: prev.results.map((x, j) => j === i ? { ...x, kills: parseInt(e.target.value) || 0 } : x) } : null)}
                        className="px-3 py-1.5 rounded text-center text-sm" style={{ backgroundColor: '#0A1020', border: '1px solid #1A2A4A', color: '#E8EAF0' }} placeholder="Kills" />
                      <label className="flex items-center gap-2 text-sm" style={{ color: '#6B7A99' }}>
                        <input type="checkbox" checked={r.isWWCD} onChange={e => setScoreEntry(prev => prev ? { ...prev, results: prev.results.map((x, j) => j === i ? { ...x, isWWCD: e.target.checked } : x) } : null)} />
                        WWCD
                      </label>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-3">
                <Button onClick={submitScores} isLoading={loadingAction === 'scores'}><CheckCircle size={16} className="mr-2" /> Submit Scores</Button>
                <Button variant="ghost" onClick={() => setScoreEntry(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MatchCard({ match, teams, tournamentId, onRoomCode, onScoreEntry }: {
  match: Match; teams: Team[]; tournamentId: string;
  onRoomCode: (matchId: string, roomId: string, password: string) => void;
  onScoreEntry: (matchId: string) => void
}) {
  const [showRoomForm, setShowRoomForm] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [roomPw, setRoomPw] = useState('')
  const statusIcon = match.status === 'completed' ? <CheckCircle size={16} style={{ color: '#4ade80' }} /> : match.status === 'in_progress' ? <Clock size={16} style={{ color: '#00D4FF' }} /> : <Clock size={16} style={{ color: '#6B7A99' }} />
  return (
    <div className="p-4 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {statusIcon}
          <div>
            <div className="font-semibold" style={{ color: '#E8EAF0' }}>Round {match.round} · Match {match.match_number}</div>
            {match.scheduled_at && <div className="text-xs" style={{ color: '#6B7A99' }}>{formatDate(match.scheduled_at)}</div>}
          </div>
        </div>
        <div className="flex gap-2">
          {match.status !== 'completed' && (
            <>
              <Button size="sm" variant="secondary" onClick={() => setShowRoomForm(!showRoomForm)}><Key size={14} className="mr-1" /> Room Code</Button>
              <Button size="sm" onClick={() => onScoreEntry(match.id)}><BarChart2 size={14} className="mr-1" /> Scores</Button>
            </>
          )}
        </div>
      </div>
      {showRoomForm && (
        <div className="mt-4 p-4 rounded-lg flex gap-3 items-end" style={{ backgroundColor: '#040810' }}>
          <Input label="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="12345678" className="flex-1" />
          <Input label="Password" value={roomPw} onChange={e => setRoomPw(e.target.value)} placeholder="roompassword" className="flex-1" />
          <Button onClick={() => { onRoomCode(match.id, roomId, roomPw); setShowRoomForm(false) }} disabled={!roomId || !roomPw}><Send size={14} className="mr-1" /> Send</Button>
        </div>
      )}
    </div>
  )
}
