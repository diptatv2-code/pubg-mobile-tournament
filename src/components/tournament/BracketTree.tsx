"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BracketMatch {
  id: string;
  round: number;
  team1: { name: string; score?: number; winner?: boolean } | null;
  team2: { name: string; score?: number; winner?: boolean } | null;
}

interface BracketTreeProps {
  matches: BracketMatch[];
  rounds: number;
}

export function BracketTree({ matches, rounds }: BracketTreeProps) {
  const grouped: BracketMatch[][] = [];
  for (let r = 1; r <= rounds; r++) {
    grouped.push(matches.filter((m) => m.round === r));
  }
  const roundLabels = ["Quarter Finals", "Semi Finals", "Final"];

  return (
    <div className="overflow-x-auto scrollbar-thin pb-4">
      <div className="flex gap-12 min-w-max p-4">
        {grouped.map((roundMatches, rIdx) => (
          <div key={rIdx} className="flex flex-col justify-around min-w-[240px]">
            <div className="mb-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Round {rIdx + 1}
              </div>
              <div className="font-display text-base font-bold text-white uppercase tracking-wider">
                {roundLabels[rounds - 3 + rIdx] || `Round ${rIdx + 1}`}
              </div>
            </div>
            <div
              className="flex flex-col gap-6"
              style={{
                gap: `${(rIdx + 1) * 24}px`,
                marginTop: rIdx > 0 ? `${rIdx * 24}px` : 0,
              }}
            >
              {roundMatches.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: rIdx * 0.1 + i * 0.05 }}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <BracketSlot team={m.team1} />
                  <div className="h-px bg-[var(--color-border)]" />
                  <BracketSlot team={m.team2} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BracketSlot({
  team,
}: {
  team: BracketMatch["team1"];
}) {
  if (!team) {
    return (
      <div className="flex h-10 items-center justify-between px-3 text-xs text-[var(--color-muted-2)]">
        <span>TBD</span>
        <span>—</span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-between px-3 transition-colors",
        team.winner
          ? "bg-[var(--color-primary)]/10 text-white"
          : "text-[var(--color-muted)]",
      )}
    >
      <span
        className={cn(
          "text-sm font-semibold truncate",
          team.winner && "text-white font-bold",
        )}
      >
        {team.name}
      </span>
      <span
        className={cn(
          "font-display text-base font-extrabold tabular-nums",
          team.winner ? "text-[var(--color-primary)]" : "text-[var(--color-muted-2)]",
        )}
      >
        {team.score ?? 0}
      </span>
    </div>
  );
}
