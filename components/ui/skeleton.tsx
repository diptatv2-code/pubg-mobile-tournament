import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded', className)}
      style={{ backgroundColor: '#1A2A4A' }}
    />
  )
}
