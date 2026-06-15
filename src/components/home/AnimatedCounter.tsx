'use client'
import { useEffect, useState } from 'react'

interface Props {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ to, prefix = '', suffix = '', duration = 1500 }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (to === 0) { setCount(0); return }
    const steps = 50
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [to, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}
