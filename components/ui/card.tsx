import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('glass-card p-6', className)}
      style={{ background: 'rgba(15,27,46,0.8)', backdropFilter: 'blur(12px)', border: '1px solid #1A2A4A', borderRadius: '12px' }}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 pb-4 border-b border-gray-800', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl font-bold text-white', className)} style={{ fontFamily: 'Rajdhani, sans-serif' }} {...props}>{children}</h3>
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props}>{children}</div>
}
