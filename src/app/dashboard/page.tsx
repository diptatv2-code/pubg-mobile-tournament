"use client";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/tournament/StatCard";
import { StatusBadge } from "@/components/tournament/StatusBadge";
import { mockTournaments, mockUsers, mockPlayerStats } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Trophy,
  Users,
  DollarSign,
  Megaphone,
  Settings2,
  ListChecks,
  PlusCircle,
  ArrowRight,
  Crown,
} from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  // Mock current user as VortexKing (organizer)
  const me = mockUsers.find((u) => u.id === "u3")!;
  const stats = mockPlayerStats[me.id];

  const hosting = mockTournaments.filter((t) => t.organizer_id === me.id);
  // Pretend some tournaments are ones I joined
  const registered = mockTournaments
    .filter((t) => t.organizer_id !== me.id && t.status !== "draft")
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <Avatar fallback={me.username} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Operator console
          </div>
          <h1 className="mt-1 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
            Welcome, {me.username}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {me.pubg_name} · ID {me.pubg_id} · {me.country}
          </p>
        </div>
        <Link href="/tournaments/create">
          <Button variant="primary" size="lg">
            <PlusCircle className="h-5 w-5" />
            New Tournament
          </Button>
        </Link>
      </div>

      {/* Stat overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard
          icon={Trophy}
          label="Tournaments Hosted"
          value={hosting.length}
          accent="primary"
        />
        <StatCard
          icon={Users}
          label="Total Participants"
          value={formatNumber(
            hosting.reduce((s, t) => s + t.registered_teams * 4, 0),
          )}
          accent="secondary"
        />
        <StatCard
          icon={DollarSign}
          label="Prize Distributed"
          value={formatCurrency(
            hosting
              .filter((t) => t.status === "completed")
              .reduce((s, t) => s + t.prize_pool, 0),
          )}
          accent="success"
        />
        <StatCard
          icon={Crown}
          label="Personal Wins"
          value={stats?.tournaments_won || 0}
          accent="danger"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Hosting */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
              You&apos;re hosting
            </h2>
            <span className="text-xs text-[var(--color-muted)]">
              {hosting.length} active
            </span>
          </div>
          {hosting.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                No tournaments yet
              </h3>
              <p className="mt-2 text-[var(--color-muted)]">
                Host your first one — it&apos;s free.
              </p>
              <Link href="/tournaments/create">
                <Button variant="primary" className="mt-5">
                  <PlusCircle className="h-4 w-4" />
                  Create Tournament
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {hosting.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/tournaments/${t.id}`}
                          className="font-display text-lg font-bold uppercase tracking-wider hover:text-[var(--color-primary)] transition-colors"
                        >
                          {t.title}
                        </Link>
                        <StatusBadge status={t.status} />
                      </div>
                      <div className="mt-1 text-xs text-[var(--color-muted)] flex items-center gap-2 flex-wrap">
                        <span>{t.map}</span>
                        <span>•</span>
                        <span>
                          {t.registered_teams}/{t.max_teams} teams
                        </span>
                        <span>•</span>
                        <span>{format(new Date(t.starts_at), "MMM d, HH:mm")}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/tournaments/${t.id}/manage`}>
                        <Button variant="primary" size="sm">
                          <Settings2 className="h-4 w-4" />
                          Manage
                        </Button>
                      </Link>
                      <Link href={`/tournaments/${t.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {(t.status === "ongoing" || t.status === "registration_open") && (
                    <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-[var(--color-border)]">
                      <QuickAction icon={ListChecks} label="Manage Teams" />
                      <QuickAction icon={Megaphone} label="Announcement" />
                      <QuickAction icon={Trophy} label="Enter Results" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registered */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
              You&apos;re competing
            </h2>
            <Link
              href="/tournaments"
              className="text-xs uppercase tracking-wider text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {registered.map((t) => (
            <Link
              key={t.id}
              href={`/tournaments/${t.id}`}
              className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-base font-bold uppercase tracking-wider line-clamp-1">
                    {t.title}
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-muted)]">
                    {t.map} · {t.game_mode} · {t.total_matches} matches
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[var(--color-muted)]">
                  {format(new Date(t.starts_at), "MMM d")}
                </span>
                <span className="text-[var(--color-primary)] font-bold">
                  {t.prize_pool === 0 ? "FREE" : formatCurrency(t.prize_pool)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] hover:text-white hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
