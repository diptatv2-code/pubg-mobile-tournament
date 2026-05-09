'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, LayoutDashboard, User } from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()
  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/tournaments', icon: Trophy, label: 'Tournaments' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/auth/login', icon: User, label: 'Profile' },
  ]
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex" style={{ backgroundColor: 'rgba(4,8,16,0.98)', borderTop: '1px solid #1A2A4A' }}>
      {links.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} className="flex-1 flex flex-col items-center py-3 gap-1 transition-colors" style={{ color: pathname === href ? '#00D4FF' : '#6B7A99' }}>
          <Icon size={20} />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
