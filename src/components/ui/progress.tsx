import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "primary" | "success" | "danger";
}

export function Progress({
  className,
  value,
  max = 100,
  variant = "primary",
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill =
    variant === "success"
      ? "bg-[var(--color-success)]"
      : variant === "danger"
        ? "bg-[var(--color-danger)]"
        : "bg-[var(--color-primary)]";
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-hover)]",
        className,
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-500", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
