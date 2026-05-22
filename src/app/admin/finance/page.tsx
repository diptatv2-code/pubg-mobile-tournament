import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function AdminFinancePage() {
  const { data: txns } = await admin.from('wallet_transactions').select('*').order('created_at', { ascending: false }).limit(200)
  const prizes = (txns || []).filter((t: Record<string, unknown>) => t.type === 'prize').reduce((sum: number, t: Record<string, unknown>) => sum + Number(t.amount || 0), 0)
  const entries = (txns || []).filter((t: Record<string, unknown>) => t.type === 'entry_fee').reduce((sum: number, t: Record<string, unknown>) => sum + Math.abs(Number(t.amount || 0)), 0)

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase mb-6">Finance</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[{label: 'Total Transactions', value: txns?.length || 0, prefix: ''}, {label: 'Total Entry Fees', value: entries.toFixed(2), prefix: '$'}, {label: 'Total Prizes Paid', value: prizes.toFixed(2), prefix: '$'}].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">{s.label}</div>
            <div className="text-2xl font-bold font-display text-[var(--color-primary)]">{s.prefix}{s.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[var(--color-border)] text-[var(--color-muted)] text-xs uppercase">
            <th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Amount</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Date</th>
          </tr></thead>
          <tbody>
            {(txns || []).map((t: Record<string, unknown>) => (
              <tr key={t.id as string} className="border-b border-[var(--color-border)]/50">
                <td className="px-4 py-3 capitalize">{t.type as string}</td>
                <td className={`px-4 py-3 font-mono ${Number(t.amount) >= 0 ? 'text-green-400' : 'text-red-400'}`}>${Math.abs(Number(t.amount)).toFixed(2)}</td>
                <td className="px-4 py-3 text-xs uppercase text-[var(--color-muted)]">{t.status as string}</td>
                <td className="px-4 py-3 text-[var(--color-muted)] text-xs">{new Date(t.created_at as string).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
