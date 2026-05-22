"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ScoringMatrix } from "./ScoringMatrix";
import { DEFAULT_SCORING } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Coins,
  Calendar,
  Award,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ScoringConfig, GameMode, TournamentFormat, Tournament } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const STEPS = [
  { key: "basic", label: "Basics", icon: ClipboardList },
  { key: "format", label: "Format", icon: Trophy },
  { key: "scoring", label: "Scoring", icon: Award },
  { key: "schedule", label: "Schedule", icon: Calendar },
  { key: "prizes", label: "Prizes", icon: Coins },
  { key: "review", label: "Review", icon: Sparkles },
] as const;

const MAPS = ["Erangel", "Miramar", "Sanhok", "Vikendi", "Karakin", "Livik", "Mixed"];

interface WizardData {
  title: string;
  description: string;
  game_mode: GameMode;
  map: string;
  format: TournamentFormat;
  total_matches: number;
  max_teams: number;
  scoring: ScoringConfig;
  registration_opens_at: string;
  registration_closes_at: string;
  starts_at: string;
  entry_fee: number;
  prize_pool: number;
  first_pct: number;
  second_pct: number;
  third_pct: number;
}

const initial: WizardData = {
  title: "",
  description: "",
  game_mode: "squad",
  map: "Erangel",
  format: "battle_royale",
  total_matches: 6,
  max_teams: 16,
  scoring: DEFAULT_SCORING,
  registration_opens_at: "",
  registration_closes_at: "",
  starts_at: "",
  entry_fee: 0,
  prize_pool: 1000,
  first_pct: 50,
  second_pct: 30,
  third_pct: 20,
};

