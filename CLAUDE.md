# PUBG MOBILE TOURNAMENT — CLAUDE.md

## Project
Free community-tier PUBG Mobile tournament management platform.
URL: pubgmobiletournament.com
Stack: Next.js 15 App Router + TypeScript strict + Tailwind CSS 4 + Supabase SSR + Upstash Redis + Vercel

## Build Commands
- Install: npm install
- Dev: npm run dev
- Build: npm run build (MUST PASS before every commit)
- Lint: npm run lint

## Environment Variables (already in .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://api.diptait.com.bd
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY4MDYwMjIzMSwiZXhwIjoxOTk2MTc4MjMxfQ.P-mOGqvPNXLN8ib6L3Kq5WY7nnYLiCHxomGZ_sZ6RDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjgwNjAyMjMxLCJleHAiOjE5OTYxNzgyMzF9.2KRPegAIJLaEsMbTMnuqxCr_qZJYGgwuqFGb4klFiP4
UPSTASH_REDIS_REST_URL=https://localhost
UPSTASH_REDIS_REST_TOKEN=placeholder
ROOM_CODE_SECRET=a8f3c2e1d4b7a9f0c3e6d8b2a5f1c4e7

## Design Tokens (EXACT — never change these)
CSS variables in globals.css:
--bg: #040810
--surface: #0A1020  
--card: #0F1B2E
--gold: #C8A951
--cyan: #00D4FF
--red: #FF4444
--text: #E8EAF0
--muted: #6B7A99

Fonts: Rajdhani (headings, weights 400/600/700) + Barlow Condensed (body, 400/500) — Google Fonts CDN

## Architecture
- Route groups: app/(public)/, app/(auth)/, app/(protected)/
- middleware.ts protects: /dashboard, /tournaments/create, /tournaments/*/manage
- lib/supabase/client.ts — browser client (@supabase/ssr createBrowserClient)
- lib/supabase/server.ts — server client (@supabase/ssr createServerClient)
- lib/supabase/middleware.ts — session refresh
- API routes: mutations only, no business logic in route handlers
- Business logic in lib/ (scoring.ts, checkin.ts, room-codes.ts, leaderboard.ts, bracket.ts, realtime.ts)

## TypeScript Rules
- strict mode ALWAYS — noImplicitAny, strictNullChecks
- NO any types anywhere
- Next.js 15 route handler params MUST be awaited: context: { params: Promise<{id:string}> } then const {id} = await context.params

## Database Tables (Supabase at api.diptait.com.bd)
profiles, tournaments, teams, roster, matches, match_results, room_distributions

## Conventions
- Filenames: kebab-case
- Components: PascalCase  
- Commits: feat: [T-XXX] title
- Never commit on red build
- Run npm run build after EVERY task

## HARD RULES
- Footer MUST include: "Not affiliated with Krafton Inc. or PUBG Mobile"
- No payment/wallet/entry fees (v1 is FREE)
- No PUBG API calls (no pubg.com API)
- No any TypeScript types
- Supabase write FIRST, then Redis (Redis is cache, Supabase is truth)

## Component Library
Build custom components — no shadcn/ui, no external component lib
Use: lucide-react (icons), framer-motion (animations), recharts (charts)
