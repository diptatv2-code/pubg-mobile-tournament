"use client";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { TeamRoster } from "@/components/tournament/TeamRoster";
import { LiveLeaderboard } from "@/components/tournament/LiveLeaderboard";
import { StatusBadge } from "@/components/tournament/StatusBadge";
import {
  ChevronRight,
  Copy,
  KeyRound,
  Megaphone,
  Send,
  Trophy,
  Users,
  Check,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type {
  Tournament,
  Team,
  Match,
  TournamentAnnouncement,
  LeaderboardEntry,
} from "@/types/database";

interface Props {
  tournament: Tournament;
  teams: Team[];
  matches: Match[];
  leaderboard: LeaderboardEntry[];
  announcements: TournamentAnnouncement[];
}

export function ManageDashboard({
  tournament: t,
  teams,
  matches,
  leaderboard,
  announcements: initialAnnouncements,
}: Props) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");

  const [roomCode, setRoomCode] = useState("47281950");
  const [roomPwd, setRoomPwd] = useState("BZCC2026");
  const [selectedMatch, setSelectedMatch] = useState(
    matches.find((m) => m.status === "ongoing")?.id || matches[0]?.id || "",
  );
  const [copied, setCopied] = useState(false);

  const [results, setResults] = useState<
    Record<string, { placement: number; kills: number }>
  >(
    Object.fromEntries(
      teams.map((tm, i) => [tm.id, { placement: i + 1, kills: 0 }]),
    ),
  );

  const checkedIn = teams.filter((x) => x.status === "checked_in").length;
  const registered = teams.filter((x) => x.status === "registered").length;
  const waitlisted = teams.filter((x) => x.status === "waitlisted").length;

  const sendAnnouncement = () => {
    if (!annTitle.trim()) return;
    setAnnouncements([
      {
        id: `a-${Date.now()}`,
        tournament_id: t.id,
        organizer_id: t.organizer_id,
        title: annTitle,
        message: annBody,
        created_at: new Date().toISOString(),
      },
      ...announcements,
    ]);
    setAnnTitle("");
    setAnnBody("");
  };

  const copyRoom = () => {
    void navigator.clipboard.writeText(`${roomCode} / ${roomPwd}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
        <Link href={`/tournaments/${t.id}`} className="hover:text-white transition-colors">
          {t.title}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span>Manage</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Organizer Console
          </div>
          <h1 className="mt-1 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
            Manage Tournament
          </h1>
        </div>
        <StatusBadge status={t.status} />
      </div>

      <Tabs defaultValue="participants">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="participants">
            Participants ({teams.length})
          </TabsTrigger>
          <TabsTrigger value="rooms">Room Codes</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* Participants */}
        <TabsContent value="participants">
          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            <SummaryCard
              icon={Check}
              label="Checked in"
              value={checkedIn}
              accent="text-[var(--color-success)]"
            />
            <SummaryCard
              icon={Users}
              label="Registered"
              value={registered}
              accent="text-[var(--color-secondary)]"
            />
            <SummaryCard
              icon={Trophy}
              label="Waitlisted"
              value={waitlisted}
              accent="text-[var(--color-primary)]"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {teams.map((team) => (
              <TeamRoster
                key={team.id}
                team={team}
                showActions
                onAction={() => {}}
              />
            ))}
          </div>
        </TabsContent>

        {/* Room codes */}
        <TabsContent value="rooms">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-[var(--color-primary)]" />
                Distribute Custom Room
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="match">Match</Label>
                  <Select
                    id="match"
                    value={selectedMatch}
                    onChange={(e) => setSelectedMatch(e.target.value)}
                    className="mt-2"
                  >
                    {matches.map((m) => (
                      <option key={m.id} value={m.id}>
                        Match {m.match_number} · {m.map} · {m.status}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="rc">Room Code</Label>
                    <Input
                      id="rc"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      placeholder="8-digit code"
                      className="mt-2 font-mono text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rp">Password</Label>
                    <Input
                      id="rp"
                      value={roomPwd}
                      onChange={(e) => setRoomPwd(e.target.value)}
                      placeholder="Room password"
                      className="mt-2 font-mono text-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" onClick={copyRoom}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="secondary">
                    <Send className="h-4 w-4" /> Distribute to {checkedIn} teams
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3">
              <h3 className="font-display text-base font-bold uppercase tracking-wider">
                Distribution log
              </h3>
              <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-xs">
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                  Match 4 · Erangel
                </div>
                <div className="font-mono text-base mt-1">47281950 / BZCC2026</div>
                <div className="mt-2 text-[var(--color-success)] flex items-center gap-1.5">
                  <Check className="h-3 w-3" />
                  Distributed to 16 teams
                </div>
                <div className="mt-1 text-[var(--color-muted-2)]">15 min ago</div>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed pt-2 border-t border-[var(--color-border)]">
                Pro tip: distribute room codes 5–10 minutes before match start so teams
                have time to enter the lobby.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Results */}
        <TabsContent value="results">
          <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4">
                Enter match results
              </h3>
              <div className="mb-4">
                <Label htmlFor="rm">Match</Label>
                <Select
                  id="rm"
                  value={selectedMatch}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  className="mt-2"
                >
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      Match {m.match_number} · {m.map}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="grid grid-cols-[1fr_70px_70px] items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar size="sm" fallback={team.tag} className="rounded-md" />
                      <span className="text-sm font-semibold truncate">{team.name}</span>
                    </div>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Pos"
                      value={results[team.id]?.placement || ""}
                      onChange={(e) =>
                        setResults((r) => ({
                          ...r,
                          [team.id]: {
                            ...r[team.id],
                            placement: Number(e.target.value) || 0,
                          },
                        }))
                      }
                      className="h-8 text-center"
                    />
                    <Input
                      type="number"
                      min={0}
                      placeholder="Kills"
                      value={results[team.id]?.kills || ""}
                      onChange={(e) =>
                        setResults((r) => ({
                          ...r,
                          [team.id]: {
                            ...r[team.id],
                            kills: Number(e.target.value) || 0,
                          },
                        }))
                      }
                      className="h-8 text-center"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
                <Button variant="primary">
                  <Trophy className="h-4 w-4" /> Save Results
                </Button>
                <Button variant="outline">Import Screenshot</Button>
              </div>
            </div>

            <LiveLeaderboard
              entries={leaderboard}
              totalMatches={t.total_matches}
              isLive={t.status === "ongoing"}
            />
          </div>
        </TabsContent>

        {/* Announcements */}
        <TabsContent value="announcements">
          <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-[var(--color-primary)]" />
                Broadcast
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="at">Title</Label>
                  <Input
                    id="at"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="e.g. Match 5 starting in 10 min"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="ab">Message</Label>
                  <Textarea
                    id="ab"
                    rows={6}
                    value={annBody}
                    onChange={(e) => setAnnBody(e.target.value)}
                    placeholder="Details for participants…"
                    className="mt-2"
                  />
                </div>
                <Button variant="primary" onClick={sendAnnouncement} className="w-full">
                  <Send className="h-4 w-4" /> Send to all participants
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                  Recent announcements
                </h3>
                <Badge variant="default">{announcements.length}</Badge>
              </div>
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-base font-bold uppercase tracking-wider">
                        {a.title}
                      </div>
                      <div className="text-xs text-[var(--color-muted)] mt-0.5">
                        {formatDistanceToNow(new Date(a.created_at), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <Megaphone className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                  </div>
                  {a.message && (
                    <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                      {a.message}
                    </p>
                  )}
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
                  <p className="text-[var(--color-muted)]">No announcements yet.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center gap-3">
      <span className={`grid h-10 w-10 place-items-center rounded-md bg-[var(--color-bg)] ${accent}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
          {label}
        </div>
        <div className="font-display text-2xl font-extrabold tabular-nums">{value}</div>
      </div>
    </div>
  );
}
