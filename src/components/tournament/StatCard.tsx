"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  accent?: "primary" | "secondary" | "success" | "danger";
  className?: string;
  delay?: number;
}

const accentMap = {
  primary: "from-[var(--color-primary)]/30 to-transparent text-[var(--color-primary)]",
  secondary: "from-[var(--color-secondary)]/30 to-transparent text-[var(--color-secondary)]",
  success: "from-[var(--color-success)]/30 to-transparent text-[var(--color-success)]",
  danger: "from-[var(--color-danger)]/30 to-transparent text-[var(--color-danger)]",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent = "primary",
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 group hover:border-[var(--color-border-strong)] transition-colors",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-80 transition-opacity",
          accentMap[accent].split(" ").slice(0, 2).join(" "),
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {label}
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-3xl md:text-4xl font-extrabold text-white tabular-nums">
              {value}
            </span>
            {suffix && (
              <span className="text-sm font-semibold text-[var(--color-muted)] uppercase">
                {suffix}
              </span>
            )}
          </div>
        </div>
        <span
          className={cn(
            "grid h-10 w-10 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)]/60",
            accentMap[accent].split(" ").slice(2).join(" "),
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </motion.div>
  );
}
