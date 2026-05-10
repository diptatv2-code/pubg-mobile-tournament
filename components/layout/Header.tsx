'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/app/actions/auth'
import type { User } from '@supabase/supabase-js'
import { Trophy, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react'

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header style={{ backgroundColor: 'rgba(4,8,16,0.95)', borderBottom: '1px solid #1A2A4A', backdropFilter: 'blur(12px)' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Trophy size={24} style={{ color: '#C8A951' }} />
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#E8EAF0' }}>
              PUBG MOBILE TOURNAMENT
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tournaments" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Tournaments
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm" style={{ color: '#6B7A99' }}>{user.email?.split('@')[0]}</span>
                <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  <LogIn size={16} /> Login
                </Link>
                <Link href="/auth/register" className="text-sm px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1" style={{ backgroundColor: '#00D4FF', color: '#040810' }}>
                  <UserPlus size={16} /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-3">
              <Link href="/tournaments" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Tournaments</Link>
              {user && <Link href="/dashboard" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
              {user ? (
                <button onClick={handleLogout} className="text-left text-gray-400 hover:text-white">Logout</button>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link href="/auth/register" style={{ color: '#00D4FF' }} onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
