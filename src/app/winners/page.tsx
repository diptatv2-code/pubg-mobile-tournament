import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Winners — PUBG Mobile Tournament',
  description: 'Hall of fame — past tournament winners and champions.',
}

export default async function WinnersPage() {
  const supabase = supabaseAdmin

  const { data: completedTournaments } = await supabase
    .from('tournaments')
    .select('id, title, prize_pool, map, game_mode, starts_at, ends_at')
    .eq('status', 'completed')
    .order('ends_at', { ascending: false })
    .limit(20)

  const hasTournaments = completedTournaments && completedTournaments.length > 0

  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <section style={{
        padding: '80px 0 60px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="hex-bg" aria-hidden />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>HALL OF FAME</div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Tournament <span className="gradient-gold">Winners</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Celebrating the champions who dominated the battlefield
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {hasTournaments ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {completedTournaments.map((t: any, i: number) => (
                <div key={t.id} className="card-glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, #E5C76B, #C8A951, #FF8C00)',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: 32 }}>🏆</span>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700 }}>{t.title}</h3>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <span className="tag tag-cyan" style={{ fontSize: 10 }}>{t.map}</span>
                        <span className="tag tag-gold" style={{ fontSize: 10 }}>{t.game_mode}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>Prize Pool</div>
                      <div className="gradient-gold" style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700 }}>৳{(t.prize_pool ?? 0).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>Completed</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                        {t.ends_at ? new Date(t.ends_at).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '80px 24px',
              background: 'var(--bg-card)', borderRadius: 16,
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.5 }}>🏆</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, marginBottom: 14, textTransform: 'uppercase' }}>
                No Winners Yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 400, margin: '0 auto 28px' }}>
                Completed tournaments and their winners will appear here. Be the first champion!
              </p>
              <Link href="/tournaments" className="btn-primary">Join a Tournament →</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
