import { z } from 'zod'

export const createTeamSchema = z.object({
  name: z.string().min(3).max(30).regex(/^[a-zA-Z0-9\s]+$/, 'Alphanumeric and spaces only'),
  tournament_id: z.string().uuid(),
})

export type CreateTeamInput = z.infer<typeof createTeamSchema>
