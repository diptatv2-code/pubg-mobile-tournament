import { z } from 'zod'

export const createTournamentSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  bracket_type: z.enum(['group_stage', 'single_elim', 'round_robin', 'async_ffa']),
  max_teams: z.number().min(4).max(64),
  registration_deadline: z.string(),
  start_date: z.string(),
  map: z.string(),
  perspective: z.enum(['TPP', 'FPP']),
  kill_points: z.number().min(0).max(5),
  wwcd_bonus: z.number().min(0).max(20),
  smash_rule_enabled: z.boolean(),
  smash_rule_threshold: z.number().min(10).max(100),
  scoring_matrix: z.object({
    placement: z.array(z.number()),
    kill_points: z.number(),
    wwcd_bonus: z.number(),
  }).optional(),
})

export type CreateTournamentInput = z.infer<typeof createTournamentSchema>
