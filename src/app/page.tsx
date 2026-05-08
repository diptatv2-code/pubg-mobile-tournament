import Link from "next/link";
import Hero from "@/components/home/Hero";
import { LiveStatsBar } from "@/components/home/LiveStatsBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TopPlayersPreview } from "@/components/home/TopPlayersPreview";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { mockTournaments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featured = mockTournaments
    .filter((t) => t.status === "ongoing" || t.status === "registration_open")
    .slice(0, 3);

  return (
    <>
      <Hero />
      <LiveStatsBar />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              Featured · Live & Open
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Drop In Right Now
            </h2>
          </div>
          <Link href="/tournaments">
            <Button variant="outline" size="md">
              All tournaments <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <TournamentCard key={t.id} tournament={t} delay={i * 0.07} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <TopPlayersPreview />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(242,169,0,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Ready for your first <span className="text-[var(--color-primary)] text-glow">WWCD</span>?
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-[var(--color-muted)]">
              Sign up free, link your PUBG ID, and you&apos;re in the lobby. Hosting a tournament costs nothing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/auth/register">
                <Button size="xl" variant="primary">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/tournaments">
                <Button size="xl" variant="outline">
                  Browse Tournaments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
