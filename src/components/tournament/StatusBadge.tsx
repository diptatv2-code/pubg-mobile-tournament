import { Badge } from "@/components/ui/badge";
import type { TournamentStatus, MatchStatus, TeamStatus } from "@/types/database";
import { cn } from "@/lib/utils";

const statusMap: Record<
  TournamentStatus | MatchStatus | TeamStatus,
  { label: string; variant: "default" | "primary" | "secondary" | "success" | "danger" | "outline" | "live" }
> = {
  draft: { label: "Draft", variant: "default" },
  registration_open: { label: "Registration Open", variant: "secondary" },
  registration_closed: { label: "Registration Closed", variant: "outline" },
  ongoing: { label: "Live", variant: "live" },
  completed: { label: "Completed", variant: "primary" },
  cancelled: { label: "Cancelled", variant: "danger" },
  scheduled: { label: "Scheduled", variant: "default" },
  registered: { label: "Registered", variant: "outline" },
  checked_in: { label: "Checked In", variant: "success" },
  disqualified: { label: "Disqualified", variant: "danger" },
  waitlisted: { label: "Waitlisted", variant: "default" },
};

interface StatusBadgeProps {
  status: TournamentStatus | MatchStatus | TeamStatus;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({ status, showDot, className }: StatusBadgeProps) {
  const { label, variant } = statusMap[status];
  const live = status === "ongoing";
  return (
    <Badge variant={variant} className={cn("font-bold", className)}>
      {(live || showDot) && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            live ? "bg-[var(--color-success)] pulse-dot" : "bg-current",
          )}
        />
      )}
      {label}
    </Badge>
  );
}
