const BASE = 'https://api.pubg.com/shards'

export type PubgMatchResult = {
  matchId: string
  teams: Array<{ name: string; placement: number; kills: number; survivalTime: number }>
}

export async function fetchPubgMatch(matchId: string, shard = 'kakao'): Promise<PubgMatchResult | null> {
  if (!process.env.PUBG_API_KEY) { console.warn('PUBG_API_KEY not set'); return null }
  try {
    const res = await fetch(`${BASE}/${shard}/matches/${matchId}`, {
      headers: { Authorization: `Bearer ${process.env.PUBG_API_KEY}`, Accept: 'application/vnd.api+json' }
    })
    if (!res.ok) return null
    const data = await res.json()
    const rosters = data.included?.filter((i: {type:string}) => i.type === 'roster') ?? []
    const teams = rosters.map((r: {attributes:{stats:{rank:number;kills:number;timeSurvived:number}};relationships:{participants:{data:{id:string}[]}}}) => ({
      name: r.relationships?.participants?.data?.[0]?.id ?? 'Unknown',
      placement: r.attributes?.stats?.rank ?? 0,
      kills: r.attributes?.stats?.kills ?? 0,
      survivalTime: r.attributes?.stats?.timeSurvived ?? 0,
    }))
    return { matchId, teams }
  } catch { return null }
}
