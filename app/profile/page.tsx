import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirect=/profile')
  const admin = createAdminClient()
  const { data: profile } = await admin.from('profiles').select('*').eq('id', user.id).single()
  const { data: teams } = await admin.from('teams')
    .select('*, tournaments(name, status)')
    .eq('captain_id', user.id)
    .order('created_at', { ascending: false })
  const { data: roster } = await admin.from('roster')
    .select('*, teams(name, tournaments(name, status))')
    .eq('player_id', user.id)
    .eq('status', 'active')
  return <ProfileClient profile={profile} teams={teams || []} roster={roster || []} email={user.email || ''} />
}
