"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/tournament/StatusBadge";
import { CountdownTimer } from "@/components/tournament/CountdownTimer";
import { LiveLeaderboard } from "@/components/tournament/LiveLeaderboard";
import { BracketTree, type BracketMatch } from "@/components/tournament/BracketTree";
import { TeamRoster } from "@/components/tournament/TeamRoster";
import { ScoringMatrix } from "@/components/tournament/ScoringMatrix";
import { formatCurrency } from "@/lib/utils";
import {
  Trophy,
  Map as MapIcon,
  Users,
  Crown,
  Swords,
  Calendar,
  ShieldCheck,
  Settings2,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import type {
  Tournament,
  Team,
  Match,
  User,
  LeaderboardEntry,
} from "@/types/database";

const modeIcons = { solo: Crown, duo: Swords, squad: Users };

interface DetailProps {
  tournament: Tournament;
  organizer?: User;
  teams: Team[];
  matches: Match[];
  leaderboard: LeaderboardEntry[];
}

export function TournamentDetail({
  tournament: t,
  organizer,
  teams,
  matches,
  leaderboard,
}: DetailProps) {
  const ModeIcon = modeIcons[t.game_mode];
  const isLive = t.status === "ongoing";
  const isOpen = t.status === "registration_open";
  const isCompleted = t.status === "completed";

  // For elimination format, we generate a fake bracket from teams
  const bracketMatches: BracketMatch[] =
    t.format === "single_elim"
      ? buildSingleElimBracket(teams)
      : [];
  const totalRounds = Math.max(1, Math.ceil(Math.log2(Math.max(2, teams.length))));

  return (
    <div className="pb-16">
      {/* Hero / Banner */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(242,169,0,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(0,180,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-camo" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-muted)]">
            <Link href="/tournaments" className="hover:text-white transition-colors">
              Tournaments
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t.title}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StatusBadge status={t.status} />
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              <ModeIcon className="h-3 w-3" /> {t.game_mode}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              <MapIcon className="h-3 w-3" /> {t.map}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {t.format.replace(/_/g, " ")}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-glow"
          >
            {t.title}
          </motion.h1>

          {organizer && (
            <Link
              href={`/profile/${organizer.username}`}
              className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-white transition-colors"
            >
              <Avatar fallback={organizer.username} size="sm" />
              <span>
                Organized by{" "}
                <span className="text-white font-semibold">{organizer.username}</span>
              </span>
            </Link>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Prize Pool">
                <span className="text-[var(--color-primary)] text-glow">
                  {t.prize_pool === 0 ? "FREE" : formatCurrency(t.prize_pool)}
                </span>
              </Stat>
              <Stat label="Entry">
                {t.entry_fee === 0 ? "Free" : formatCurrency(t.entry_fee)}
              </Stat>
              <Stat label={t.game_mode === "solo" ? "Players" : "Teams"}>
                {t.registered_teams} / {t.max_teams}
              </Stat>
            </div>

            <div className="md:text-right">
              {isLive ? (
                <div className="rounded-xl border border-[var(--color-success)]/40 bg-[var(--color-success)]/10 px-5 py-3.5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-success)]">
                    Live now
                  </div>
                  <div className="font-display text-2xl font-extrabold uppercase tracking-wider text-white">
                    Match in progress
                  </div>
                </div>
              ) : isOpen ? (
                <div className="rounded-xl border border-[var(--color-border)] bg-black/40 px-5 py-3.5 backdrop-blur">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    Tournament starts in
                  </div>
                  <CountdownTimer to={t.starts_at} className="mt-2" />
                </div>
              ) : isCompleted ? (
                <div className="rounded-xl border border-[var(--color-border)] bg-black/40 px-5 py-3.5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    Completed on
                  </div>
                  <div className="font-display text-xl font-extrabold uppercase tracking-wider">
                    {format(new Date(t.ends_at), "MMM d, yyyy")}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            {isOpen && (
              <Button variant="primary" size="lg">
                <Trophy className="h-4 w-4" /> Register Team
              </Button>
            )}
            {isLive && (
              <Button variant="secondary" size="lg">
                Watch Live
              </Button>
            )}
            <Link href={`/tournaments/${t.id}/manage`}>
              <Button variant="outline" size="lg">
                <Settings2 className="h-4 w-4" /> Manage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="overview">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bracket">
              {t.format === "battle_royale" ? "Leaderboard" : "Bracket"}
            </TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-3">
                    About
                  </h3>
                  <p className="text-[var(--color-muted)] leading-relaxed">{t.description}</p>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4">
                    Scoring System
                  </h3>
                  <ScoringMatrix
                    value={t.scoring_config}
                    onChange={() => {}}
                    readonly
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display text-base font-bold uppercase tracking-wider mb-3">
                    Prize Distribution
                  </h3>
                  <div className="space-y-2">
                    {t.prize_distribution.map((p, i) => (
                      <div
                        key={p.position}
                        className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="grid h-7 w-7 place-items-center rounded font-display text-sm font-extrabold"
                            style={{
                              background:
                                i === 0
                                  ? "var(--color-primary)"
                                  : i === 1
                                    ? "rgba(192,192,192,0.2)"
                                    : "rgba(205,127,50,0.2)",
                              color:
                                i === 0
                                  ? "#0a0a0f"
                                  : i === 1
                                    ? "#c0c0c0"
                                    : "#cd7f32",
                            }}
                          >
                            {p.position}
                          </span>
                          <span className="text-sm font-semibold uppercase tracking-wider">
                            {p.position === 1 ? "Champion" : `${p.position}${["", "st", "nd", "rd"][p.position] || "th"} place`}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-base font-extrabold text-[var(--color-primary)]">
                            {formatCurrency(p.amount)}
                          </div>
                          <div className="text-[10px] text-[var(--color-muted)]">
                            {p.percent}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3">
                  <h3 className="font-display text-base font-bold uppercase tracking-wider">
                    Quick Facts
                  </h3>
                  <Fact icon={MapIcon} label="Map" value={t.map} />
                  <Fact icon={ModeIcon} label="Mode" value={t.game_mode.toUpperCase()} />
                  <Fact icon={Trophy} label="Format" value={t.format.replace(/_/g, " ")} />
                  <Fact
                    icon={Users}
                    label="Capacity"
                    value={`${t.max_teams} ${t.game_mode === "solo" ? "players" : "teams"}`}
                  />
                  <Fact icon={Calendar} label="Matches" value={`${t.total_matches}`} />
                  <Fact icon={ShieldCheck} label="Anti-cheat" value="Strict" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bracket">
            {t.format === "battle_royale" ? (
              <LiveLeaderboard
                entries={leaderboard}
                totalMatches={t.total_matches}
                isLive={isLive}
              />
            ) : t.format === "single_elim" ? (
              <BracketTree matches={bracketMatches} rounds={totalRounds} />
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
                  Bracket coming soon
                </h3>
                <p className="mt-2 text-[var(--color-muted)]">
                  Format: {t.format.replace(/_/g, " ")}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams">
            <div className="grid gap-4 md:grid-cols-2">
              {teams.length === 0 ? (
                <div className="md:col-span-2 rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
                    No teams registered yet
                  </h3>
                  <p className="mt-2 text-[var(--color-muted)]">
                    Be the first squad to drop in.
                  </p>
                </div>
              ) : (
                teams.map((team) => <TeamRoster key={team.id} team={team} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="rules">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4">
                Tournament Rules
              </h3>
              <div className="prose prose-invert max-w-none text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
                {t.rules}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <RuleCard
                  title="Anti-Cheat"
                  body="Any player using radar, ESP, aimbot, or any third-party software is permanently banned and the team disqualified."
                />
                <RuleCard
                  title="Disconnections"
                  body="Disconnections are not grounds for replays. Have a stable connection — minimum 4G LTE or wired."
                />
                <RuleCard
                  title="Check-In"
                  body="All teams must check in 30 minutes before the scheduled match start. No-shows lose their slot."
                />
                <RuleCard
                  title="Disputes"
                  body="Submit disputes via the in-tournament channel within 30 minutes of match end. Admin decisions are final."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              {matches.length === 0 ? (
                <div className="p-12 text-center">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
                    Schedule pending
                  </h3>
                  <p className="mt-2 text-[var(--color-muted)]">
                    Match times will be announced once registration closes.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-wrap items-center gap-4 p-4 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] font-display text-base font-extrabold">
                        {m.match_number}
                      </span>
                      <div className="flex-1 min-w-[160px]">
                        <div className="font-bold uppercase tracking-wider">
                          Match {m.match_number}
                        </div>
                        <div className="text-xs text-[var(--color-muted)]">{m.map}</div>
                      </div>
                      <div className="text-sm text-[var(--color-muted)]">
                        {m.started_at
                          ? format(new Date(m.started_at), "MMM d, HH:mm")
                          : "TBD"}
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-black/40 px-5 py-3.5 backdrop-blur">
      <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
        {label}
      </div>
      <div className="mt-1 font-display text-3xl font-extrabold uppercase tracking-wider text-white">
        {children}
      </div>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-[var(--color-bg)] p-2.5">
      <div className="flex items-center gap-2 text-[var(--color-muted)]">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-bold uppercase tracking-wide text-white">
        {value}
      </span>
    </div>
  );
}

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
        {title}
      </div>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function buildSingleElimBracket(teams: Team[]): BracketMatch[] {
  // Pad to nearest power of 2
  const n = Math.max(2, 1 << Math.ceil(Math.log2(Math.max(2, teams.length))));
  const padded: (Team | null)[] = [...teams];
  while (padded.length < n) padded.push(null);

  const matches: BracketMatch[] = [];
  let id = 1;
  // Round 1
  for (let i = 0; i < n; i += 2) {
    const t1 = padded[i];
    const t2 = padded[i + 1];
    matches.push({
      id: `b-${id++}`,
      round: 1,
      team1: t1 ? { name: t1.name, score: Math.floor(Math.random() * 3) + 1, winner: i % 4 === 0 } : null,
      team2: t2 ? { name: t2.name, score: Math.floor(Math.random() * 3) + 1, winner: i % 4 !== 0 } : null,
    });
  }
  // Subsequent rounds (placeholders)
  let roundCount = n / 2;
  let round = 2;
  while (roundCount > 1) {
    roundCount /= 2;
    for (let i = 0; i < roundCount; i++) {
      matches.push({
        id: `b-${id++}`,
        round,
        team1: null,
        team2: null,
      });
    }
    round++;
  }
  return matches;
}
