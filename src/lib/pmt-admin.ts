import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Server-side admin check using pmt_is_admin() SECURITY DEFINER function.
 * Call this at the TOP of every admin API route handler and server action.
 * Returns { isAdmin: true } or throws/returns 403.
 */
export async function requirePmtAdmin(): Promise<{ userId: string }> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  );

  // 1. Check session exists
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new AdminUnauthorizedError("No valid session");
  }

  // 2. Call pmt_is_admin() — SECURITY DEFINER, checks pmt_admins table
  const { data, error } = await supabase.rpc("pmt_is_admin");
  if (error) throw new AdminUnauthorizedError("pmt_is_admin() error: " + error.message);
  if (!data) throw new AdminUnauthorizedError("User is not a pmt admin");

  return { userId: user.id };
}

export class AdminUnauthorizedError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "AdminUnauthorizedError";
  }
}

/**
 * Wrap an admin route handler with automatic 403 on non-admin.
 * Usage: export const POST = withPmtAdmin(async (req, ctx, userId) => { ... })
 */
export function withPmtAdmin(
  handler: (req: Request, ctx: any, userId: string) => Promise<Response>
) {
  return async (req: Request, ctx: any): Promise<Response> => {
    try {
      const { userId } = await requirePmtAdmin();
      return await handler(req, ctx, userId);
    } catch (e) {
      if (e instanceof AdminUnauthorizedError) {
        return NextResponse.json(
          { error: "Forbidden", message: e.message },
          { status: 403 }
        );
      }
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}
