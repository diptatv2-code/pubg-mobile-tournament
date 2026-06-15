import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

/**
 * Authenticate the current user from cookies.
 * Returns { user } or null if not authenticated.
 */
export async function getAuthUser() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) =>
            cs.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            ),
        },
      }
    )
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) return null
    return user
  } catch {
    return null
  }
}

/**
 * Wrap an API route handler with user authentication.
 * Returns 401 if not authenticated.
 */
export function withAuth(
  handler: (req: Request, ctx: any, userId: string) => Promise<Response>
) {
  return async (req: Request, ctx: any): Promise<Response> => {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in" },
        { status: 401 }
      )
    }
    return handler(req, ctx, user.id)
  }
}
