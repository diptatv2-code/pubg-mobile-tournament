import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref
) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'
  const variants = {
    primary: 'bg-cyan-400 hover:bg-cyan-300 text-black',
    secondary: 'bg-surface border border-border hover:border-cyan-400 text-white',
    danger: 'bg-red-500 hover:bg-red-400 text-white',
    outline: 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black',
    ghost: 'text-muted hover:text-white hover:bg-white/5',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(base, variants[variant], sizes[size], className)}
      style={variant === 'primary' ? { backgroundColor: '#00D4FF', color: '#040810' } : undefined}
      {...props}
    >
      {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
      {children}
    </button>
  )
})
Button.displayName = 'Button'
