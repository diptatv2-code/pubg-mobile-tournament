"use client";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { cn, ordinal } from "@/lib/utils";
import { Crown, Skull, Target } from "lucide-react";
import type { LeaderboardEntry } from "@/types/database";

interface LiveLeaderboardProps {
  entries: LeaderboardEntry[];
  totalMatches: number;
  isLive?: boolean;
}

export function LiveLeaderboard({ entries, totalMatches, isLive }: LiveLeaderboardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3.5">
        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-wider">
            Overall Standings
          </h3>
          <p className="text-xs text-[var(--color-muted)]">
            Aggregate scoring across {totalMatches} matches
          </p>
        </div>
        {isLive && (
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success)]">
              Live
            </span>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Team</TableHead>
            {Array.from({ length: totalMatches }, (_, i) => (
              <TableHead key={i} className="text-center w-16">
                M{i + 1}
              </TableHead>
            ))}
            <TableHead className="text-center w-14">
              <Skull className="h-3.5 w-3.5 inline" />
            </TableHead>
            <TableHead className="text-center w-14">
              <Crown className="h-3.5 w-3.5 inline" />
            </TableHead>
            <TableHead className="text-right w-20">
              <Target className="h-3.5 w-3.5 inline mr-1" />
              Pts
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, idx) => {
            const rank = idx + 1;
            const isTop = rank <= 3;
            return (
              <motion.tr
                key={entry.team.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={cn(
                  "border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-hover)]",
                  rank === 1 && "bg-[var(--color-primary)]/5",
                )}
              >
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "inline-flex h-7 w-7 items-center justify-center rounded-md font-display font-bold text-sm",
                      rank === 1
                        ? "bg-[var(--color-primary)] text-[#0a0a0f]"
                        : rank === 2
                          ? "bg-[#c0c0c0]/20 text-[#c0c0c0] border border-[#c0c0c0]/40"
                          : rank === 3
                            ? "bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/40"
                            : "text-[var(--color-muted)]",
                    )}
                  >
                    {rank}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      fallback={entry.team.tag}
                      className={cn(
                        "rounded-md",
                        rank === 1 && "ring-2 ring-[var(--color-primary)]",
                      )}
                    />
                    <div>
                      <div className={cn("font-bold", isTop && "text-white")}>
                        {entry.team.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                        [{entry.team.tag}]
                      </div>
                    </div>
                  </div>
                </TableCell>
                {entry.per_match.map((m, i) => (
                  <TableCell key={i} className="text-center">
                    {m.placement > 0 ? (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold tabular-nums">
                          {m.points}
                        </span>
                        <span className="text-[9px] text-[var(--color-muted)]">
                          {ordinal(m.placement)} · {m.kills}k
                        </span>
                      </div>
                    ) : (
                      <span className="text-[var(--color-muted-2)]">—</span>
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold tabular-nums text-[var(--color-danger)]">
                  {entry.total_kills}
                </TableCell>
                <TableCell className="text-center font-bold tabular-nums text-[var(--color-primary)]">
                  {entry.wwcd_count}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "font-display text-xl font-extrabold tabular-nums",
                      rank === 1 ? "text-[var(--color-primary)] text-glow" : "text-white",
                    )}
                  >
                    {entry.total_points}
                  </span>
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
