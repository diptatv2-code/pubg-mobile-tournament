import { z } from 'zod'

export const registerSchema = z.object({
  display_name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
  pubg_uid: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password required'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
