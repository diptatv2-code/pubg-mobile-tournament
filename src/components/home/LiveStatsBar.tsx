"use client";
import { useEffect, useState } from "react";
import { Trophy, Users, DollarSign, Zap } from "lucide-react";
import { StatCard } from "@/components/tournament/StatCard";
import { mockGlobalStats } from "@/lib/mock-data";

function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function formatPretty(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return Math.round(n).toLocaleString();
  return n.toString();
}

export function LiveStatsBar() {
  const tournaments = useCounter(mockGlobalStats.total_tournaments);
  const players = useCounter(mockGlobalStats.active_players);
  const prizes = useCounter(mockGlobalStats.prize_pool_distributed);
  const live = useCounter(mockGlobalStats.live_now);
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Trophy}
            label="Tournaments Hosted"
            value={formatPretty(tournaments)}
            accent="primary"
            delay={0}
          />
          <StatCard
            icon={Users}
            label="Active Players"
            value={formatPretty(players)}
            accent="secondary"
            delay={0.05}
          />
          <StatCard
            icon={DollarSign}
            label="Prize Distributed"
            value={`$${formatPretty(prizes)}`}
            accent="success"
            delay={0.1}
          />
          <StatCard
            icon={Zap}
            label="Live Now"
            value={live}
            accent="danger"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
