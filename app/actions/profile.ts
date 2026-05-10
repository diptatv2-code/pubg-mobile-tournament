'use server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const display_name = formData.get('display_name') as string
  const pubg_uid = formData.get('pubg_uid') as string

  const admin = createAdminClient()
  await admin.from('profiles').update({ display_name, pubg_uid }).eq('id', user.id)
  revalidatePath('/profile')
}
