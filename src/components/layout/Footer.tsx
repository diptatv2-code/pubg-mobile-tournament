import Link from "next/link";
import { Crosshair, MessageCircle } from "lucide-react";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TwitchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38s1.95.13 2.86.38c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[#ff7a00]">
              <Crosshair className="h-4 w-4 text-[#0a0a0f]" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-extrabold uppercase tracking-wider">
              PUBG Mobile Tournament
            </span>
          </div>
          <p className="text-sm text-[var(--color-muted)] max-w-xs">
            Where PUBG Mobile competitors find their fight. Host. Compete. Win.
          </p>
          <div className="flex gap-3 pt-2">
            <Link href="#" aria-label="Discord" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitch" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
              <TwitchIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <FooterCol title="Compete">
          <FooterLink href="/tournaments">Browse Tournaments</FooterLink>
          <FooterLink href="/tournaments?status=ongoing">Live Now</FooterLink>
          <FooterLink href="/tournaments?status=registration_open">Open Registration</FooterLink>
          <FooterLink href="/dashboard">My Dashboard</FooterLink>
        </FooterCol>

        <FooterCol title="Organize">
          <FooterLink href="/tournaments/create">Host a Tournament</FooterLink>
          <FooterLink href="#">Organizer Guide</FooterLink>
          <FooterLink href="#">Scoring Templates</FooterLink>
          <FooterLink href="#">Anti-Cheat</FooterLink>
        </FooterCol>

        <FooterCol title="Resources">
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Code of Conduct</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterCol>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--color-muted-2)]">
          <p>
            © {year} PUBG Mobile Tournament. Not affiliated with PUBG Corporation or Krafton.
          </p>
          <p className="uppercase tracking-wider">
            All ranks · All regions · All skill levels
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3.5">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
