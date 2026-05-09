'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/tournaments', label: 'Battles', icon: '⊕' },
  { href: '/leaderboard', label: 'Ranks', icon: '🏆' },
  { href: '/dashboard', label: 'Dashboard', icon: '⚡' },
  { href: '/profile', label: 'Profile', icon: '👤' },
] as const

export default function MobileBottomNav() {
  const pathname = usePathname()
  return (
    <nav className="bottom-nav show-mobile" aria-label="Mobile primary navigation">
      {ITEMS.map(item => {
        const active = pathname === item.href || pathname?.startsWith(item.href + '/')
        return (
          <Link key={item.href} href={item.href} className={`bottom-nav-item ${active ? 'active' : ''}`}>
            <span className="bottom-nav-item-icon" aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
