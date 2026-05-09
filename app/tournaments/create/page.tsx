'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, ChevronRight, ChevronLeft } from 'lucide-react'

const STEPS = ['Basic Info', 'Format', 'Scoring', 'Review']
const MAPS = ['Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Livik']
const BRACKETS = [{ value: 'group_stage', label: 'Group Stage' }, { value: 'single_elim', label: 'Single Elimination' }, { value: 'round_robin', label: 'Round Robin' }]
const MAX_TEAMS = [4, 8, 16, 32, 64]

export default function CreateTournamentPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', description: '',
    bracket_type: 'group_stage', max_teams: 16,
    registration_deadline: '', start_date: '',
    map: 'Erangel', perspective: 'TPP',
    kill_points: 1, wwcd_bonus: 0,
    smash_rule_enabled: false, smash_rule_threshold: 50,
  })

  const set = (key: string, value: unknown) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        scoring_matrix: { placement: [10,6,5,4,3,2,1,1,0,0,0,0,0,0,0,0], kill_points: form.kill_points, wwcd_bonus: form.wwcd_bonus },
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to create'); setLoading(false); return }
    router.push(`/tournaments/${data.tournament.id}`)
  }

  const minDate = new Date(Date.now() + 3600000).toISOString().slice(0, 16)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Trophy size={48} className="mx-auto mb-3" style={{ color: '#C8A951' }} />
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#E8EAF0' }}>Create Tournament</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: i <= step ? '#00D4FF' : '#1A2A4A', color: i <= step ? '#040810' : '#6B7A99' }}>{i + 1}</div>
            <span className="hidden sm:block text-sm" style={{ color: i === step ? '#E8EAF0' : '#6B7A99' }}>{s}</span>
            {i < STEPS.length - 1 && <div className="w-8 h-px" style={{ backgroundColor: '#1A2A4A' }} />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent>
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <Input label="Tournament Name *" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Bangladesh Open Cup #1" />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="Tournament rules and details..."
                  rows={4} className="w-full px-4 py-2.5 rounded-lg border text-white placeholder-gray-500 resize-none"
                  style={{ backgroundColor: '#0A1020', borderColor: '#374151', outline: 'none' }} />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Bracket Format</label>
                <div className="grid grid-cols-1 gap-2">
                  {BRACKETS.map(b => (
                    <button key={b.value} onClick={() => set('bracket_type', b.value)}
                      className="p-3 rounded-lg text-left text-sm font-medium transition-colors"
                      style={{ backgroundColor: form.bracket_type === b.value ? 'rgba(0,212,255,0.1)' : '#0A1020', border: `1px solid ${form.bracket_type === b.value ? '#00D4FF' : '#1A2A4A'}`, color: form.bracket_type === b.value ? '#00D4FF' : '#E8EAF0' }}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Max Teams</label>
                <div className="flex gap-2 flex-wrap">
                  {MAX_TEAMS.map(n => (
                    <button key={n} onClick={() => set('max_teams', n)}
                      className="w-16 py-2 rounded-lg text-sm font-bold transition-colors"
                      style={{ backgroundColor: form.max_teams === n ? '#00D4FF' : '#0A1020', color: form.max_teams === n ? '#040810' : '#6B7A99', border: `1px solid ${form.max_teams === n ? '#00D4FF' : '#1A2A4A'}` }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Map</label>
                  <select value={form.map} onChange={e => set('map', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-white"
                    style={{ backgroundColor: '#0A1020', borderColor: '#374151' }}>
                    {MAPS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" style={{ color: '#6B7A99' }}>Perspective</label>
                  <div className="flex gap-2">
                    {['TPP', 'FPP'].map(p => (
                      <button key={p} onClick={() => set('perspective', p)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-bold"
                        style={{ backgroundColor: form.perspective === p ? '#00D4FF' : '#0A1020', color: form.perspective === p ? '#040810' : '#6B7A99', border: `1px solid ${form.perspective === p ? '#00D4FF' : '#1A2A4A'}` }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Input label="Registration Deadline *" type="datetime-local" value={form.registration_deadline} onChange={e => set('registration_deadline', e.target.value)} min={minDate} />
              <Input label="Tournament Start Date *" type="datetime-local" value={form.start_date} onChange={e => set('start_date', e.target.value)} min={form.registration_deadline || minDate} />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <p style={{ color: '#6B7A99' }}>Using official PMGC scoring matrix. Customize kill points and special rules.</p>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[10,6,5,4,3,2,1,1].map((pts, i) => (
                  <div key={i} className="text-center p-2 rounded" style={{ backgroundColor: '#0A1020', border: '1px solid #1A2A4A' }}>
                    <div className="text-xs" style={{ color: '#6B7A99' }}>#{i+1}</div>
                    <div className="font-bold" style={{ color: i === 0 ? '#C8A951' : '#E8EAF0' }}>{pts}</div>
                  </div>
                ))}
              </div>
              <Input label="Kill Points" type="number" value={form.kill_points} onChange={e => set('kill_points', parseInt(e.target.value))} min="0" max="5" />
              <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#0A1020', border: '1px solid #1A2A4A' }}>
                <input type="checkbox" checked={form.smash_rule_enabled} onChange={e => set('smash_rule_enabled', e.target.checked)} id="smash" className="w-4 h-4" />
                <label htmlFor="smash" style={{ color: '#E8EAF0', cursor: 'pointer' }}>Enable Smash Rule</label>
              </div>
              {form.smash_rule_enabled && (
                <Input label="Smash Rule Threshold (points)" type="number" value={form.smash_rule_threshold} onChange={e => set('smash_rule_threshold', parseInt(e.target.value))} min="1" />
              )}
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-3">
              <h3 className="font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#E8EAF0', fontSize: '1.25rem' }}>Review Your Tournament</h3>
              {[['Name', form.name], ['Format', form.bracket_type], ['Max Teams', form.max_teams], ['Map', `${form.map} · ${form.perspective}`], ['Registration Deadline', form.registration_deadline], ['Start Date', form.start_date], ['Kill Points', form.kill_points]].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b" style={{ borderColor: '#1A2A4A' }}>
                  <span style={{ color: '#6B7A99' }}>{label}</span>
                  <span style={{ color: '#E8EAF0', fontWeight: 600 }}>{value as string}</span>
                </div>
              ))}
              {error && <p style={{ color: '#FF4444' }}>{error}</p>}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
              <ChevronLeft size={16} /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !form.name.trim()}>
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} isLoading={loading}>
                <Trophy size={16} className="mr-2" /> Create Tournament
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
