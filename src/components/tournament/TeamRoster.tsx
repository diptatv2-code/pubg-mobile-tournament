"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Crown, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Team } from "@/types/database";

interface TeamRosterProps {
  team: Team;
  defaultOpen?: boolean;
  showActions?: boolean;
  onAction?: (action: "approve" | "reject" | "checkin" | "dq", team: Team) => void;
}

export function TeamRoster({ team, defaultOpen, showActions, onAction }: TeamRosterProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between gap-3 p-4 hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Avatar fallback={team.tag} size="lg" className="rounded-md" />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold uppercase tracking-wider">
                {team.name}
              </span>
              <span className="text-xs text-[var(--color-muted)]">[{team.tag}]</span>
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">
              {team.members.length} player{team.members.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={team.status} />
          {open ? (
            <ChevronUp className="h-4 w-4 text-[var(--color-muted)]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[var(--color-muted)]" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--color-border)] p-4 space-y-2">
              {team.members.map((m) => {
                const isCaptain = m.role === "captain";
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-md p-2.5 transition-colors",
                      isCaptain
                        ? "border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5"
                        : "bg-[var(--color-bg)]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" fallback={m.pubg_name} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm">{m.pubg_name}</span>
                          {isCaptain && (
                            <Crown className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[var(--color-muted)]">
                          ID: {m.pubg_id}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                      {m.role}
                    </span>
                  </div>
                );
              })}
              {showActions && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--color-border)]">
                  {team.status === "registered" && (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onAction?.("checkin", team)}
                      >
                        Check In
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAction?.("approve", team)}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                  {team.status === "checked_in" && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onAction?.("dq", team)}
                    >
                      Disqualify
                    </Button>
                  )}
                  {team.status === "waitlisted" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onAction?.("approve", team)}
                    >
                      Promote
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
