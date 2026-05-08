import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-muted)]",
        primary:
          "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/15 text-[var(--color-primary)]",
        secondary:
          "border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]",
        success:
          "border-[var(--color-success)]/40 bg-[var(--color-success)]/15 text-[var(--color-success)]",
        danger:
          "border-[var(--color-danger)]/40 bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
        outline: "border-[var(--color-border-strong)] text-white",
        live: "border-[var(--color-success)]/60 bg-[var(--color-success)]/15 text-[var(--color-success)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
