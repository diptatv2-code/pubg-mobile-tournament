import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crosshair, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-200px)] grid place-items-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,68,68,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative text-center max-w-md">
        <Crosshair className="h-16 w-16 mx-auto text-[var(--color-primary)]" strokeWidth={1.5} />
        <div className="mt-6 font-display text-7xl md:text-9xl font-extrabold leading-none text-glow">
          404
        </div>
        <h1 className="mt-3 font-display text-2xl md:text-3xl font-extrabold uppercase tracking-wider">
          Out of bounds
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          The map ended. This route doesn&apos;t exist on any battlefield we host.
        </p>
        <Link href="/" className="inline-block mt-7">
          <Button variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Return to base
          </Button>
        </Link>
      </div>
    </div>
  );
}
