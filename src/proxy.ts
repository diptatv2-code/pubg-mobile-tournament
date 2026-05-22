import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// BUG-06: Removed /hub/leaderboard and /hub/schedule — those are public
// Kept protected: /dashboard, /hub/roster, /hub/wallet, /hub/invites, /tournaments/create, /admin
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/hub/roster',
  '/hub/wallet',
  '/hub/invites',
  '/admin',
  '/tournaments/create',
]

function hasSupabaseSession(request: NextRequest): boolean {
  for (const cookie of request.cookies.getAll()) {
    if (cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')) {
      return true
    }
  }
  return (
    !!request.cookies.get('sb-access-token')?.value ||
    !!request.cookies.get('sb-auth-token')?.value
  )
}

export function proxy(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some(p =>
    request.nextUrl.pathname.startsWith(p),
  )
  if (isProtected && !hasSupabaseSession(request)) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/hub/roster/:path*',
    '/hub/wallet/:path*',
    '/hub/invites/:path*',
    '/admin/:path*',
    '/tournaments/create',
  ],
}
