import Link from 'next/link'

type Props = {
  id: string
  title: string
  prize: string | number
  maxTeams: number
  registeredTeams?: number
  status: string
  map?: string
  gameMode?: string
  format?: string
  startsAt?: string
}

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  draft:               { label: 'Draft',        cls: 'tag' },
  registration_open:   { label: 'Open',         cls: 'tag tag-green' },
  registration_closed: { label: 'Closed',       cls: 'tag tag-red' },
  ongoing:             { label: 'Live',          cls: 'live-badge' },
  completed:           { label: 'Ended',        cls: 'tag' },
  cancelled:           { label: 'Cancelled',    cls: 'tag tag-red' },
}

export default function TournamentCard({ id, title, prize, maxTeams, registeredTeams = 0, status, map = 'Erangel', gameMode = 'Squad', format = 'battle_royale', startsAt }: Props) {
  const sc = STATUS_CONFIG[status] ?? { label: status, cls: 'tag' }
  const fillPct = maxTeams > 0 ? Math.round((registeredTeams / maxTeams) * 100) : 0
  const prizeNum = typeof prize === 'number' ? prize : parseInt(String(prize).replace(/\D/g, '')) || 0

  return (
    <Link href={`/tournaments/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="card border-glow" style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', height: '100%' }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: status === 'ongoing' ? 'linear-gradient(90deg,#ef4444,#f97316)' :
                      status === 'registration_open' ? 'linear-gradient(90deg,#f5c518,#e6a800)' :
                      'linear-gradient(90deg,var(--border-bright),var(--border))',
        }}/>

        <div style={{ paddingTop: 12 }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span className={sc.cls}>{sc.label}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{map}</span>
          </div>

          {/* Title */}
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, lineHeight: 1.25, marginBottom: 16, color: 'var(--text-primary)' }}>{title}</h3>

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            <div style={{ padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Prize Pool</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: prizeNum > 0 ? 'var(--gold)' : 'var(--text-muted)' }}>
                {prizeNum > 0 ? `$${prizeNum.toLocaleString()}` : 'Free'}
              </div>
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Mode</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{gameMode}</div>
            </div>
          </div>

          {/* Teams progress */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Teams Registered</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: fillPct >= 80 ? 'var(--gold)' : 'var(--text-secondary)' }}>
                {registeredTeams}/{maxTeams}
              </span>
            </div>
            <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2, transition: 'width 0.5s',
                width: `${fillPct}%`,
                background: fillPct >= 90 ? '#ef4444' : fillPct >= 70 ? '#f5c518' : 'var(--cyan)',
              }}/>
            </div>
          </div>

          {/* Footer */}
          {startsAt && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🗓</span>
              {new Date(startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
