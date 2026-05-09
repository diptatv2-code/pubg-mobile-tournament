import { Redis } from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export const redis = url && token && url.startsWith('https://')
  ? new Redis({ url, token })
  : null

export interface LeaderboardEntry {
  teamId: string
  teamName?: string
  score: number
  rank: number
}
