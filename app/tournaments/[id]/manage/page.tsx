import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect, notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import ManageClient from './ManageClient'

interface PageProps { params: Promise<{ id: string }> }

export default async function ManagePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?redirect=/tournaments/${id}/manage`)
  const admin = createAdminClient()
  const { data: tournament } = await admin.from('tournaments').select('*').eq('id', id).single()
  if (!tournament) notFound()
  if (tournament.organizer_id !== user.id) redirect(`/tournaments/${id}`)
  const { data: teams } = await admin.from('teams').select('*, profiles(display_name)').eq('tournament_id', id).order('created_at')
  const { data: matches } = await admin.from('matches').select('*').eq('tournament_id', id).order('round').order('match_number')
  return <ManageClient tournament={tournament} teams={teams || []} matches={matches || []} />
}
