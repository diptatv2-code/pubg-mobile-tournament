"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Trophy, ArrowRight } from "lucide-react";
import { getTopPlayers } from "@/lib/mock-data";
import { cn, formatNumber } from "@/lib/utils";

export function TopPlayersPreview() {
  const top = getTopPlayers(5);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Hall of Fame
          </div>
          <h2 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight">
            Top Ranked Players
          </h2>
        </div>
        <Link
          href="/tournaments"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] divide-y divide-[var(--color-border)] overflow-hidden">
        {top.map((p, i) => (
          <motion.div
            key={p.user.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={`/profile/${p.user.username}`}
              className="flex items-center gap-4 p-4 hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-md font-display text-lg font-extrabold",
                  i === 0
                    ? "bg-[var(--color-primary)] text-[#0a0a0f]"
                    : i === 1
                      ? "bg-[#c0c0c0]/20 text-[#c0c0c0] border border-[#c0c0c0]/40"
                      : i === 2
                        ? "bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/40"
                        : "text-[var(--color-muted)]",
                )}
              >
                {i + 1}
              </span>
              <Avatar fallback={p.user.username} size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{p.user.pubg_name}</div>
                <div className="text-xs text-[var(--color-muted)] truncate">
                  @{p.user.username} · {p.user.country || "—"}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-right">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                    Wins
                  </div>
                  <div className="font-display text-lg font-extrabold text-[var(--color-primary)]">
                    {p.stats.tournaments_won}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                    Kills
                  </div>
                  <div className="font-display text-lg font-extrabold">
                    {formatNumber(p.stats.total_kills)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                    Rating
                  </div>
                  <div className="font-display text-lg font-extrabold text-[var(--color-secondary)]">
                    {p.stats.rank_points}
                  </div>
                </div>
              </div>
              <Trophy
                className={cn(
                  "h-5 w-5 shrink-0",
                  i === 0
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted-2)]",
                )}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
