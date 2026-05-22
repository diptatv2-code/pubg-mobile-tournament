'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'
import { CountdownTimer } from '@/components/tournament/CountdownTimer'
import { supabase } from '@/lib/supabase'

type MatchStatus = 'Scheduled' | 'Checking In' | 'Live' | 'Completed'

export default function LiveEventDashboard() {
  const [roomCodeVisible, setRoomCodeVisible] = useState(false)
  const [matchStatus, setMatchStatus] = useState<MatchStatus>('Scheduled')
  const [roomCode, setRoomCode] = useState('')
  const [roomPwd, setRoomPwd] = useState('')
  const [tournamentTitle, setTournamentTitle] = useState('—')
  const [tournamentMap, setTournamentMap] = useState('—')
  const [tournamentMode, setTournamentMode] = useState('—')
  const [revealTime, setRevealTime] = useState<Date>(() => new Date(Date.now() + 60_000))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLiveData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }

        const { data: myTeams } = await supabase
          .from('teams')
          .select('id, tournament_id, tournaments(title, status, map, mode)')
          .eq('captain_id', user.id)

        const myTeam = (myTeams || []).find(
          (t: any) => t.tournaments && (t.tournaments.status === 'ongoing' || t.tournaments.status === 'active' || t.tournaments.status === 'live')
        ) || (myTeams && myTeams.length > 0 ? myTeams[0] : null)

        if (myTeam) {
          const t = (myTeam as any).tournaments
          if (t) {
            setTournamentTitle(t.title || '—')
            setTournamentMap(t.map || '—')
            setTournamentMode(t.mode || '—')
            if (t.status === 'ongoing' || t.status === 'active' || t.status === 'live') {
               
              setMatchStatus('Live')
            }
          }

          // Get room code for the team's tournament
          const tournamentId = (myTeam as any).tournament_id
          if (tournamentId) {
            const { data: room } = await supabase
              .from('room_codes')
              .select('*')
              .eq('tournament_id', tournamentId)
              .order('created_at', { ascending: false })
              .limit(1)
              .single()

            if (room) {
              setRoomCode(room.room_code || '')
              setRoomPwd(room.room_password || '')
              const isVisible = !!room.distributed_at
              setRoomCodeVisible(isVisible)
              if (!isVisible && room.reveal_at) {
                setRevealTime(new Date(room.reveal_at))
              }
            }
          }
        }
      } catch (err) {
        console.error('LiveEventDashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLiveData()
  }, [])

  // Once the room code is visible the match has at minimum reached the
  // check-in phase. Real Live/Completed transitions are driven by the
  // tournament status loaded in the fetch effect above.
  useEffect(() => {
    if (roomCodeVisible && matchStatus === 'Scheduled') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMatchStatus('Checking In')
    }
  }, [roomCodeVisible, matchStatus])

  const statusConfig: Record<MatchStatus, { color: string; bg: string; pulse: boolean; label: string }> = {
    Scheduled: { color: '#B5BCC9', bg: 'rgba(181,188,201,0.1)', pulse: false, label: '🗓 Scheduled' },
    'Checking In': { color: '#FF8C00', bg: 'rgba(255,140,0,0.12)', pulse: true, label: '🟡 Checking In' },
    Live: { color: '#FF4444', bg: 'rgba(255,68,68,0.12)', pulse: true, label: '🔴 LIVE' },
    Completed: { color: '#22D67A', bg: 'rgba(34,214,122,0.12)', pulse: false, label: '✅ Completed' },
  }

  const sc = statusConfig[matchStatus]

  if (loading) {
    return <div className='p-8 text-center text-[var(--color-muted)]'>Loading...</div>
  }

  return (
    <div className="live-dashboard">
      {/* Match Status */}
      <div className="live-status-card">
        <div className="live-status-row">
          <span className="live-card-label">Match Status</span>
          <span
            className={`live-status-pill${sc.pulse ? ' live-pulse' : ''}`}
            style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}44` }}
          >
            {sc.label}
          </span>
        </div>
        <div className="live-match-info">
          <span className="live-match-name">{tournamentTitle}</span>
          <span className="live-match-meta">{tournamentMap} · {tournamentMode}</span>
        </div>
      </div>

      {/* Room Code Section */}
      <div className="live-room-card">
        <div className="live-card-label" style={{ marginBottom: 20 }}>Room Code</div>

        {!roomCodeVisible ? (
          <div className="live-waiting-block">
            <div className="live-waiting-label">Reveals in</div>
            <CountdownTimer
              to={revealTime}
              onZero={() => setRoomCodeVisible(true)}
            />
            <div className="live-waiting-hint">Room code will appear automatically when the countdown ends.</div>
          </div>
        ) : (
          <div className="live-code-reveal">
            <div className="live-code-badge">{roomCode || '—'}</div>
            {roomPwd && (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Password: <span style={{ fontFamily: 'monospace', color: 'var(--cyan)' }}>{roomPwd}</span>
              </div>
            )}
            <div className="live-code-hint">Share this code only with your team. Do not post publicly.</div>
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="live-info-grid">
        <div className="live-info-tile">
          <span className="live-info-label">Tournament</span>
          <span className="live-info-value">{tournamentTitle}</span>
        </div>
        <div className="live-info-tile">
          <span className="live-info-label">Map</span>
          <span className="live-info-value">🗺️ {tournamentMap}</span>
        </div>
        <div className="live-info-tile">
          <span className="live-info-label">Mode</span>
          <span className="live-info-value">{tournamentMode}</span>
        </div>
        <div className="live-info-tile">
          <span className="live-info-label">Your Slot</span>
          <span className="live-info-value" style={{ color: '#C8A951' }}>—</span>
        </div>
      </div>

      <style>{`
        .live-dashboard { display: flex; flex-direction: column; gap: 20px; }

        .live-status-card, .live-room-card {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 12px; padding: 22px 24px;
        }
        .live-room-card { border-color: rgba(0,212,255,0.25); }

        .live-status-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 14px;
        }
        .live-card-label {
          font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--text-muted, #6B7280); font-weight: 600;
        }
        .live-status-pill {
          padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.04em;
        }
        .live-pulse { animation: livepulse 1.5s ease-in-out infinite; }
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }

        .live-match-info { display: flex; flex-direction: column; gap: 4px; }
        .live-match-name {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 1.25rem; font-weight: 700;
          color: var(--text, #E8E8E8);
        }
        .live-match-meta { font-size: 0.8rem; color: var(--text-muted, #6B7280); }

        /* Room code */
        .live-waiting-block { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; padding: 8px 0; }
        .live-waiting-label {
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--text-muted, #6B7280);
        }
        .live-waiting-hint { font-size: 0.8rem; color: var(--text-muted, #6B7280); max-width: 320px; }

        .live-code-reveal { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .live-code-badge {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 2.5rem; font-weight: 700;
          letter-spacing: 0.12em; color: var(--cyan, #00D4FF);
          background: rgba(0,212,255,0.08); border: 2px solid rgba(0,212,255,0.4);
          border-radius: 10px; padding: 10px 28px;
          box-shadow: 0 0 30px rgba(0,212,255,0.2);
          animation: fadeInScale 0.4s ease;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .live-code-hint { font-size: 0.8rem; color: var(--text-muted, #6B7280); text-align: center; }

        /* Info grid */
        .live-info-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .live-info-tile {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 10px; padding: 14px 16px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .live-info-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted, #6B7280); }
        .live-info-value { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--text, #E8E8E8); }

        @media (min-width: 600px) {
          .live-info-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  )
}
