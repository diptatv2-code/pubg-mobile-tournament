export type CheckinRecord = { teamId: string; matchId: string; checkedInAt: string; status: 'pending' | 'checked_in' | 'missed' | 'waitlisted' }
export type CheckinState = { matchId: string; opensAt: string; closesAt: string; maxTeams: number; records: CheckinRecord[] }

export function createCheckinWindow(matchId: string, matchStartsAt: string, windowMinutes = 30, maxTeams = 16): CheckinState {
  const start = new Date(matchStartsAt)
  const opensAt = new Date(start.getTime() - windowMinutes * 60000).toISOString()
  const closesAt = new Date(start.getTime() - 5 * 60000).toISOString()
  return { matchId, opensAt, closesAt, maxTeams, records: [] }
}

export function checkinTeam(state: CheckinState, teamId: string): { success: boolean; state: CheckinState; message: string } {
  const now = new Date().toISOString()
  if (now < state.opensAt) return { success: false, state, message: 'Check-in window not open yet' }
  if (now > state.closesAt) return { success: false, state, message: 'Check-in window closed' }
  if (state.records.some(r => r.teamId === teamId && r.status === 'checked_in')) return { success: false, state, message: 'Already checked in' }
  const checkedInCount = state.records.filter(r => r.status === 'checked_in').length
  const status = checkedInCount >= state.maxTeams ? 'waitlisted' : 'checked_in'
  const records = [...state.records.filter(r => r.teamId !== teamId), { teamId, matchId: state.matchId, checkedInAt: now, status } as CheckinRecord]
  return { success: true, state: { ...state, records }, message: status === 'waitlisted' ? 'Added to waitlist' : 'Checked in successfully' }
}

export function processMissedCheckins(state: CheckinState): CheckinState {
  let records = state.records.map(r => r.status === 'pending' ? { ...r, status: 'missed' as const } : r)
  const checkedIn = records.filter(r => r.status === 'checked_in').length
  const waitlisted = records.filter(r => r.status === 'waitlisted')
  const slots = state.maxTeams - checkedIn
  for (let i = 0; i < Math.min(slots, waitlisted.length); i++) {
    records = records.map(r => r.teamId === waitlisted[i].teamId ? { ...r, status: 'checked_in' as const } : r)
  }
  return { ...state, records }
}

export function getCheckedInTeams(state: CheckinState): string[] {
  return state.records.filter(r => r.status === 'checked_in').map(r => r.teamId)
}
