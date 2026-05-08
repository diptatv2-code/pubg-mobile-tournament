import { LoginForm } from "./LoginForm";
import { Crosshair } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Sign In — PUBG Mobile Tournament" };

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-200px)] grid place-items-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(242,169,0,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-center mb-8"
          aria-label="PUBG Mobile Tournament home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[#ff7a00]">
            <Crosshair className="h-5 w-5 text-[#0a0a0f]" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-extrabold uppercase tracking-wider">
            PUBG Mobile Tournament
          </span>
        </Link>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-wider">
            Welcome back, soldier
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Sign in to continue your campaign.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          New here?{" "}
          <Link
            href="/auth/register"
            className="font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
