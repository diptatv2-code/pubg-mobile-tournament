import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import LeaderboardTable from './LeaderboardTable'

export const metadata: Metadata = {
  title: 'Leaderboard — PUBG Mobile Tournament',
  description: 'See the top players and teams competing in PUBG Mobile tournaments.',
}

export default async function LeaderboardPage() {
  const supabase = supabaseAdmin

  // Fetch top players by total wins
  const { data: topPlayers } = await supabase
    .from('profiles')
    .select('id, username, pubg_name, avatar_url, total_tournaments, total_wins, total_kills')
    .order('total_wins', { ascending: false })
    .limit(50)

  // Fetch recent match results for team rankings
  const { data: topTeams } = await supabase
    .from('match_results')
    .select('team_id, total_points, teams(name, tournament_id)')
    .order('total_points', { ascending: false })
    .limit(20)

  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <section style={{
        padding: '80px 0 60px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>RANKINGS</div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Global <span className="gradient-gold">Leaderboard</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Top players ranked by tournament wins, kills, and performance
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeaderboardTable players={topPlayers || []} />
        </div>
      </section>
    </div>
  )
}
