'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedCounter({ to, duration = 1600, prefix = '', suffix = '', decimals = 0, className, style }: Props) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return
      startedRef.current = true
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(eased * to)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
