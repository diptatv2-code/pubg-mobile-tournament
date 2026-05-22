import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies()
  // Supabase auth-helpers store the session as a JSON-encoded value in any
  // cookie matching `sb-*-auth-token`. We pull the access token out manually
  // and ask the auth server who it belongs to.
  let accessToken: string | undefined
  for (const c of cookieStore.getAll()) {
    if (c.name.startsWith('sb-') && c.name.endsWith('-auth-token')) {
      try {
        const parsed = JSON.parse(c.value)
        if (parsed?.access_token) {
          accessToken = parsed.access_token as string
          break
        }
      } catch {
        // Some Supabase versions store the access token as a raw string
        accessToken = c.value
        break
      }
    }
  }
  accessToken =
    accessToken ||
    cookieStore.get('sb-access-token')?.value ||
    cookieStore.get('sb-auth-token')?.value

  if (!accessToken) redirect('/auth/login?next=/admin')

  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { data: userResp } = await anon.auth.getUser(accessToken)
  const user = userResp?.user
  if (!user) redirect('/auth/login?next=/admin')

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const { data: profile } = await admin
    .from('profiles')
    .select('is_admin, role')
    .eq('id', user.id)
    .single()
  const isAdmin = profile?.is_admin === true || profile?.role === 'admin'
  if (!isAdmin) redirect('/dashboard')
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <span className="font-display font-bold text-lg uppercase text-[var(--color-primary)]">Admin Panel</span>
          <Link href="/admin/users" className="text-sm text-[var(--color-muted)] hover:text-white transition-colors">Users</Link>
          <Link href="/admin/tournaments" className="text-sm text-[var(--color-muted)] hover:text-white transition-colors">Tournaments</Link>
          <Link href="/admin/finance" className="text-sm text-[var(--color-muted)] hover:text-white transition-colors">Finance</Link>
          <Link href="/dashboard" className="ml-auto text-sm text-[var(--color-muted)] hover:text-white transition-colors">← Back to Site</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
