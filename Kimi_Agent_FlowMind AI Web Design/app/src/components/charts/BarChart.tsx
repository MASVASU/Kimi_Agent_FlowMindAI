import { useEffect, useRef, useState } from 'react'

interface BarData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarData[]
  width?: number
  height?: number
  animate?: boolean
  className?: string
  horizontal?: boolean
}

export default function BarChart({
  data,
  width = 300,
  height = 160,
  animate = true,
  className = '',
  horizontal = false,
}: BarChartProps) {
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

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1
  const barColor = '#2B6CB0'
  const altColor = '#2BB1C5'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {horizontal ? (
        // Horizontal bars
        data.map((d, i) => {
          const barHeight = (height / data.length) * 0.7
          const barWidth = (d.value / maxValue) * (width - 60)
          const y = (height / data.length) * i + (height / data.length - barHeight) / 2
          const fill = d.color || (i % 2 === 0 ? barColor : altColor)

          return (
            <g key={i}>
              <text
                x={0}
                y={y + barHeight / 2 + 4}
                className="text-[10px] fill-fm-slate"
                fontFamily="IBM Plex Mono"
              >
                {d.label}
              </text>
              <rect
                x={50}
                y={y}
                width={isVisible ? barWidth : 0}
                height={barHeight}
                rx={4}
                fill={fill}
                opacity="0.85"
                style={{
                  transition: `width 0.8s ease-out ${i * 0.1}s`,
                }}
              />
              <text
                x={55 + barWidth}
                y={y + barHeight / 2 + 4}
                className="text-[10px] fill-fm-slate"
                fontFamily="IBM Plex Mono"
                opacity={isVisible ? 1 : 0}
                style={{ transition: `opacity 0.3s ease-out ${0.8 + i * 0.1}s` }}
              >
                {d.value}
              </text>
            </g>
          )
        })
      ) : (
        // Vertical bars
        data.map((d, i) => {
          const barWidth = (width / data.length) * 0.7
          const barHeight = (d.value / maxValue) * (height - 30)
          const x = (width / data.length) * i + (width / data.length - barWidth) / 2
          const y = height - barHeight - 20
          const fill = d.color || (i % 2 === 0 ? barColor : altColor)

          return (
            <g key={i}>
              <rect
                x={x}
                y={isVisible ? y : height - 20}
                width={barWidth}
                height={isVisible ? barHeight : 0}
                rx={4}
                fill={fill}
                opacity="0.85"
                style={{
                  transition: `all 0.8s ease-out ${i * 0.1}s`,
                }}
              />
              <text
                x={x + barWidth / 2}
                y={height - 6}
                textAnchor="middle"
                className="text-[9px] fill-fm-slate"
                fontFamily="IBM Plex Mono"
              >
                {d.label}
              </text>
            </g>
          )
        })
      )}

      {/* Baseline */}
      {!horizontal && (
        <line
          x1={0}
          y1={height - 20}
          x2={width}
          y2={height - 20}
          stroke="#C9D3DF"
          strokeWidth="1"
        />
      )}
    </svg>
  )
}