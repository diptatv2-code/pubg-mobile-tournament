"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/tournament/StatCard";
import { StatusBadge } from "@/components/tournament/StatusBadge";
import {
  Trophy,
  Crown,
  Skull,
  Target,
  Calendar,
  TrendingUp,
  Crosshair,
  DollarSign,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";
import { formatNumber, formatCurrency } from "@/lib/utils";
import type { User, PlayerStats, Team, Tournament } from "@/types/database";

interface ProfileViewProps {
  user: User;
  stats?: PlayerStats;
  teams: Team[];
  tournaments: Tournament[];
}

export function ProfileView({ user, stats, teams, tournaments }: ProfileViewProps) {
  // Without historical rating snapshots we can only plot the current point.
  // The chart degrades to an empty state when there is nothing to show.
  const ratingSeries = stats
    ? [{ name: "Now", rating: stats.rank_points }]
    : [];

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(242,169,0,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Avatar fallback={user.username} size="xl" className="!h-28 !w-28 !text-3xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="primary">{user.role}</Badge>
                {user.country && (
                  <Badge variant="outline">{user.country}</Badge>
                )}
              </div>
              <h1 className="mt-2 font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
                {user.username}
              </h1>
              <p className="mt-1 text-[var(--color-muted)]">
                <span className="text-white font-semibold">{user.pubg_name}</span>
                <span className="mx-2 text-[var(--color-muted-2)]">·</span>
                <span className="text-xs uppercase tracking-wider">PUBG ID {user.pubg_id}</span>
              </p>
              {user.bio && (
                <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)] leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>
            {stats && (
              <div className="rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-6 py-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary)]">
                  Rank Rating
                </div>
                <div className="mt-1 font-display text-4xl font-extrabold text-[var(--color-primary)] text-glow">
                  {stats.rank_points}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <StatCard icon={Trophy} label="Tournaments" value={stats.tournaments_played} accent="primary" />
            <StatCard icon={Crown} label="Wins" value={stats.tournaments_won} accent="secondary" />
            <StatCard icon={Skull} label="Total Kills" value={formatNumber(stats.total_kills)} accent="danger" />
            <StatCard
              icon={DollarSign}
              label="Earnings"
              value={formatCurrency(stats.total_winnings)}
              accent="success"
            />
          </div>
        )}

        <Tabs defaultValue="stats">
          <TabsList>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="history">Match History</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                    Rating Progress
                  </h3>
                  {ratingSeries.length > 1 && (
                    <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-[var(--color-success)] font-bold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Last {ratingSeries.length} matches
                    </span>
                  )}
                </div>
                <div className="h-[260px]">
                  {ratingSeries.length === 0 ? (
                    <div className="h-full grid place-items-center text-sm text-[var(--color-muted)]">
                      No rating history yet. Play tournament matches to build a graph.
                    </div>
                  ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratingSeries}>
                      <defs>
                        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f2a900" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#f2a900" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="#5a5a78"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#5a5a78"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        domain={["auto", "auto"]}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#12121a",
                          border: "1px solid #25253a",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#f2a900"
                        strokeWidth={3}
                        dot={{ fill: "#f2a900", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  )}
                </div>
              </div>

              {stats && (
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3">
                  <h3 className="font-display text-base font-bold uppercase tracking-wider">
                    Combat Profile
                  </h3>
                  <StatRow
                    icon={Target}
                    label="Win Rate"
                    value={`${stats.win_rate.toFixed(1)}%`}
                  />
                  <StatRow
                    icon={Crosshair}
                    label="Avg Placement"
                    value={`#${stats.avg_placement.toFixed(1)}`}
                  />
                  <StatRow
                    icon={Skull}
                    label="K/D"
                    value={(stats.total_kills / Math.max(1, stats.total_matches)).toFixed(2)}
                  />
                  <StatRow
                    icon={Trophy}
                    label="WWCD Rate"
                    value={`${((stats.tournaments_won / Math.max(1, stats.tournaments_played)) * 100).toFixed(1)}%`}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              {tournaments.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[var(--color-muted)]">No match history yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {tournaments.map((t) => {
                    const team = teams.find((x) => x.tournament_id === t.id);
                    return (
                      <Link
                        key={t.id}
                        href={`/tournaments/${t.id}`}
                        className="flex flex-wrap items-center gap-4 p-4 hover:bg-[var(--color-surface-hover)] transition-colors"
                      >
                        <div className="flex-1 min-w-[160px]">
                          <div className="font-display text-base font-bold uppercase tracking-wider">
                            {t.title}
                          </div>
                          <div className="mt-1 text-xs text-[var(--color-muted)] flex items-center gap-2 flex-wrap">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(t.starts_at), "MMM d, yyyy")}</span>
                            <span>•</span>
                            <span>{t.map}</span>
                            <span>•</span>
                            <span>{t.game_mode}</span>
                          </div>
                        </div>
                        {team && (
                          <Badge variant="outline">
                            {team.name} [{team.tag}]
                          </Badge>
                        )}
                        <StatusBadge status={t.status} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="grid gap-3 md:grid-cols-2">
              {teams.length === 0 ? (
                <div className="md:col-span-2 rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
                  <p className="text-[var(--color-muted)]">Not on any teams yet.</p>
                </div>
              ) : (
                teams.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar fallback={t.tag} size="lg" className="rounded-md" />
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-lg font-bold uppercase tracking-wider truncate">
                          {t.name}
                        </div>
                        <div className="text-xs text-[var(--color-muted)]">
                          [{t.tag}] · {t.members.length} players
                        </div>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-[var(--color-bg)] p-3">
      <div className="flex items-center gap-2 text-[var(--color-muted)]">
        <Icon className="h-4 w-4 text-[var(--color-primary)]" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-display text-lg font-extrabold tabular-nums">{value}</span>
    </div>
  );
}
