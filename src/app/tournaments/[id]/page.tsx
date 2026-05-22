import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { TournamentDetail } from "./TournamentDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: t } = await supabaseAdmin
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();
  if (!t) return { title: "Tournament not found" };
  return {
    title: `${t.title} — PUBG Mobile Tournament`,
    description: t.description,
  };
}

export default async function TournamentPage({
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

  const { data: teams } = await supabaseAdmin
    .from("teams")
    .select("*, team_members(*)")
    .eq("tournament_id", id);

  const { data: matches } = await supabaseAdmin
    .from("matches")
    .select("*")
    .eq("tournament_id", id)
    .order("match_number");

  return (
    <TournamentDetail
      tournament={tournament}
      teams={teams || []}
      matches={matches || []}
      leaderboard={[]}
    />
  );
}
