"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, Hash, Trophy } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  username: z
    .string()
    .min(3, "Min 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, underscores only"),
  pubg_name: z.string().min(2, "Required"),
  pubg_id: z
    .string()
    .min(8, "Must be at least 8 digits")
    .regex(/^\d+$/, "Numbers only"),
  password: z.string().min(8, "Min 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [done, setDone] = useState(false);

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-md border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-4 text-sm text-[var(--color-success)]">
        Account created (mocked). Welcome to the pubgmobiletournament.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="player@example.com"
            className="pl-9"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-[var(--color-danger)]">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <div className="relative mt-2">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            id="username"
            placeholder="ShadowSniper"
            className="pl-9"
            {...register("username")}
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-xs text-[var(--color-danger)]">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="pubg_name">In-Game Name</Label>
          <div className="relative mt-2">
            <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
            <Input
              id="pubg_name"
              placeholder="ShadowSniper⚡"
              className="pl-9"
              {...register("pubg_name")}
            />
          </div>
          {errors.pubg_name && (
            <p className="mt-1 text-xs text-[var(--color-danger)]">
              {errors.pubg_name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="pubg_id">PUBG ID</Label>
          <div className="relative mt-2">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
            <Input
              id="pubg_id"
              inputMode="numeric"
              placeholder="5512387401"
              className="pl-9"
              {...register("pubg_id")}
            />
          </div>
          {errors.pubg_id && (
            <p className="mt-1 text-xs text-[var(--color-danger)]">
              {errors.pubg_id.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative mt-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="pl-9"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-[var(--color-danger)]">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating…" : "Create Account"}
      </Button>

      <div className="relative my-2">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface)] px-3 text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-2)]">
          Or
        </span>
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        Continue with Google
      </Button>
      <Button type="button" variant="outline" size="lg" className="w-full">
        Continue with Discord
      </Button>

      <p className="text-[11px] text-[var(--color-muted-2)] leading-relaxed">
        By creating an account you agree to our Terms and confirm you&apos;ve read the
        Code of Conduct. You must be 13 or older to compete.
      </p>
    </form>
  );
}
