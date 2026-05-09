import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type BadgeVariant = 'registration_open' | 'started' | 'completed' | 'cancelled' | 'default'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  registration_open: 'bg-green-900/50 text-green-400 border border-green-800',
  started: 'text-black border border-cyan-400',
  completed: 'bg-gray-800 text-gray-400 border border-gray-700',
  cancelled: 'bg-red-900/50 text-red-400 border border-red-800',
  default: 'bg-gray-800 text-gray-300 border border-gray-700',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantStyles[variant], className)}
      style={variant === 'started' ? { backgroundColor: '#00D4FF' } : undefined}
      {...props}
    >
      {children}
    </span>
  )
}

export function TournamentStatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    registration_open: '🟢 Open',
    started: '⚡ Live',
    completed: '✅ Done',
    cancelled: '❌ Cancelled',
  }
  return <Badge variant={status as BadgeVariant}>{labels[status] || status}</Badge>
}
