import { notFound } from "next/navigation";
import {
  getTournament,
  getUser,
  getTeamsForTournament,
  getMatchesForTournament,
  getLeaderboard,
} from "@/lib/mock-data";
import { TournamentDetail } from "./TournamentDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTournament(id);
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
  const tournament = getTournament(id);
  if (!tournament) notFound();

  const organizer = getUser(tournament.organizer_id);
  const teams = getTeamsForTournament(tournament.id);
  const matches = getMatchesForTournament(tournament.id);
  const leaderboard = getLeaderboard(tournament.id);

  return (
    <TournamentDetail
      tournament={tournament}
      organizer={organizer}
      teams={teams}
      matches={matches}
      leaderboard={leaderboard}
    />
  );
}
