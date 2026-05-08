import { Redis } from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

const isValidUrl = url && url.startsWith('https://')

export const redis =
  isValidUrl && token
    ? new Redis({ url, token })
    : null

export type LeaderboardEntry = {
  teamId: string
  score: number
  rank: number
}
