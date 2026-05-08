"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Tournament, GameMode, TournamentStatus } from "@/types/database";

interface TournamentBrowseProps {
  tournaments: Tournament[];
}

const PAGE_SIZE = 9;

export function TournamentBrowse({ tournaments }: TournamentBrowseProps) {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<GameMode | "all">("all");
  const [status, setStatus] = useState<TournamentStatus | "all">("all");
  const [prize, setPrize] = useState<"all" | "free" | "paid">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return tournaments.filter((t) => {
      if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (mode !== "all" && t.game_mode !== mode) return false;
      if (status !== "all" && t.status !== status) return false;
      if (prize === "free" && t.entry_fee > 0) return false;
      if (prize === "paid" && t.entry_fee === 0) return false;
      return true;
    });
  }, [tournaments, q, mode, status, prize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setQ("");
    setMode("all");
    setStatus("all");
    setPrize("all");
    setPage(1);
  };

  const filtersActive =
    q !== "" || mode !== "all" || status !== "all" || prize !== "all";

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3.5">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
          {filtersActive && (
            <button
              type="button"
              onClick={reset}
              className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_180px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search tournaments…"
              className="pl-9"
            />
          </div>
          <Select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as GameMode | "all");
              setPage(1);
            }}
          >
            <option value="all">All modes</option>
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="squad">Squad</option>
          </Select>
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as TournamentStatus | "all");
              setPage(1);
            }}
          >
            <option value="all">All statuses</option>
            <option value="registration_open">Registration Open</option>
            <option value="ongoing">Live</option>
            <option value="registration_closed">Closed</option>
            <option value="completed">Completed</option>
          </Select>
          <Select
            value={prize}
            onChange={(e) => {
              setPrize(e.target.value as "all" | "free" | "paid");
              setPage(1);
            }}
          >
            <option value="all">Free + paid</option>
            <option value="free">Free entry</option>
            <option value="paid">Paid entry</option>
          </Select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-16 text-center">
          <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
            No tournaments match your filters
          </h3>
          <p className="mt-2 text-[var(--color-muted)]">
            Try clearing some filters or check back later.
          </p>
          <Button variant="primary" className="mt-6" onClick={reset}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {slice.map((t, i) => (
              <TournamentCard key={t.id} tournament={t} delay={i * 0.05} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <div className="text-sm text-[var(--color-muted)] mx-3">
                Page <span className="text-white font-bold">{safePage}</span> /{" "}
                {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
