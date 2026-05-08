import { notFound } from "next/navigation";
import { getUserByUsername, mockPlayerStats, mockTournaments, mockTeams } from "@/lib/mock-data";
import { ProfileView } from "./ProfileView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) return { title: "Player not found" };
  return { title: `${user.username} — PUBG Mobile Tournament` };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) notFound();

  const stats = mockPlayerStats[user.id];

  // Find teams + tournaments user is part of
  const playerTeams = mockTeams.filter((t) =>
    t.members.some((m) => m.user_id === user.id),
  );
  const tournaments = playerTeams
    .map((tm) => mockTournaments.find((t) => t.id === tm.tournament_id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <ProfileView
      user={user}
      stats={stats}
      teams={playerTeams}
      tournaments={tournaments}
    />
  );
}
