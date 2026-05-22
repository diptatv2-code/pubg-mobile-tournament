'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Role = 'Captain' | 'Member' | 'Substitute'

interface Player {
  id: string
  username: string
  pubgUid: string
  role: Role
  avatarUrl?: string
}

const ROLE_COLORS: Record<Role, string> = {
  Captain: '#C8A951',
  Member: '#00D4FF',
  Substitute: '#6B7280',
}

const MAX_ACTIVE = 4
const MAX_SUBS = 2

export default function RosterManager() {
  const [roster, setRoster] = useState<Player[]>([])
  const [locked, setLocked] = useState(false)
  const [newUid, setNewUid] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState<Role>('Member')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [teamId, setTeamId] = useState<string | null>(null)

  // Invite state
  const [inviteUsername, setInviteUsername] = useState('')
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)

  useEffect(() => {
    async function fetchRoster() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }

        const { data: myTeam } = await supabase
          .from('teams')
          .select('id, name')
          .eq('captain_id', user.id)
          .limit(1)
          .single()

        if (!myTeam) { setLoading(false); return }

        setTeamId(myTeam.id)

        const { data: members } = await supabase
          .from('team_members')
          .select('*')
          .eq('team_id', myTeam.id)

        const mapped: Player[] = (members || []).map((m: any) => ({
          id: m.id,
          username: m.username || m.in_game_name || m.name || 'Player',
          pubgUid: m.pubg_uid || m.pubg_id || m.uid || '',
          role: (m.role as Role) || 'Member',
        }))
        setRoster(mapped)
      } catch (err) {
        console.error('Roster fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoster()
  }, [])

  const activeCount = roster.filter((p) => p.role !== 'Substitute').length
  const subCount = roster.filter((p) => p.role === 'Substitute').length

  async function addPlayer() {
    setError('')
    setSuccess('')
    if (!newUid.trim() || !newName.trim()) {
      setError('Please enter both PUBG UID and username.')
      return
    }
    if (roster.find((p) => p.pubgUid === newUid.trim())) {
      setError('A player with this UID already exists.')
      return
    }
    if (newRole === 'Substitute' && subCount >= MAX_SUBS) {
      setError(`Maximum ${MAX_SUBS} substitutes allowed.`)
      return
    }
    if (newRole !== 'Substitute' && activeCount >= MAX_ACTIVE) {
      setError(`Maximum ${MAX_ACTIVE} active players allowed.`)
      return
    }

    try {
      if (teamId) {
        const { data: inserted, error: insertError } = await supabase
          .from('team_members')
          .insert({
            team_id: teamId,
            username: newName.trim(),
            pubg_uid: newUid.trim(),
            role: newRole,
          })
          .select()
          .single()

        if (insertError) throw insertError

        const player: Player = {
          id: inserted.id,
          username: inserted.username || newName.trim(),
          pubgUid: inserted.pubg_uid || newUid.trim(),
          role: (inserted.role as Role) || newRole,
        }
        setRoster((prev) => [...prev, player])
      } else {
        // No team yet — local only
        const player: Player = {
          id: Date.now().toString(),
          username: newName.trim(),
          pubgUid: newUid.trim(),
          role: newRole,
        }
        setRoster((prev) => [...prev, player])
      }

      setNewUid('')
      setNewName('')
      setNewRole('Member')
      setSuccess(`${newName.trim()} added to roster.`)
    } catch (err: unknown) {
      setError('Failed to add player. Please try again.')
      console.error(err)
    }
  }

  async function removePlayer(id: string) {
    if (locked) return
    try {
      if (teamId) {
        const { error: delError } = await supabase
          .from('team_members')
          .delete()
          .eq('id', id)
        if (delError) throw delError
      }
      setRoster((prev) => prev.filter((p) => p.id !== id))
      setSuccess('Player removed.')
      setError('')
    } catch (err: unknown) {
      setError('Failed to remove player.')
      console.error(err)
    }
  }

  async function sendInvite() {
    setInviteError('')
    setInviteSuccess('')
    if (!inviteUsername.trim()) {
      setInviteError('Enter a username to invite.')
      return
    }
    if (!teamId) {
      setInviteError('You must have a team to send invites.')
      return
    }
    setInviteLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setInviteError('Not authenticated.'); setInviteLoading(false); return }

      // Look up user by username in profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('username', inviteUsername.trim())
        .single()

      if (profileError || !profile) {
        setInviteError('User not found. Check the username and try again.')
        setInviteLoading(false)
        return
      }

      if (profile.id === user.id) {
        setInviteError('You cannot invite yourself.')
        setInviteLoading(false)
        return
      }

      // Check if already in team
      const { data: existingMember } = await supabase
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', profile.id)
        .single()

      if (existingMember) {
        setInviteError('This player is already in your team.')
        setInviteLoading(false)
        return
      }

      // Check for pending invite
      const { data: existingInvite } = await supabase
        .from('team_invites')
        .select('id')
        .eq('team_id', teamId)
        .eq('invitee_id', profile.id)
        .eq('status', 'pending')
        .single()

      if (existingInvite) {
        setInviteError('A pending invite already exists for this player.')
        setInviteLoading(false)
        return
      }

      const { error: inviteErr } = await supabase.from('team_invites').insert({
        team_id: teamId,
        inviter_id: user.id,
        invitee_id: profile.id,
        status: 'pending',
      })

      if (inviteErr) throw inviteErr

      setInviteSuccess(`Invite sent to ${inviteUsername.trim()}!`)
      setInviteUsername('')
    } catch (err: unknown) {
      setInviteError('Failed to send invite. Please try again.')
      console.error(err)
    } finally {
      setInviteLoading(false)
    }
  }

  if (loading) {
    return <div className='p-8 text-center text-[var(--color-muted)]'>Loading...</div>
  }

  return (
    <div className="roster-manager">
      {/* Status Bar */}
      <div className="roster-status-bar">
        <div className="roster-stat">
          <span className="roster-stat-label">Active Players</span>
          <span className="roster-stat-value" style={{ color: activeCount >= MAX_ACTIVE ? '#FF4444' : '#00D4FF' }}>
            {activeCount}/{MAX_ACTIVE}
          </span>
        </div>
        <div className="roster-stat">
          <span className="roster-stat-label">Substitutes</span>
          <span className="roster-stat-value" style={{ color: subCount >= MAX_SUBS ? '#FF4444' : '#C8A951' }}>
            {subCount}/{MAX_SUBS}
          </span>
        </div>
        <div className="roster-stat">
          <span className="roster-stat-label">Roster Status</span>
          <span
            className="roster-status-badge"
            style={{
              background: locked ? 'rgba(255,68,68,0.12)' : 'rgba(34,214,122,0.12)',
              color: locked ? '#FF4444' : '#22D67A',
              border: `1px solid ${locked ? '#FF4444' : '#22D67A'}`,
            }}
          >
            {locked ? '🔒 LOCKED' : '🔓 OPEN'}
          </span>
        </div>
        <button
          className="roster-lock-btn"
          onClick={() => setLocked((l) => !l)}
          style={{ background: locked ? 'rgba(34,214,122,0.15)' : 'rgba(255,68,68,0.15)', color: locked ? '#22D67A' : '#FF4444' }}
        >
          {locked ? '🔓 Unlock Roster' : '🔒 Lock Roster'}
        </button>
      </div>

      {/* Error/Success */}
      {error && <div className="roster-alert roster-alert-error">{error}</div>}
      {success && <div className="roster-alert roster-alert-success">{success}</div>}

      {/* Add Player Form */}
      {!locked && (
        <div className="roster-add-form">
          <h3 className="roster-add-title">Add Player</h3>
          <div className="roster-form-row">
            <input
              className="roster-input"
              placeholder="PUBG UID (e.g. UID-2024-XYZ)"
              value={newUid}
              onChange={(e) => setNewUid(e.target.value)}
            />
            <input
              className="roster-input"
              placeholder="In-game Username"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <select
              className="roster-select"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as Role)}
            >
              <option value="Member">Member</option>
              <option value="Captain">Captain</option>
              <option value="Substitute">Substitute</option>
            </select>
            <button className="roster-add-btn" onClick={addPlayer}>
              ＋ Add
            </button>
          </div>
        </div>
      )}

      {/* Invite Player Form */}
      {!locked && teamId && (
        <div className="roster-add-form">
          <h3 className="roster-add-title" style={{ color: '#00D4FF' }}>✉ Invite Player</h3>
          <p className="roster-invite-hint">Send an invite to a registered player by their username</p>
          <div className="roster-form-row">
            <input
              className="roster-input"
              placeholder="Player username (e.g. ShadowSniper)"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { void sendInvite() } }}
            />
            <button
              className="roster-invite-btn"
              onClick={() => void sendInvite()}
              disabled={inviteLoading}
            >
              {inviteLoading ? 'Sending…' : '✉ Send Invite'}
            </button>
          </div>
          {inviteError && <div className="roster-alert roster-alert-error" style={{ marginTop: 8 }}>{inviteError}</div>}
          {inviteSuccess && <div className="roster-alert roster-alert-success" style={{ marginTop: 8 }}>{inviteSuccess}</div>}
        </div>
      )}

      {/* Player Cards */}
      <div className="roster-grid">
        {roster.length === 0 && (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', background: 'var(--bg-card, #0F1B2E)', border: '1px solid var(--border)', borderRadius: 10 }}>
            No players in roster yet. Add your first player above.
          </div>
        )}
        {roster.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-avatar">
              {player.username.charAt(0).toUpperCase()}
            </div>
            <div className="player-info">
              <div className="player-username">{player.username}</div>
              <div className="player-uid">{player.pubgUid}</div>
            </div>
            <div className="player-right">
              <span
                className="player-role-badge"
                style={{
                  background: ROLE_COLORS[player.role] + '22',
                  color: ROLE_COLORS[player.role],
                  border: `1px solid ${ROLE_COLORS[player.role]}66`,
                }}
              >
                {player.role}
              </span>
              {!locked && (
                <button
                  className="player-remove-btn"
                  onClick={() => removePlayer(player.id)}
                  aria-label={`Remove ${player.username}`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .roster-manager { display: flex; flex-direction: column; gap: 20px; }

        .roster-status-bar {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .roster-stat { display: flex; flex-direction: column; gap: 2px; }
        .roster-stat-label { font-size: 0.75rem; color: var(--text-muted, #6B7280); text-transform: uppercase; letter-spacing: 0.08em; }
        .roster-stat-value { font-family: var(--font-heading, 'Rajdhani'); font-size: 1.25rem; font-weight: 700; }
        .roster-status-badge {
          display: inline-flex; align-items: center; padding: 4px 12px;
          border-radius: 20px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em;
        }
        .roster-lock-btn {
          margin-left: auto; padding: 8px 18px; border-radius: 8px; border: none;
          font-family: var(--font-body); font-weight: 600; font-size: 0.875rem;
          cursor: pointer; transition: opacity 0.15s;
        }
        .roster-lock-btn:hover { opacity: 0.8; }

        .roster-alert {
          padding: 10px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 500;
        }
        .roster-alert-error { background: rgba(255,68,68,0.1); color: #FF4444; border: 1px solid rgba(255,68,68,0.3); }
        .roster-alert-success { background: rgba(34,214,122,0.1); color: #22D67A; border: 1px solid rgba(34,214,122,0.3); }

        .roster-add-form {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 12px; padding: 20px;
        }
        .roster-add-title {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 1rem; font-weight: 700;
          color: var(--gold, #C8A951); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .roster-invite-hint {
          font-size: 0.8rem; color: var(--text-muted, #6B7280); margin-bottom: 12px;
        }
        .roster-form-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .roster-input, .roster-select {
          flex: 1; min-width: 140px; padding: 9px 14px;
          background: var(--bg-surface, #0A1020); border: 1px solid var(--border-bright, #2A3F65);
          border-radius: 8px; color: var(--text, #E8E8E8); font-family: var(--font-body); font-size: 0.875rem;
          outline: none;
        }
        .roster-input:focus, .roster-select:focus { border-color: var(--cyan, #00D4FF); }
        .roster-add-btn {
          padding: 9px 20px; background: var(--gold, #C8A951); color: #040810;
          border: none; border-radius: 8px; font-family: var(--font-body); font-weight: 700;
          font-size: 0.875rem; cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
        }
        .roster-add-btn:hover { opacity: 0.85; }
        .roster-invite-btn {
          padding: 9px 20px; background: rgba(0,212,255,0.15); color: #00D4FF;
          border: 1px solid rgba(0,212,255,0.4); border-radius: 8px; font-family: var(--font-body); font-weight: 700;
          font-size: 0.875rem; cursor: pointer; white-space: nowrap; transition: all 0.15s;
        }
        .roster-invite-btn:hover:not(:disabled) { background: rgba(0,212,255,0.25); }
        .roster-invite-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .roster-grid { display: flex; flex-direction: column; gap: 10px; }

        .player-card {
          display: flex; align-items: center; gap: 14px;
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 10px; padding: 14px 16px;
          transition: background 0.15s;
        }
        .player-card:hover { background: var(--bg-card-hover, #142540); }

        .player-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, var(--cyan-dim, #007FA3), var(--cyan, #00D4FF));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700;
          color: #040810; flex-shrink: 0;
        }
        .player-info { flex: 1; min-width: 0; }
        .player-username { font-family: var(--font-heading); font-weight: 700; font-size: 1rem; color: var(--text, #E8E8E8); }
        .player-uid { font-size: 0.75rem; color: var(--text-muted, #6B7280); margin-top: 2px; font-family: monospace; }
        .player-right { display: flex; align-items: center; gap: 10px; }
        .player-role-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap;
        }
        .player-remove-btn {
          background: rgba(255,68,68,0.12); color: #FF4444; border: 1px solid rgba(255,68,68,0.3);
          border-radius: 6px; width: 28px; height: 28px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
          transition: background 0.15s; flex-shrink: 0;
        }
        .player-remove-btn:hover { background: rgba(255,68,68,0.25); }
      `}</style>
    </div>
  )
}
