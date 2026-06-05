import Link from 'next/link';

export default function PrototypeNavbar() {
  return (
    <nav className="bg-[#1a1a2e] border-b border-[#0f3460] p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/prototype" className="text-2xl font-bold text-[#00E5FF] tracking-wider">
          PUBG<span className="text-white">PLATFORM</span>
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/prototype/tournaments" className="hover:text-[#00E5FF] transition-colors">Tournaments</Link>
          <Link href="/prototype/dashboard/player" className="hover:text-[#00E5FF] transition-colors">Player Dashboard</Link>
          <Link href="/prototype/dashboard/organizer" className="hover:text-[#00E5FF] transition-colors">Organizer Dashboard</Link>
          <Link href="/prototype/login" className="bg-[#e94560] hover:bg-[#ff6b81] text-white px-4 py-2 rounded font-semibold transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
