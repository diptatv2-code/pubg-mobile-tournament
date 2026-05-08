"use client";
import { motion } from "framer-motion";
import { Skull, Target } from "lucide-react";
import { mockKillFeed } from "@/lib/mock-data";

export function KillFeedTicker() {
  const items = [...mockKillFeed, ...mockKillFeed];
  return (
    <div className="relative w-full overflow-hidden border-y border-[var(--color-border)] bg-black/40 py-2.5">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {items.map((k, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-success)] font-bold">{k.killer}</span>
            <Skull className="h-3.5 w-3.5 text-[var(--color-danger)]" />
            <span className="text-[var(--color-muted)]">{k.victim}</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted-2)] border border-[var(--color-border)] rounded px-1.5 py-0.5">
              {k.weapon}
            </span>
            {k.headshot && (
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--color-primary)] font-bold">
                <Target className="h-3 w-3" />
                HS
              </span>
            )}
            <span className="text-[10px] text-[var(--color-muted-2)]">
              {k.distance}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
