"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tournament } from "@/types/database";
import { CountdownTimer } from "./CountdownTimer";
import { StatusBadge } from "./StatusBadge";
import { cn, formatCurrency } from "@/lib/utils";
import { Trophy, Users, Map as MapIcon, Crown, Swords } from "lucide-react";

interface TournamentCardProps {
  tournament: Tournament;
  delay?: number;
}

const modeIcons = {
  solo: Crown,
  duo: Swords,
  squad: Users,
};

export function TournamentCard({ tournament: t, delay = 0 }: TournamentCardProps) {
  const ModeIcon = modeIcons[t.game_mode];
  const isLive = t.status === "ongoing";
  const isOpen = t.status === "registration_open";
  const fillPct = (t.registered_teams / t.max_teams) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        href={`/tournaments/${t.id}`}
        className={cn(
          "group relative block overflow-hidden rounded-xl border bg-[var(--color-surface)] transition-all duration-300",
          isLive
            ? "border-[var(--color-success)]/50 shadow-[0_0_24px_-8px_rgba(0,255,136,0.4)] hover:shadow-[0_0_36px_-6px_rgba(0,255,136,0.6)]"
            : "border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[0_0_24px_-8px_rgba(242,169,0,0.4)]",
        )}
      >
        {/* Banner */}
        <div className="relative h-40 overflow-hidden">
          <div
            className={cn(
              "absolute inset-0",
              isLive
                ? "bg-gradient-to-br from-[var(--color-success)]/30 via-[var(--color-secondary)]/20 to-[var(--color-bg)]"
                : t.game_mode === "solo"
                  ? "bg-gradient-to-br from-[var(--color-danger)]/30 via-[var(--color-primary)]/20 to-[var(--color-bg)]"
                  : t.game_mode === "duo"
                    ? "bg-gradient-to-br from-[var(--color-secondary)]/30 via-[var(--color-primary)]/20 to-[var(--color-bg)]"
                    : "bg-gradient-to-br from-[var(--color-primary)]/40 via-[#ff7a00]/20 to-[var(--color-bg)]",
            )}
          />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(10,10,15,0.9)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <ModeIcon className="h-20 w-20 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="absolute top-3 left-3">
            <StatusBadge status={t.status} />
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
            <ModeIcon className="h-3 w-3" />
            {t.game_mode}
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-white line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
            {t.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <MapIcon className="h-3 w-3" />
            <span>{t.map}</span>
            <span className="text-[var(--color-muted-2)]">•</span>
            <span>
              {t.format === "battle_royale"
                ? "Battle Royale"
                : t.format === "single_elim"
                  ? "Single Elim"
                  : t.format === "double_elim"
                    ? "Double Elim"
                    : "Round Robin"}
            </span>
            <span className="text-[var(--color-muted-2)]">•</span>
            <span>{t.total_matches} matches</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Prize Pool
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-[var(--color-primary)]" />
                <span className="font-display text-xl font-extrabold text-[var(--color-primary)] text-glow">
                  {t.prize_pool === 0 ? "FREE" : formatCurrency(t.prize_pool)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Entry
              </div>
              <div className="mt-0.5 font-display text-xl font-extrabold text-white">
                {t.entry_fee === 0 ? "Free" : formatCurrency(t.entry_fee)}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider mb-1.5">
              <span className="text-[var(--color-muted)]">
                {t.registered_teams} / {t.max_teams} {t.game_mode === "solo" ? "players" : "teams"}
              </span>
              <span className={cn(fillPct >= 90 ? "text-[var(--color-danger)]" : "text-[var(--color-muted)]")}>
                {fillPct.toFixed(0)}%
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-hover)]">
              <div
                className={cn(
                  "h-full transition-all",
                  fillPct >= 90
                    ? "bg-[var(--color-danger)]"
                    : isLive
                      ? "bg-[var(--color-success)]"
                      : "bg-[var(--color-primary)]",
                )}
                style={{ width: `${fillPct}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              {isLive ? "Live now" : isOpen ? "Starts in" : t.status === "completed" ? "Completed" : "Begins"}
            </div>
            {isLive ? (
              <span className="font-display text-sm font-bold text-[var(--color-success)] uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
                In progress
              </span>
            ) : t.status === "completed" ? (
              <span className="text-xs text-[var(--color-muted)]">
                {new Date(t.ends_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>
            ) : (
              <CountdownTimer to={t.starts_at} compact className="text-[var(--color-primary)]" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
