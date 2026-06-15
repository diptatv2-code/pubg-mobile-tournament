import { supabaseAdmin as admin } from "@/lib/supabase"


export default async function AdminUsersPage() {
  const { data: users } = await admin.from('profiles').select('id, email, username, pubg_name, role, is_admin, is_banned, wallet_balance, created_at').order('created_at', { ascending: false }).limit(100)

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase mb-6">Users ({users?.length || 0})</h1>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[var(--color-muted)] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">PUBG Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Balance</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((u: Record<string, unknown>) => (
              <tr key={u.id as string} className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-surface-hover)]">
                <td className="px-4 py-3">
                  <div className="font-medium">{(u.username as string) || (u.email as string)}</div>
                  <div className="text-xs text-[var(--color-muted)]">{u.email as string}</div>
                </td>
                <td className="px-4 py-3 text-[var(--color-muted)]">{(u.pubg_name as string) || '—'}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-[var(--color-border)] uppercase">{u.role as string}</span></td>
                <td className="px-4 py-3 text-[var(--color-primary)]">${Number(u.wallet_balance || 0).toFixed(2)}</td>
                <td className="px-4 py-3">
                  {u.is_banned ? <span className="text-red-400 text-xs font-bold">BANNED</span> : <span className="text-green-400 text-xs">Active</span>}
                </td>
                <td className="px-4 py-3">
                  <AdminUserActions userId={u.id as string} isBanned={u.is_banned as boolean} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminUserActions({ userId, isBanned }: { userId: string; isBanned: boolean }) {
  return (
    <form action={`/api/admin/toggle-ban`} method="POST">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="ban" value={(!isBanned).toString()} />
      <button type="submit" className={`text-xs px-2 py-1 rounded border ${
        isBanned ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' : 'border-red-500/50 text-red-400 hover:bg-red-500/10'
      } transition-colors`}>
        {isBanned ? 'Unban' : 'Ban'}
      </button>
    </form>
  )
}
