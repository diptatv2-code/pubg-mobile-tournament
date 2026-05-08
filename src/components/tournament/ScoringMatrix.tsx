"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Skull } from "lucide-react";
import type { ScoringConfig } from "@/types/database";

interface ScoringMatrixProps {
  value: ScoringConfig;
  onChange: (next: ScoringConfig) => void;
  readonly?: boolean;
}

export function ScoringMatrix({ value, onChange, readonly }: ScoringMatrixProps) {
  const updatePlacement = (placement: number, points: number) => {
    onChange({
      ...value,
      placement_points: value.placement_points.map((p) =>
        p.placement === placement ? { ...p, points } : p,
      ),
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <Label className="flex items-center gap-2">
          <Skull className="h-3.5 w-3.5 text-[var(--color-danger)]" />
          Kill points (per kill)
        </Label>
        <Input
          type="number"
          min={0}
          step={1}
          disabled={readonly}
          value={value.kill_points}
          onChange={(e) =>
            onChange({ ...value, kill_points: Number(e.target.value) || 0 })
          }
          className="mt-2 max-w-[160px]"
        />
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <Label className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5 text-[var(--color-primary)]" />
          Placement points
        </Label>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8">
          {value.placement_points.map((p) => (
            <div
              key={p.placement}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-2"
            >
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] text-center">
                #{p.placement}
              </div>
              <Input
                type="number"
                min={0}
                step={1}
                disabled={readonly}
                value={p.points}
                onChange={(e) =>
                  updatePlacement(p.placement, Number(e.target.value) || 0)
                }
                className="mt-1 h-8 text-center text-base font-bold"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
