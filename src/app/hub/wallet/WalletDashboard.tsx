'use client'

import { useState } from 'react'

type TxType = 'Deposit' | 'Withdrawal' | 'Prize' | 'Entry Fee'
type TxStatus = 'Completed' | 'Pending' | 'Failed'

interface Transaction {
  id: string
  type: TxType
  amount: number
  date: string
  status: TxStatus
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx001', type: 'Prize', amount: +500, date: '2026-05-08', status: 'Completed' },
  { id: 'tx002', type: 'Entry Fee', amount: -100, date: '2026-05-07', status: 'Completed' },
  { id: 'tx003', type: 'Deposit', amount: +300, date: '2026-05-05', status: 'Completed' },
  { id: 'tx004', type: 'Withdrawal', amount: -200, date: '2026-05-04', status: 'Completed' },
  { id: 'tx005', type: 'Entry Fee', amount: -100, date: '2026-05-03', status: 'Completed' },
  { id: 'tx006', type: 'Deposit', amount: +1000, date: '2026-05-01', status: 'Completed' },
  { id: 'tx007', type: 'Prize', amount: +750, date: '2026-04-28', status: 'Completed' },
  { id: 'tx008', type: 'Withdrawal', amount: -500, date: '2026-04-25', status: 'Pending' },
  { id: 'tx009', type: 'Entry Fee', amount: -50, date: '2026-04-22', status: 'Completed' },
  { id: 'tx010', type: 'Deposit', amount: +200, date: '2026-04-20', status: 'Failed' },
]

const INITIAL_BALANCE = 2500

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

export default function WalletDashboard() {
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [modalError, setModalError] = useState('')

  function handleDeposit() {
    const val = parseFloat(amount)
    if (!val || val <= 0) { setModalError('Enter a valid amount.'); return }
    const tx: Transaction = {
      id: 'tx' + Date.now(),
      type: 'Deposit',
      amount: val,
      date: new Date().toISOString().slice(0, 10),
      status: 'Completed',
    }
    setBalance((b) => b + val)
    setTransactions((t) => [tx, ...t])
    setAmount('')
    setDepositOpen(false)
    setModalError('')
  }

  function handleWithdraw() {
    const val = parseFloat(amount)
    if (!val || val <= 0) { setModalError('Enter a valid amount.'); return }
    if (val > balance) { setModalError('Insufficient balance.'); return }
    const tx: Transaction = {
      id: 'tx' + Date.now(),
      type: 'Withdrawal',
      amount: -val,
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    }
    setBalance((b) => b - val)
    setTransactions((t) => [tx, ...t])
    setAmount('')
    setWithdrawOpen(false)
    setModalError('')
  }

  function closeModals() {
    setDepositOpen(false)
    setWithdrawOpen(false)
    setAmount('')
    setModalError('')
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
        <div className="wallet-actions">
          <button className="wallet-btn wallet-btn-deposit" onClick={() => { setWithdrawOpen(false); setDepositOpen(true) }}>
            ↓ Deposit
          </button>
          <button className="wallet-btn wallet-btn-withdraw" onClick={() => { setDepositOpen(false); setWithdrawOpen(true) }}>
            ↑ Withdraw
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="wallet-history">
        <h3 className="wallet-section-title">Transaction History</h3>
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
      </div>

      {/* Deposit Modal */}
      {depositOpen && (
        <div className="wallet-modal-overlay" onClick={closeModals}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="wallet-modal-title" style={{ color: '#00D4FF' }}>Deposit Funds</h3>
            <input
              className="wallet-modal-input"
              type="number"
              placeholder="Amount (৳)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
            {modalError && <div className="wallet-modal-error">{modalError}</div>}
            <div className="wallet-modal-actions">
              <button className="wallet-btn wallet-btn-deposit" onClick={handleDeposit}>Confirm Deposit</button>
              <button className="wallet-btn wallet-btn-cancel" onClick={closeModals}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {withdrawOpen && (
        <div className="wallet-modal-overlay" onClick={closeModals}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="wallet-modal-title" style={{ color: '#FF4444' }}>Withdraw Funds</h3>
            <div className="wallet-modal-balance">Balance: ৳{balance.toLocaleString()}</div>
            <input
              className="wallet-modal-input"
              type="number"
              placeholder="Amount (৳)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
            {modalError && <div className="wallet-modal-error">{modalError}</div>}
            <div className="wallet-modal-actions">
              <button className="wallet-btn wallet-btn-withdraw" onClick={handleWithdraw}>Confirm Withdrawal</button>
              <button className="wallet-btn wallet-btn-cancel" onClick={closeModals}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
        .wallet-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .wallet-btn {
          padding: 10px 28px; border-radius: 8px; border: none;
          font-family: var(--font-body); font-weight: 700; font-size: 0.9rem;
          cursor: pointer; transition: opacity 0.15s; letter-spacing: 0.04em;
        }
        .wallet-btn:hover { opacity: 0.85; }
        .wallet-btn-deposit { background: var(--cyan, #00D4FF); color: #040810; }
        .wallet-btn-withdraw { background: var(--red, #FF4444); color: #fff; }
        .wallet-btn-cancel { background: rgba(255,255,255,0.08); color: var(--text-secondary, #B5BCC9); }

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

        /* Modal */
        .wallet-modal-overlay {
          position: fixed; inset: 0; background: rgba(4,8,16,0.85);
          z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .wallet-modal {
          background: var(--bg-card, #0F1B2E); border: 1px solid var(--border-strong, rgba(200,169,81,0.3));
          border-radius: 16px; padding: 28px 24px; width: 100%; max-width: 380px;
          display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 0 40px rgba(0,0,0,0.7);
        }
        .wallet-modal-title {
          font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .wallet-modal-balance { font-size: 0.85rem; color: var(--text-muted, #6B7280); }
        .wallet-modal-input {
          padding: 10px 14px; background: var(--bg-surface, #0A1020);
          border: 1px solid var(--border-bright, #2A3F65); border-radius: 8px;
          color: var(--text, #E8E8E8); font-size: 1rem; font-family: var(--font-body);
          outline: none; width: 100%;
        }
        .wallet-modal-input:focus { border-color: var(--cyan, #00D4FF); }
        .wallet-modal-error { font-size: 0.8rem; color: #FF4444; }
        .wallet-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      `}</style>
    </div>
  )
}
