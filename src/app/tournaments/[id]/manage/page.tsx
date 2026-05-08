import { notFound } from "next/navigation";
import {
  getTournament,
  getTeamsForTournament,
  getMatchesForTournament,
  getLeaderboard,
  getAnnouncementsForTournament,
} from "@/lib/mock-data";
import { ManageDashboard } from "./ManageDashboard";

export const metadata = {
  title: "Manage Tournament — PUBG Mobile Tournament",
};

export default async function ManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();

  return (
    <ManageDashboard
      tournament={t}
      teams={getTeamsForTournament(t.id)}
      matches={getMatchesForTournament(t.id)}
      leaderboard={getLeaderboard(t.id)}
      announcements={getAnnouncementsForTournament(t.id)}
    />
  );
}