export function TournamentWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const update = <K extends keyof WizardData>(k: K, v: WizardData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const handlePublish = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user) { router.push("/auth/login"); return; }
    const wizardData = data;
    const slug = wizardData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload: Partial<Tournament> = {
      title: wizardData.title,
      description: wizardData.description,
      slug: slug + "-" + Date.now(),
      organizer_id: user.id,
      game_mode: wizardData.game_mode,
      map: wizardData.map,
      format: wizardData.format,
      total_matches: wizardData.total_matches,
      max_teams: wizardData.max_teams,
      scoring_config: wizardData.scoring,
      registration_opens_at: wizardData.registration_opens_at,
      registration_closes_at: wizardData.registration_closes_at,
      starts_at: wizardData.starts_at,
      entry_fee: wizardData.entry_fee,
      prize_pool: wizardData.prize_pool,
      prize_distribution: [
        { position: 1, percent: wizardData.first_pct, amount: Math.floor(wizardData.prize_pool * wizardData.first_pct / 100) },
        { position: 2, percent: wizardData.second_pct, amount: Math.floor(wizardData.prize_pool * wizardData.second_pct / 100) },
        { position: 3, percent: wizardData.third_pct, amount: Math.floor(wizardData.prize_pool * wizardData.third_pct / 100) },
      ],
      status: "draft",
      registered_teams: 0,
    };
    const { data: t, error } = await supabase.from("tournaments").insert(payload).select().single();
    if (error) { alert("Error: " + error.message); return; }
    setSubmitted(true);
    if (t) setTimeout(() => { router.push(`/tournaments/${t.id}/manage`); }, 2000);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[var(--color-success)]/40 bg-[var(--color-success)]/5 p-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--color-success)] text-[#0a0a0f]">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h2 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-wider">
          Tournament Created
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Your tournament has been published. Share the link to start collecting registrations.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="primary"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setData(initial);
            }}
          >
            Create Another
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isCurrent = i === step;
          const isDone = i < step;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => i <= step && setStep(i)}
              disabled={i > step}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0",
                isCurrent
                  ? "bg-[var(--color-primary)] text-[#0a0a0f] shadow-[0_0_20px_-6px_rgba(242,169,0,0.6)]"
                  : isDone
                    ? "bg-[var(--color-surface-hover)] text-white cursor-pointer"
                    : "text-[var(--color-muted)] cursor-not-allowed",
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded text-[10px]",
                  isCurrent
                    ? "bg-[#0a0a0f]/20"
                    : isDone
                      ? "bg-[var(--color-success)] text-[#0a0a0f]"
                      : "bg-[var(--color-border)]",
                )}
              >
                {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              <Icon className="h-3.5 w-3.5" />
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-hover)] mb-8">
        <div
          className="h-full bg-[var(--color-primary)] transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 && <StepBasic data={data} update={update} />}
          {step === 1 && <StepFormat data={data} update={update} />}
          {step === 2 && (
            <ScoringMatrix
              value={data.scoring}
              onChange={(s) => update("scoring", s)}
            />
          )}
          {step === 3 && <StepSchedule data={data} update={update} />}
          {step === 4 && <StepPrizes data={data} update={update} />}
          {step === 5 && <StepReview data={data} />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6">
        <Button variant="outline" onClick={prev} disabled={step === 0}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step === STEPS.length - 1 ? (
          <Button variant="primary" size="lg" onClick={handlePublish}>
            <Sparkles className="h-4 w-4" /> Publish Tournament
          </Button>
        ) : (
          <Button variant="primary" onClick={next}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function StepBasic({
  data,
  update,
}: {
  data: WizardData;
  update: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="title">Tournament Title</Label>
        <Input
          id="title"
          placeholder="e.g. PUBG Mobile Tournament Champions Cup"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className="mt-2"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="game_mode">Game Mode</Label>
          <Select
            id="game_mode"
            value={data.game_mode}
            onChange={(e) => update("game_mode", e.target.value as GameMode)}
            className="mt-2"
          >
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="squad">Squad (4-player)</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="map">Map</Label>
          <Select
            id="map"
            value={data.map}
            onChange={(e) => update("map", e.target.value)}
            className="mt-2"
          >
            {MAPS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Describe your tournament — format, vibe, who should join..."
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-2"
        />
      </div>
      <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-center">
        <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Banner Upload
        </div>
        <div className="mt-2 text-sm text-[var(--color-muted-2)]">
          Drop image or click to browse · PNG / JPG · 1920x600 recommended
        </div>
        <Button variant="outline" size="sm" className="mt-4" type="button">
          Choose File
        </Button>
      </div>
    </div>
  );
}

function StepFormat({
  data,
  update,
}: {
  data: WizardData;
  update: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  const formats: { key: TournamentFormat; label: string; desc: string }[] = [
    { key: "battle_royale", label: "Battle Royale Aggregate", desc: "Multiple BR matches, standings by total points." },
    { key: "single_elim", label: "Single Elimination", desc: "Bracket. One loss and you're out." },
    { key: "double_elim", label: "Double Elimination", desc: "Two losses to be eliminated. Lower bracket." },
    { key: "round_robin", label: "Round Robin", desc: "Every team plays every other team." },
  ];
  return (
    <div className="space-y-5">
      <div>
        <Label>Format</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {formats.map((f) => (
            <button
              type="button"
              key={f.key}
              onClick={() => update("format", f.key)}
              className={cn(
                "rounded-lg border p-4 text-left transition-all cursor-pointer",
                data.format === f.key
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-[0_0_18px_-6px_rgba(242,169,0,0.5)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]",
              )}
            >
              <div className="font-display text-base font-bold uppercase tracking-wider">
                {f.label}
              </div>
              <div className="mt-1 text-xs text-[var(--color-muted)]">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="total_matches">Total Matches</Label>
          <Input
            id="total_matches"
            type="number"
            min={1}
            max={50}
            value={data.total_matches}
            onChange={(e) => update("total_matches", Number(e.target.value) || 1)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="max_teams">Max Teams / Players</Label>
          <Input
            id="max_teams"
            type="number"
            min={2}
            max={1024}
            value={data.max_teams}
            onChange={(e) => update("max_teams", Number(e.target.value) || 2)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}

function StepSchedule({
  data,
  update,
}: {
  data: WizardData;
  update: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="reg_open">Registration Opens</Label>
          <Input
            id="reg_open"
            type="datetime-local"
            value={data.registration_opens_at}
            onChange={(e) => update("registration_opens_at", e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="reg_close">Registration Closes</Label>
          <Input
            id="reg_close"
            type="datetime-local"
            value={data.registration_closes_at}
            onChange={(e) => update("registration_closes_at", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="start">Tournament Starts</Label>
        <Input
          id="start"
          type="datetime-local"
          value={data.starts_at}
          onChange={(e) => update("starts_at", e.target.value)}
          className="mt-2"
        />
      </div>
      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs text-[var(--color-muted)]">
        Tip: leave at least 30 minutes between registration close and tournament start so teams can check in and you can distribute room codes.
      </div>
    </div>
  );
}

function StepPrizes({
  data,
  update,
}: {
  data: WizardData;
  update: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  const total = data.first_pct + data.second_pct + data.third_pct;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="entry">Entry Fee (USD)</Label>
          <Input
            id="entry"
            type="number"
            min={0}
            value={data.entry_fee}
            onChange={(e) => update("entry_fee", Number(e.target.value) || 0)}
            className="mt-2"
          />
          <p className="mt-1 text-[11px] text-[var(--color-muted)]">
            Set to 0 for free tournaments.
          </p>
        </div>
        <div>
          <Label htmlFor="pool">Prize Pool (USD)</Label>
          <Input
            id="pool"
            type="number"
            min={0}
            value={data.prize_pool}
            onChange={(e) => update("prize_pool", Number(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
      </div>
      <div>
        <Label>Distribution</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { key: "first_pct" as const, place: "1st", color: "text-[var(--color-primary)]" },
            { key: "second_pct" as const, place: "2nd", color: "text-[#c0c0c0]" },
            { key: "third_pct" as const, place: "3rd", color: "text-[#cd7f32]" },
          ].map((p) => (
            <div
              key={p.key}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className={cn("font-display text-2xl font-extrabold", p.color)}>
                {p.place}
              </div>
              <Input
                type="number"
                min={0}
                max={100}
                value={data[p.key]}
                onChange={(e) => update(p.key, Number(e.target.value) || 0)}
                className="mt-2"
              />
              <div className="mt-1 text-[11px] text-[var(--color-muted)]">
                {formatCurrency((data.prize_pool * data[p.key]) / 100)}
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "mt-3 text-xs uppercase tracking-wider font-semibold",
            total === 100 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]",
          )}
        >
          Total: {total}% {total !== 100 && "(must equal 100%)"}
        </div>
      </div>
    </div>
  );
}

function StepReview({ data }: { data: WizardData }) {
  return (
    <div className="space-y-4">
      <ReviewRow label="Title" value={data.title || "—"} />
      <ReviewRow label="Mode" value={`${data.game_mode} on ${data.map}`} />
      <ReviewRow label="Format" value={`${data.format.replace(/_/g, " ")} · ${data.total_matches} matches`} />
      <ReviewRow label="Capacity" value={`${data.max_teams} ${data.game_mode === "solo" ? "players" : "teams"}`} />
      <ReviewRow
        label="Schedule"
        value={`${data.registration_opens_at || "—"} → starts ${data.starts_at || "—"}`}
      />
      <ReviewRow
        label="Entry · Prize Pool"
        value={`${formatCurrency(data.entry_fee)} · ${formatCurrency(data.prize_pool)}`}
      />
      <ReviewRow
        label="Distribution"
        value={`${data.first_pct}% / ${data.second_pct}% / ${data.third_pct}%`}
      />
      <ReviewRow label="Description" value={data.description || "—"} />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:grid-cols-[180px_1fr] sm:gap-3">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] sm:py-0.5">
        {label}
      </div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}
