import { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = supabaseAdmin

  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('id, created_at')
    .eq('status', 'registration_open')
    .limit(50)

  const tournamentUrls = (tournaments || []).map((t: { id: string; created_at: string }) => ({
    url: `https://pubgmobiletournament.com/tournaments/${t.id}`,
    lastModified: new Date(t.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // BUG-18: Removed /auth/login and /auth/register from sitemap
  return [
    { url: 'https://pubgmobiletournament.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://pubgmobiletournament.com/tournaments', lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: 'https://pubgmobiletournament.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://pubgmobiletournament.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...tournamentUrls,
  ]
}
