"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Crosshair, Menu, Trophy, X } from "lucide-react";

const navItems = [
  { label: "Tournaments", href: "/tournaments" },
  { label: "Create", href: "/tournaments/create" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="PUBG Mobile Tournament home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[#ff7a00] shadow-[0_0_18px_-4px_rgba(242,169,0,0.7)]">
            <Crosshair className="h-5 w-5 text-[#0a0a0f]" strokeWidth={2.5} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold uppercase tracking-wider text-white group-hover:text-[var(--color-primary)] transition-colors">
              PUBG Mobile Tournament
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-2)]">
              tournaments
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-semibold uppercase tracking-wider rounded-md transition-colors",
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)] hover:text-white hover:bg-[var(--color-surface-hover)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm">
              <Trophy className="h-4 w-4" /> Join
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white cursor-pointer"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="flex flex-col px-4 py-3 gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-md",
                    active
                      ? "text-[var(--color-primary)] bg-[var(--color-surface)]"
                      : "text-[var(--color-muted)] hover:text-white hover:bg-[var(--color-surface-hover)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-[var(--color-border)]">
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
