# PUBGMOBILETOURNAMENT.COM — PUBG Mobile Tournament Platform
Stack: Next.js 16, TypeScript, Tailwind CSS 4, Supabase, Upstash Redis

## RULES
- run `npm run build` after ALL changes, fix every TypeScript error
- Server Components: NO inline event handlers (onMouseEnter etc) — CSS only
- 'use client' for any useState/useEffect/onClick
- Next.js 16 dynamic routes: `const { id } = await context.params`
- DO NOT touch: src/lib/redis.ts, src/lib/leaderboard.ts, src/lib/scoring.ts, src/lib/realtime.ts, src/app/api/**, supabase/

## Design
- BG:#040810, Surface:#0A1020, Card:#0F1B2E, Gold:#C8A951, Cyan:#00D4FF, Red:#FF4444
- Fonts: Rajdhani (headings) + Barlow (body) from Google Fonts
