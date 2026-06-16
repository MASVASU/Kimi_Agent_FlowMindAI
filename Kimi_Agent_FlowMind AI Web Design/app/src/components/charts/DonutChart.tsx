import { useEffect, useRef, useState } from 'react'

interface DonutSegment {
  value: number
  color: string
  label: string
}

interface DonutChartProps {
  segments: DonutSegment[]
  size?: number
  strokeWidth?: number
  animate?: boolean
  className?: string
  centerText?: string
  centerSubtext?: string
}

export default function DonutChart({
  segments,
  size = 160,
  strokeWidth = 24,
  animate = true,
  className = '',
  centerText,
  centerSubtext,
}: DonutChartProps) {
  const [isVisible, setIsVisible] = useState(!animate)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [animate])

  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let cumulativePercent = 0

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={animate ? 'animate-slow-rotate' : ''}
        style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(201, 211, 223, 0.3)"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segments.map((segment, i) => {
          const percent = segment.value / total
          const dashLength = circumference * percent
          const dashOffset = circumference * (1 - cumulativePercent) - circumference * 0.25
          cumulativePercent += percent

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={isVisible ? dashOffset : circumference}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
              style={{
                transition: `stroke-dashoffset 1s ease-out ${i * 0.15}s`,
              }}
            />
          )
        })}
      </svg>

      {/* Center text */}
      {(centerText || centerSubtext) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerText && (
            <span className="font-heading text-2xl font-bold text-fm-text dark:text-white">
              {centerText}
            </span>
          )}
          {centerSubtext && (
            <span className="text-xs text-fm-slate dark:text-slate-400 mt-0.5">
              {centerSubtext}
            </span>
          )}
        </div>
      )}
    </div>
  )
}