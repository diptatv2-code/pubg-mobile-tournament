import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function AdminTournamentsPage() {
  const { data: tournaments } = await admin.from('tournaments').select('id, title, status, organizer_id, registered_teams, max_teams, prize_pool, created_at').order('created_at', { ascending: false }).limit(100)

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase mb-6">Tournaments ({tournaments?.length || 0})</h1>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[var(--color-muted)] text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Teams</th>
              <th className="px-4 py-3 text-left">Prize Pool</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(tournaments || []).map((t: Record<string, unknown>) => (
              <tr key={t.id as string} className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-surface-hover)]">
                <td className="px-4 py-3 font-medium">{t.title as string}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-[var(--color-border)] uppercase">{t.status as string}</span></td>
                <td className="px-4 py-3 text-[var(--color-muted)]">{t.registered_teams as number} / {t.max_teams as number}</td>
                <td className="px-4 py-3 text-[var(--color-primary)]">${Number(t.prize_pool || 0).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <a href={`/tournaments/${t.id}/manage`} className="text-xs text-[var(--color-secondary)] hover:underline">Manage →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
