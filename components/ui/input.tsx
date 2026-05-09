import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { className, label, error, helperText, id, ...props }, ref
) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: '#6B7A99' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border text-white placeholder-gray-500 transition-colors outline-none',
          'focus:border-cyan-400',
          error ? 'border-red-500' : 'border-gray-700',
          className
        )}
        style={{ backgroundColor: '#0A1020', borderColor: error ? '#FF4444' : undefined }}
        {...props}
      />
      {error && <p className="text-sm" style={{ color: '#FF4444' }}>{error}</p>}
      {helperText && !error && <p className="text-sm" style={{ color: '#6B7A99' }}>{helperText}</p>}
    </div>
  )
})
Input.displayName = 'Input'
