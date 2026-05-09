'use client'

import { useState } from 'react'

type Role = 'Captain' | 'Member' | 'Substitute'

interface Player {
  id: string
  username: string
  pubgUid: string
  role: Role
  avatarUrl?: string
}

const INITIAL_ROSTER: Player[] = [
  { id: '1', username: 'ShadowSniper', pubgUid: 'UID-1001-ALPHA', role: 'Captain' },
  { id: '2', username: 'GhostReaper', pubgUid: 'UID-1002-BETA', role: 'Member' },
  { id: '3', username: 'IronHavoc', pubgUid: 'UID-1003-GAMMA', role: 'Member' },
  { id: '4', username: 'BlitzKrieg99', pubgUid: 'UID-1004-DELTA', role: 'Member' },
  { id: '5', username: 'VoidWalker', pubgUid: 'UID-1005-EPS', role: 'Substitute' },
]

const ROLE_COLORS: Record<Role, string> = {
  Captain: '#C8A951',
  Member: '#00D4FF',
  Substitute: '#6B7280',
}

const MAX_ACTIVE = 4
const MAX_SUBS = 2

export default function RosterManager() {
  const [roster, setRoster] = useState<Player[]>(INITIAL_ROSTER)
  const [locked, setLocked] = useState(false)
  const [newUid, setNewUid] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState<Role>('Member')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const activeCount = roster.filter((p) => p.role !== 'Substitute').length
  const subCount = roster.filter((p) => p.role === 'Substitute').length

  function addPlayer() {
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
    const player: Player = {
      id: Date.now().toString(),
      username: newName.trim(),
      pubgUid: newUid.trim(),
      role: newRole,
    }
    setRoster((prev) => [...prev, player])
    setNewUid('')
    setNewName('')
    setNewRole('Member')
    setSuccess(`${player.username} added to roster.`)
  }

  function removePlayer(id: string) {
    if (locked) return
    setRoster((prev) => prev.filter((p) => p.id !== id))
    setSuccess('Player removed.')
    setError('')
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

      {/* Player Cards */}
      <div className="roster-grid">
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
