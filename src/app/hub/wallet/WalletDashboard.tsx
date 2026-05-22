'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type TxType = 'Deposit' | 'Withdrawal' | 'Prize' | 'Entry Fee'
type TxStatus = 'Completed' | 'Pending' | 'Failed'

interface Transaction {
  id: string
  type: TxType
  amount: number
  date: string
  status: TxStatus
}

const TYPE_COLORS: Record<TxType, string> = {
  Prize: '#22D67A',
  Deposit: '#00D4FF',
  Withdrawal: '#FF4444',
  'Entry Fee': '#FF8C00',
}

const STATUS_STYLES: Record<TxStatus, { bg: string; color: string }> = {
  Completed: { bg: 'rgba(34,214,122,0.12)', color: '#22D67A' },
  Pending: { bg: 'rgba(255,140,0,0.12)', color: '#FF8C00' },
  Failed: { bg: 'rgba(255,68,68,0.12)', color: '#FF4444' },
}

function normalizeTxType(type: string): TxType {
  const t = (type || '').toLowerCase()
  if (t.includes('prize') || t.includes('reward') || t.includes('win')) return 'Prize'
  if (t.includes('withdraw')) return 'Withdrawal'
  if (t.includes('entry') || t.includes('fee') || t.includes('registration')) return 'Entry Fee'
  return 'Deposit'
}

function normalizeTxStatus(status: string): TxStatus {
  const s = (status || '').toLowerCase()
  if (s.includes('fail') || s.includes('reject')) return 'Failed'
  if (s.includes('pend') || s.includes('process')) return 'Pending'
  return 'Completed'
}

export default function WalletDashboard() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWallet() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }

        const { data: txns } = await supabase
          .from('wallet_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (txns && txns.length > 0) {
          const mapped: Transaction[] = (txns as any[]).map((tx: any) => ({
            id: tx.id,
            type: normalizeTxType(tx.type || tx.transaction_type || ''),
            amount: tx.amount || 0,
            date: tx.created_at ? tx.created_at.slice(0, 10) : tx.date || '—',
            status: normalizeTxStatus(tx.status || ''),
          }))
          setTransactions(mapped)

          // Compute balance from completed transactions
          const bal = mapped
            .filter((tx) => tx.status === 'Completed')
            .reduce((sum, tx) => sum + tx.amount, 0)
          setBalance(Math.max(0, bal))
        }
      } catch (err) {
        console.error('WalletDashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchWallet()
  }, [])

  if (loading) {
    return <div className='p-8 text-center text-[var(--color-muted)]'>Loading...</div>
  }

  return (
    <div className="wallet-dashboard">
      {/* Balance Card */}
      <div className="wallet-balance-card">
        <div className="wallet-balance-label">Available Balance</div>
        <div className="wallet-balance-amount">
          <span className="wallet-currency">৳</span>
          {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="wallet-history">
        <h3 className="wallet-section-title">Transaction History</h3>
        {transactions.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No transactions yet.
          </div>
        ) : (
          <div className="wallet-table-wrap">
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <span className="tx-type-dot" style={{ background: TYPE_COLORS[tx.type] }} />
                      {tx.type}
                    </td>
                    <td style={{ color: tx.amount >= 0 ? '#22D67A' : '#FF4444', fontWeight: 700, fontFamily: 'monospace' }}>
                      {tx.amount >= 0 ? '+' : ''}৳{Math.abs(tx.amount).toLocaleString()}
                    </td>
                    <td className="tx-date">{tx.date}</td>
                    <td>
                      <span
                        className="tx-status-badge"
                        style={{ background: STATUS_STYLES[tx.status].bg, color: STATUS_STYLES[tx.status].color }}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .wallet-dashboard { display: flex; flex-direction: column; gap: 24px; }

        /* Balance card */
        .wallet-balance-card {
          background: linear-gradient(135deg, #0F1B2E 0%, #0A1520 100%);
          border: 1px solid rgba(200,169,81,0.3);
          border-radius: 16px; padding: 32px 28px;
          box-shadow: 0 0 40px rgba(200,169,81,0.1);
          text-align: center;
        }
        .wallet-balance-label {
          font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--text-muted, #6B7280); margin-bottom: 8px;
        }
        .wallet-balance-amount {
          font-family: var(--font-heading, 'Rajdhani'); font-size: 3.5rem; font-weight: 700;
          color: var(--gold, #C8A951); line-height: 1; margin-bottom: 24px;
        }
        .wallet-currency { font-size: 2rem; margin-right: 4px; vertical-align: middle; }

        /* History */
        .wallet-history {
          background: var(--bg-card, #0F1B2E);
          border: 1px solid var(--border, rgba(200,169,81,0.15));
          border-radius: 12px; padding: 20px;
        }
        .wallet-section-title {
          font-family: var(--font-heading); font-size: 1rem; font-weight: 700;
          color: var(--gold, #C8A951); text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 14px;
        }
        .wallet-table-wrap { overflow-x: auto; }
        .wallet-table { width: 100%; border-collapse: collapse; }
        .wallet-table th {
          text-align: left; padding: 8px 12px; font-size: 0.7rem;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted, #6B7280); border-bottom: 1px solid var(--border-muted, rgba(255,255,255,0.06));
        }
        .wallet-table td {
          padding: 10px 12px; font-size: 0.875rem; color: var(--text, #E8E8E8);
          border-bottom: 1px solid var(--border-muted, rgba(255,255,255,0.04));
          vertical-align: middle; display: table-cell; align-items: unset; gap: unset;
        }
        .wallet-table tr:last-child td { border-bottom: none; }
        .tx-type-dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          margin-right: 8px; vertical-align: middle;
        }
        .tx-date { color: var(--text-muted, #6B7280); font-size: 0.8rem; }
        .tx-status-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.04em; white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
