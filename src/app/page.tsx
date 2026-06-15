import { supabaseAdmin } from '@/lib/supabase'
import HeroSection from '@/components/home/HeroSection'
import FeaturedTournaments from '@/components/home/FeaturedTournaments'
import HowItWorks from '@/components/home/HowItWorks'
import StatsSection from '@/components/home/StatsSection'
import LiveTicker from '@/components/home/LiveTicker'
import CTASection from '@/components/home/CTASection'

export default async function HomePage() {
  const supabase = supabaseAdmin

  const [
    { data: featuredTournaments },
    { count: tournamentCount },
    { count: playerCount },
  ] = await Promise.all([
    supabase
      .from('tournaments')
      .select('*')
      .in('status', ['registration_open', 'ongoing'])
      .order('starts_at', { ascending: true })
      .limit(3),
    supabase
      .from('tournaments')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true }),
  ])

  return (
    <div style={{ overflowX: 'hidden' }}>
      <HeroSection
        tournamentCount={tournamentCount ?? 0}
        playerCount={playerCount ?? 0}
      />
      <LiveTicker />
      <FeaturedTournaments tournaments={featuredTournaments || []} />
      <HowItWorks />
      <StatsSection
        tournamentCount={tournamentCount ?? 0}
        playerCount={playerCount ?? 0}
      />
      <CTASection />
    </div>
  )
}
