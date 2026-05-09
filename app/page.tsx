import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { TournamentStatusBadge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Trophy, Users, Zap, Shield, ChevronRight, Target, Crown, Swords } from 'lucide-react'

async function getStats() {
  const admin = createAdminClient()
  const [{ count: tCount }, { count: pCount }, { count: lCount }] = await Promise.all([
    admin.from('tournaments').select('id', { count: 'exact', head: true }),
    admin.from('profiles').select('id', { count: 'exact', head: true }),
    admin.from('tournaments').select('id', { count: 'exact', head: true }).eq('status', 'started'),
  ])
  return { tournaments: tCount || 0, players: pCount || 0, live: lCount || 0 }
}

async function getFeaturedTournaments() {
  const admin = createAdminClient()
  const { data } = await admin.from('tournaments')
    .select('id, name, bracket_type, max_teams, status, start_date, map, profiles(display_name)')
    .eq('status', 'registration_open')
    .order('created_at', { ascending: false })
    .limit(3)
  return data || []
}

export default async function HomePage() {
  const [stats, featured] = await Promise.all([getStats(), getFeaturedTournaments()])

  return (
    <div style={{ backgroundColor: '#040810' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #040810 0%, #0A1020 50%, #040810 100%)' }}>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#1A2A4A 1px, transparent 1px), linear-gradient(90deg, #1A2A4A 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#00D4FF' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#C8A951' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.3)', color: '#C8A951' }}>
            <Zap size={14} /> Community Tier · Free to Play
          </div>
          
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, lineHeight: 1.1, color: '#E8EAF0', marginBottom: '1.5rem' }}>
            Bangladesh&apos;s Premier<br />
            <span style={{ color: '#00D4FF' }}>PUBG Mobile</span><br />
            Tournament Platform
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: '#6B7A99', lineHeight: 1.7 }}>
            Organize professional PUBG Mobile tournaments with encrypted room codes,
            live leaderboards, and automated scoring. Free for all community events.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tournaments" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
              <Trophy size={20} /> Browse Tournaments
            </Link>
            <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" style={{ border: '2px solid #C8A951', color: '#C8A951', backgroundColor: 'transparent' }}>
              <Swords size={20} /> Join Now — Free
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16">
            {[{ label: 'Tournaments', value: stats.tournaments, icon: Trophy }, { label: 'Players', value: stats.players, icon: Users }, { label: 'Live Now', value: stats.live, icon: Zap }].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="mx-auto mb-2" style={{ color: '#C8A951' }} />
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>{value}</div>
                <div className="text-sm" style={{ color: '#6B7A99' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0A1020' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#E8EAF0' }}>How It Works</h2>
          <p className="text-center mb-12" style={{ color: '#6B7A99' }}>Run your tournament in 3 simple steps</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Shield, title: 'Register & Create', desc: 'Sign up free, create your tournament with custom scoring matrix, bracket format, and rules.' },
              { step: '02', icon: Users, title: 'Teams Join', desc: 'Teams register, build their roster. Check-in window opens 30 minutes before each match.' },
              { step: '03', icon: Crown, title: 'Battle & Win', desc: 'Encrypted room codes sent to verified teams. Enter scores live. Leaderboard updates instantly.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center p-8 rounded-xl" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
                <div className="text-5xl font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(0,212,255,0.15)' }}>{step}</div>
                <Icon size={40} className="mx-auto mb-4" style={{ color: '#C8A951' }} />
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>{title}</h3>
                <p style={{ color: '#6B7A99', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      {featured.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: '#040810' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Open Tournaments</h2>
              <Link href="/tournaments" className="flex items-center gap-1 text-sm" style={{ color: '#00D4FF' }}>
                View all <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((t: Record<string, unknown>) => (
                <Link key={t.id as string} href={`/tournaments/${t.id}`}>
                  <div className="p-6 rounded-xl transition-all hover:scale-105 cursor-pointer" style={{ background: 'rgba(15,27,46,0.8)', border: '1px solid #1A2A4A' }}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0' }}>{t.name as string}</h3>
                      <TournamentStatusBadge status={t.status as string} />
                    </div>
                    <div className="flex items-center gap-4 text-sm" style={{ color: '#6B7A99' }}>
                      <span className="flex items-center gap-1"><Target size={14} /> {t.bracket_type as string}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> Max {t.max_teams as number}</span>
                    </div>
                    <div className="mt-3 text-xs" style={{ color: '#6B7A99' }}>
                      Starts: {formatDate(t.start_date as string)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: '#0A1020' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#E8EAF0' }}>Ready to Compete?</h2>
          <p className="mb-8" style={{ color: '#6B7A99' }}>Join thousands of PUBG Mobile players. Create or join a tournament today — completely free.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg" style={{ backgroundColor: '#C8A951', color: '#040810' }}>
            Get Started Free <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
