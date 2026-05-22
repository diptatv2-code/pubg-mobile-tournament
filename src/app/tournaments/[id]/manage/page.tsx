import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase";
import { ManageDashboard } from "./ManageDashboard";

export const metadata = {
  title: "Manage Tournament — PUBG Mobile Tournament",
};

async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  let accessToken: string | undefined;
  for (const c of cookieStore.getAll()) {
    if (c.name.startsWith("sb-") && c.name.endsWith("-auth-token")) {
      try {
        const parsed = JSON.parse(c.value);
        if (parsed?.access_token) {
          accessToken = parsed.access_token as string;
          break;
        }
      } catch {
        accessToken = c.value;
        break;
      }
    }
  }
  accessToken =
    accessToken ||
    cookieStore.get("sb-access-token")?.value ||
    cookieStore.get("sb-auth-token")?.value;
  if (!accessToken) return null;
  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data } = await anon.auth.getUser(accessToken);
  return data?.user?.id ?? null;
}

export default async function ManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: tournament } = await supabaseAdmin
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (!tournament) notFound();

  const userId = await getSessionUserId();
  if (!userId) redirect(`/auth/login?next=/tournaments/${id}/manage`);
  if (userId !== tournament.organizer_id) {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("is_admin, role")
      .eq("id", userId)
      .single();
    const isAdmin = profile?.is_admin === true || profile?.role === "admin";
    if (!isAdmin) redirect(`/tournaments/${id}`);
  }

  const { data: teams } = await supabaseAdmin
    .from("teams")
    .select("*, team_members(*)")
    .eq("tournament_id", id);

  const { data: matches } = await supabaseAdmin
    .from("matches")
    .select("*")
    .eq("tournament_id", id)
    .order("match_number");

  const { data: announcements } = await supabaseAdmin
    .from("tournament_announcements")
    .select("*")
    .eq("tournament_id", id)
    .order("created_at", { ascending: false });

  return (
    <ManageDashboard
      tournament={tournament}
      teams={teams || []}
      matches={matches || []}
      leaderboard={[]}
      announcements={announcements || []}
    />
  );
}
