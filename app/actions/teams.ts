'use server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function acceptInvite(rosterId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const admin = createAdminClient()
  await admin.from('roster').update({ status: 'active' }).eq('id', rosterId).eq('player_id', user.id)
  revalidatePath('/dashboard')
}

export async function declineInvite(rosterId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const admin = createAdminClient()
  await admin.from('roster').delete().eq('id', rosterId).eq('player_id', user.id)
  revalidatePath('/dashboard')
}
