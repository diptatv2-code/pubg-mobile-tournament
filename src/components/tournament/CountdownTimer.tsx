"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  to: string | Date;
  className?: string;
  compact?: boolean;
  onZero?: () => void;
}

function getRemaining(to: Date) {
  const now = Date.now();
  const target = to.getTime();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds, isZero: target - now <= 0 };
}

export function CountdownTimer({ to, className, compact, onZero }: CountdownTimerProps) {
  const target = typeof to === "string" ? new Date(to) : to;
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = getRemaining(target);
      setT(next);
      if (next.isZero) onZero?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()]);

  if (!t) {
    return <div className={cn("text-sm text-[var(--color-muted)]", className)}>—</div>;
  }

  if (t.isZero) {
    return (
      <div className={cn("font-display text-lg font-bold text-[var(--color-success)]", className)}>
        STARTED
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("font-mono text-sm font-bold tabular-nums", className)}>
        {t.days > 0 && <span>{t.days}d </span>}
        <span>
          {String(t.hours).padStart(2, "0")}:{String(t.minutes).padStart(2, "0")}:
          {String(t.seconds).padStart(2, "0")}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TimeBlock value={t.days} label="Days" />
      <Separator />
      <TimeBlock value={t.hours} label="Hrs" />
      <Separator />
      <TimeBlock value={t.minutes} label="Min" />
      <Separator />
      <TimeBlock value={t.seconds} label="Sec" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center min-w-[52px]">
      <div className="font-display text-3xl font-extrabold leading-none tabular-nums text-white">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <span className="font-display text-2xl text-[var(--color-primary)] -mt-3 select-none">
      :
    </span>
  );
}
