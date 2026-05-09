import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

function getKey(): Buffer {
  const secret = process.env.ROOM_CODE_SECRET || 'pubgmobiletournament2026default!'
  return Buffer.from(secret.padEnd(32, '0').slice(0, 32))
}

export function encryptRoomCode(roomId: string, password: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
  const payload = JSON.stringify({ roomId, password, ts: Date.now() })
  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

export function decryptRoomCode(encoded: string): { roomId: string; password: string; ts: number } {
  const buf = Buffer.from(encoded, 'base64')
  const iv = buf.subarray(0, 16)
  const tag = buf.subarray(16, 32)
  const encrypted = buf.subarray(32)
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return JSON.parse(decrypted.toString('utf8'))
}

export function isRoomCodeExpired(ts: number, maxAgeMs = 3600000): boolean {
  return Date.now() - ts > maxAgeMs
}
