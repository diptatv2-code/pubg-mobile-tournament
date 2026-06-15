'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending — in production this would call an API
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="card-glass" style={{ padding: 36 }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
        marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>
        Send a Message
      </h2>

      {status === 'sent' ? (
        <div style={{
          textAlign: 'center', padding: '48px 24px',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="input-field"
              placeholder="What's this about?"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="form-label">Message</label>
            <textarea
              className="input-field"
              placeholder="Tell us more..."
              rows={5}
              style={{ resize: 'vertical' }}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'sending'}
            style={{ width: '100%', padding: '16px', fontSize: 15, opacity: status === 'sending' ? 0.7 : 1 }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      )}
    </div>
  )
}
