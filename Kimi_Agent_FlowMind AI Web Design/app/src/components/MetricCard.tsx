import { useEffect, useRef, useState } from 'react'

interface MetricCardProps {
  label: string
  value: string
  prefix?: string
  suffix?: string
  description: string
  trend?: 'up' | 'down' | 'neutral'
  sparkline?: number[]
}

export default function MetricCard({
  label,
  value,
  prefix = '',
  suffix = '',
  description,
  trend = 'up',
  sparkline = [],
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Parse numeric value
    const numericMatch = value.match(/-?[\d.]+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const target = parseFloat(numericMatch[0])
    const isNegative = value.startsWith('-')
    const duration = 1500
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      let formatted: string
      if (Number.isInteger(target)) {
        formatted = Math.round(current).toString()
      } else {
        formatted = current.toFixed(1)
      }

      setDisplayValue(`${isNegative ? '-' : ''}${prefix}${formatted}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, prefix, suffix])

  const sparklinePath = sparkline.length > 0
    ? sparkline.map((v, i) => {
        const x = (i / (sparkline.length - 1)) * 100
        const y = 100 - ((v - Math.min(...sparkline)) / (Math.max(...sparkline) - Math.min(...sparkline))) * 80 - 10
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      }).join(' ')
    : ''

  return (
    <div
      ref={cardRef}
      className="fm-card p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="fm-eyebrow mb-3">{label}</div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white">
          {displayValue}
        </span>
        {trend !== 'neutral' && (
          <span
            className={`inline-flex items-center text-xs font-mono font-medium ${
              trend === 'up' ? 'text-emerald-500' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>

      {/* Sparkline */}
      {sparkline.length > 0 && (
        <svg
          className="w-full h-10 mb-3"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`spark-gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B6CB0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2B6CB0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={sparklinePath}
            fill="none"
            stroke="#2B6CB0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isVisible ? 'chart-line-drawn' : 'chart-line-draw'}
          />
          <path
            d={`${sparklinePath} L100,100 L0,100 Z`}
            fill={`url(#spark-gradient-${label})`}
            className={isVisible ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 1s ease-out 0.5s' }}
          />
        </svg>
      )}

      <p className="text-sm text-fm-slate dark:text-slate-400">{description}</p>
    </div>
  )
}