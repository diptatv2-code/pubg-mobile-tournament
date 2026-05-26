import { TournamentWizard } from "@/components/tournament/TournamentWizard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Host a Tournament — PUBG Mobile Tournament",
};

export default function CreateTournamentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          <Sparkles className="h-3 w-3" />
          Host
        </div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
          Create a Tournament
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-[var(--color-muted)]">
          Four steps. Five minutes. Zero hosting fees. Configure your format and schedule — then publish.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
        <TournamentWizard />
      </div>
    </div>
  );
}
