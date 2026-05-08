"use client";
import { motion } from "framer-motion";
import { UserPlus, Trophy, Crown } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Create your free account, link your PUBG ID, and form your squad.",
    accent: "from-[var(--color-secondary)] to-[var(--color-secondary)]/40",
  },
  {
    icon: Trophy,
    title: "Create or Join",
    desc: "Host a custom tournament with your own scoring and prizes — or jump into one open right now.",
    accent: "from-[var(--color-primary)] to-[var(--color-primary)]/40",
  },
  {
    icon: Crown,
    title: "Compete & Conquer",
    desc: "Get room codes, drop in, and climb the live leaderboard. Win prizes. Earn rank points.",
    accent: "from-[var(--color-success)] to-[var(--color-success)]/40",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          How It Works
        </div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
          From Zero to Chicken Dinner
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-[var(--color-muted)]">
          Three steps. No setup headaches. Just real PUBG Mobile competition.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 group hover:border-[var(--color-border-strong)] transition-colors overflow-hidden"
            >
              <div
                className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)]">
                    <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted)]">
                      Step {i + 1}
                    </div>
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-wider">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
