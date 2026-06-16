import { useEffect, useRef, useState } from 'react'

interface AreaPoint {
  x: number
  y: number
}

interface AreaSeries {
  data: AreaPoint[]
  color: string
  label: string
}

interface AreaChartProps {
  series: AreaSeries[]
  width?: number
  height?: number
  showAxes?: boolean
  animate?: boolean
  className?: string
  highlightBand?: { start: number; end: number }
}

export default function AreaChart({
  series,
  width = 400,
  height = 200,
  showAxes = true,
  animate = true,
  className = '',
  highlightBand,
}: AreaChartProps) {
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

  const padding = showAxes ? { top: 20, right: 20, bottom: 30, left: 40 } : { top: 10, right: 10, bottom: 10, left: 10 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const allPoints = series.flatMap((s) => s.data)
  const minX = Math.min(...allPoints.map((p) => p.x))
  const maxX = Math.max(...allPoints.map((p) => p.x))
  const minY = Math.min(...allPoints.map((p) => p.y)) * 0.9
  const maxY = Math.max(...allPoints.map((p) => p.y)) * 1.1

  const scaleX = (x: number) => padding.left + ((x - minX) / (maxX - minX)) * chartWidth
  const scaleY = (y: number) => padding.top + chartHeight - ((y - minY) / (maxY - minY)) * chartHeight

  const generateArea = (data: AreaPoint[]) => {
    const linePath = data
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${scaleX(p.x)},${scaleY(p.y)}`)
      .join(' ')
    const lastX = scaleX(data[data.length - 1].x)
    const firstX = scaleX(data[0].x)
    const bottomY = padding.top + chartHeight
    return `${linePath} L${lastX},${bottomY} L${firstX},${bottomY} Z`
  }

  // Grid lines
  const yTicks = 4
  const gridLines = Array.from({ length: yTicks + 1 }, (_, i) => {
    const y = padding.top + (chartHeight / yTicks) * i
    const value = maxY - ((maxY - minY) / yTicks) * i
    return { y, value }
  })

  const highlightX1 = highlightBand ? scaleX(highlightBand.start) : 0
  const highlightX2 = highlightBand ? scaleX(highlightBand.end) : 0

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Grid lines */}
      {showAxes &&
        gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={width - padding.right}
              y2={line.y}
              stroke="#C9D3DF"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x={padding.left - 8}
              y={line.y + 4}
              textAnchor="end"
              className="text-[10px] fill-fm-slate"
              fontFamily="IBM Plex Mono"
            >
              {Math.round(line.value)}
            </text>
          </g>
        ))}

      {/* Highlight band */}
      {highlightBand && (
        <rect
          x={highlightX1}
          y={padding.top}
          width={highlightX2 - highlightX1}
          height={chartHeight}
          fill="#2B6CB0"
          opacity={isVisible ? 0.08 : 0}
          rx={4}
          style={{ transition: 'opacity 1s ease-out 0.5s' }}
          className={isVisible ? 'animate-shimmer' : ''}
        />
      )}

      {/* Areas (stacked) */}
      {isVisible &&
        series.map((s, i) => (
          <path
            key={`area-${i}`}
            d={generateArea(s.data)}
            fill={s.color}
            opacity={0.2 + i * 0.1}
            style={{
              transition: `opacity 1s ease-out ${i * 0.2}s`,
            }}
          />
        ))}

      {/* Lines */}
      {isVisible &&
        series.map((s, i) => {
          const pathD = s.data
            .map((p, j) => `${j === 0 ? 'M' : 'L'}${scaleX(p.x)},${scaleY(p.y)}`)
            .join(' ')

          return (
            <path
              key={`line-${i}`}
              d={pathD}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: isVisible ? 0 : 1000,
                transition: `stroke-dashoffset 1.5s ease-out ${i * 0.2}s`,
              }}
            />
          )
        })}

      {/* Data points */}
      {isVisible &&
        series.map((s, si) =>
          s.data.map((p, pi) => (
            <circle
              key={`point-${si}-${pi}`}
              cx={scaleX(p.x)}
              cy={scaleY(p.y)}
              r="3"
              fill={s.color}
              stroke="white"
              strokeWidth="2"
              opacity={isVisible ? 1 : 0}
              style={{
                transition: `opacity 0.3s ease-out ${1.5 + pi * 0.05}s`,
              }}
            />
          ))
        )}

      {/* Axes */}
      {showAxes && (
        <>
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={width - padding.right}
            y2={padding.top + chartHeight}
            stroke="#C9D3DF"
            strokeWidth="1"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="#C9D3DF"
            strokeWidth="1"
          />
        </>
      )}
    </svg>
  )
}