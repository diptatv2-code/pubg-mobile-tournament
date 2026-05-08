import { TournamentBrowse } from "./TournamentBrowse";
import { mockTournaments } from "@/lib/mock-data";

export const metadata = {
  title: "Browse Tournaments — PUBG Mobile Tournament",
  description: "Find PUBG Mobile tournaments by mode, status, and prize type.",
};

export default function TournamentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          Browse · {mockTournaments.length} tournaments
        </div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Find Your Fight
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Live, open, and upcoming tournaments. Filter by mode and status — entry can be free or paid.
        </p>
      </div>

      <TournamentBrowse tournaments={mockTournaments} />
    </div>
  );
}
