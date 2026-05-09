const BANNED_CATEGORIES = ['tobacco','alcohol','gambling','betting','nft','firearms','pornography','crypto']

export function checkSponsorCategory(category: string): { allowed: boolean; reason?: string } {
  const lower = category.toLowerCase()
  if (BANNED_CATEGORIES.some(b => lower.includes(b))) {
    return { allowed: false, reason: `"${category}" sponsors are prohibited by PUBG publisher guidelines` }
  }
  return { allowed: true }
}

export function checkTeamName(name: string): { valid: boolean; issues: string[] } {
  const issues: string[] = []
  if (name.length < 3) issues.push('Name too short (min 3 chars)')
  if (name.length > 30) issues.push('Name too long (max 30 chars)')
  if (!/[a-zA-Z0-9]/.test(name)) issues.push('Name must contain letters or numbers')
  return { valid: issues.length === 0, issues }
}

export function validateTournamentForLaunch(t: { prizePool: number; licensingTier: string; prelaunchGate: boolean; esportsHubId?: string }): { canLaunch: boolean; blockers: string[] } {
  const blockers: string[] = []
  if (t.prizePool >= 30000) {
    if (!t.esportsHubId) blockers.push('High-tier tournament requires Esports Hub ID')
    if (!t.prelaunchGate) blockers.push('Pre-launch validation gate must be enabled for high-tier tournaments')
  }
  return { canLaunch: blockers.length === 0, blockers }
}
