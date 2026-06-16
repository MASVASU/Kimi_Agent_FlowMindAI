import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Zap,
  Brain,
  TrendingUp,
  Workflow,
  Shield,
  ChevronRight,
  Sparkles,
  Activity,
  BarChart3,
  Lock,
  Check,
  Play,
  MessageSquare,
  Globe,
  Cpu,
  HardDrive,
  Timer,
  Target,
  Layers,
  Plug,
  Server,
  Cloud,
  Database,
} from 'lucide-react'
import MetricCard from '../components/MetricCard'
import { default as FlowLineChart } from '../components/charts/LineChart'
import AreaChart from '../components/charts/AreaChart'
import DonutChart from '../components/charts/DonutChart'
import BarChart from '../components/charts/BarChart'

gsap.registerPlugin(ScrollTrigger)

// Demo data for charts
const lineData1 = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 40 + Math.sin(i * 0.8) * 20 + i * 3 }))
const lineData2 = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 35 + Math.cos(i * 0.6) * 15 + i * 2 }))
const lineData3 = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 30 + Math.sin(i * 0.5) * 10 + i * 4 }))

const areaData1 = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 30 + Math.sin(i * 0.4) * 15 + i * 2 }))
const areaData2 = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 25 + Math.cos(i * 0.3) * 12 + i * 1.5 }))
const areaData3 = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 20 + Math.sin(i * 0.5) * 10 + i }))

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinnedRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin sections with GSAP ScrollTrigger
      pinnedRefs.current.forEach((section) => {
        if (!section) return

        const elements = section.querySelectorAll('.animate-item')

        // Entrance animations
        gsap.fromTo(
          elements,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const setPinnedRef = (index: number) => (el: HTMLDivElement | null) => {
    pinnedRefs.current[index] = el
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1: Hero */}
      <section
        ref={setPinnedRef(0)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative overflow-hidden pt-16"
      >
        <div className="fm-grid-bg absolute inset-0 opacity-30" />

        {/* Decorative elements */}
        <div className="absolute top-24 left-[8%] w-3 h-3 rounded-full bg-fm-cyan animate-pulse-subtle" />
        <div className="absolute bottom-32 right-[12%] w-2 h-2 rounded-full bg-fm-accent animate-float" />

        <div className="fm-container relative z-10 pt-12 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Panel */}
            <div className="fm-card p-6 md:p-8 lg:p-10 animate-item">
              <div className="fm-eyebrow mb-6">Workflow Intelligence Platform</div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(40px,4vw,64px)] font-bold text-fm-text dark:text-white leading-[0.95] mb-6">
                Visibility into every workflow.{' '}
                <span className="text-fm-accent">Precision</span> for every decision.
              </h1>
              <p className="text-base md:text-lg text-fm-slate dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                FlowMind connects to your existing tools, surfaces bottlenecks, and keeps teams aligned—without adding another meeting.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="fm-btn-primary">
                  Request a demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/product" className="fm-btn-secondary">
                  Explore the platform
                </Link>
              </div>

              <div className="space-y-3">
                {['No-code connectors', 'Role-based views', 'Audit-grade logs'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-fm-accent/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-fm-accent" />
                    </div>
                    <span className="text-sm font-mono text-fm-slate dark:text-slate-400 uppercase tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* YC Trust Banner */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-semibold text-fm-cyan tracking-wider uppercase bg-fm-cyan/10 px-2 py-1 rounded">
                    YC W24
                  </span>
                  <span className="text-xs text-fm-slate dark:text-slate-500">
                    Backed by Y Combinator and trusted by fast-growing teams
                  </span>
                </div>
              </div>
            </div>

            {/* Right Dashboard */}
            <div className="animate-item">
              <div className="fm-card overflow-hidden">
                <img
                  src="/images/dashboard-mockup.jpg"
                  alt="FlowMind AI Dashboard"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>

              {/* Floating metric cards */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Workflows', value: '2.4K', icon: Workflow },
                  { label: 'Efficiency', value: '+41%', icon: TrendingUp },
                  { label: 'Uptime', value: '99.97%', icon: Activity },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="fm-card p-3 flex items-center gap-3 animate-item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-fm-accent/10 flex items-center justify-center shrink-0">
                      <metric.icon className="w-4 h-4 text-fm-accent" />
                    </div>
                    <div>
                      <div className="text-lg font-heading font-bold text-fm-text dark:text-white">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-fm-slate uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Feature Split */}
      <section
        ref={setPinnedRef(1)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="text-center mb-12 animate-item">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-fm-text dark:text-white mb-4">
              Built for modern teams
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-2xl mx-auto">
              Two powerful capabilities that transform how your organization works.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Card - NLP */}
            <div className="fm-card p-6 md:p-8 animate-item relative overflow-hidden">
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-fm-accent/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-fm-accent" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-fm-text dark:text-white">
                  Conversational analytics
                </h3>
              </div>

              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Ask questions in plain language and get summaries, alerts, and next-step recommendations.
              </p>

              <Link
                to="/product"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fm-accent hover:underline mb-8"
              >
                See NLP capabilities
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Mock chat interface */}
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-fm-accent/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3 h-3 text-fm-accent" />
                  </div>
                  <div className="bg-white dark:bg-white/10 rounded-lg rounded-tl-none px-3 py-2 text-sm text-fm-text dark:text-white shadow-sm">
                    What caused the delay in the API migration?
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-fm-accent/10 rounded-lg rounded-tr-none px-3 py-2 text-sm text-fm-text dark:text-white">
                    Dependencies on external service (3 days) + capacity constraint in DevOps team.
                  </div>
                  <div className="w-6 h-6 rounded-full bg-fm-cyan/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-fm-cyan" />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['View timeline', 'Assign owner', 'Create alert'].map((action) => (
                    <span
                      key={action}
                      className="px-2.5 py-1 rounded-full bg-white dark:bg-white/10 text-xs text-fm-slate dark:text-slate-400 border border-slate-200 dark:border-white/10"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Automation */}
            <div className="fm-card p-6 md:p-8 animate-item relative overflow-hidden">
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-fm-cyan/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-fm-cyan" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-fm-text dark:text-white">
                  Autonomous process monitoring
                </h3>
              </div>

              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Detect anomalies, auto-escalate issues, and generate audit logs—without manual configuration.
              </p>

              <Link
                to="/product"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fm-accent hover:underline mb-8"
              >
                Explore automation
                <ChevronRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-4">
                {/* Pipeline list */}
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4">
                  <div className="fm-eyebrow mb-3">Processing</div>
                  {['Data ingestion', 'Validation', 'Transform', 'Load'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 py-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          i < 3 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span className="text-xs text-fm-text dark:text-white">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Globe + Stats */}
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 flex items-center justify-center">
                    <img
                      src="/images/globe.png"
                      alt="Global monitoring"
                      className="w-20 h-20 object-contain opacity-70"
                    />
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3">
                    <div className="text-lg font-heading font-bold text-fm-text dark:text-white">
                      12
                    </div>
                    <div className="text-[10px] font-mono text-fm-slate uppercase">Active regions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Multi-module Product Grid */}
      <section
        ref={setPinnedRef(2)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="text-center mb-12 animate-item">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-fm-text dark:text-white mb-4">
              Built for operations, compliance, and product teams
            </h2>
            <p className="text-fm-slate dark:text-slate-400">
              Start with one module. Expand as you grow.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Large card - spans 3 cols */}
            <div className="lg:col-span-3 fm-card p-6 md:p-8 animate-item relative">
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-tr" />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-fm-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                    Revenue Operations
                  </h3>
                  <p className="text-sm text-fm-slate dark:text-slate-400 mb-4">
                    Track pipeline health, forecast revenue, and identify process leaks across your GTM motion.
                  </p>
                  <ul className="space-y-2">
                    {['Pipeline velocity', 'Win-rate analysis', 'Revenue leakage alerts'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-fm-slate dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-fm-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-fm-cyan/10 flex items-center justify-center mb-4">
                    <Workflow className="w-6 h-6 text-fm-cyan" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                    Workflow Optimization
                  </h3>
                  <p className="text-sm text-fm-slate dark:text-slate-400 mb-4">
                    Map processes end-to-end, find bottlenecks, and get AI-powered recommendations.
                  </p>
                  <ul className="space-y-2">
                    {['Process mapping', 'Bottleneck detection', 'Auto-recommendations'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-fm-slate dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-fm-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right column - 2 stacked cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="fm-card p-6 animate-item">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                  Anomaly Detection
                </h3>
                <p className="text-sm text-fm-slate dark:text-slate-400">
                  Surface deviations across KPIs without alert fatigue. Dynamic baselines learn your patterns.
                </p>
              </div>

              <div className="fm-card p-6 animate-item">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                  <Brain className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                  Predictive Capacity
                </h3>
                <p className="text-sm text-fm-slate dark:text-slate-400">
                  Forecast workloads, resource needs, and delivery timelines with ML tuned to your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Anomaly Detection Spotlight */}
      <section
        ref={setPinnedRef(3)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="fm-card p-6 md:p-10 animate-item">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="fm-eyebrow mb-4">Anomaly Detection</div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                  Spot what matters. Ignore the noise.
                </h2>
                <p className="text-fm-slate dark:text-slate-400 mb-6">
                  Anomaly detection learns normal behavior across your KPIs and surfaces only actionable deviations—no alert fatigue.
                </p>

                <div className="space-y-3 mb-8">
                  {['Dynamic baselines', 'Root-cause snippets', 'Auto-ticket creation'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-fm-accent/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-fm-accent" />
                      </div>
                      <span className="text-sm font-mono text-fm-slate dark:text-slate-400 uppercase tracking-wider">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 animate-float">
                    <div className="text-[10px] font-mono text-red-500 uppercase">Cost spike detected</div>
                    <div className="text-sm font-heading font-semibold text-red-600 dark:text-red-400">
                      +18.2% vs baseline
                    </div>
                  </div>
                  <div
                    className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 animate-float"
                    style={{ animationDelay: '1s' }}
                  >
                    <div className="text-[10px] font-mono text-amber-600 uppercase">Latency breach</div>
                    <div className="text-sm font-heading font-semibold text-amber-700 dark:text-amber-400">
                      p99 &gt; 420ms
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="relative">
                <FlowLineChart
                  series={[
                    { data: lineData1, color: '#2B6CB0', label: 'Normal' },
                    { data: lineData2, color: '#2BB1C5', label: 'Predicted' },
                  ]}
                  height={280}
                />
                {/* Anomaly boxes */}
                <div className="absolute top-[20%] right-[15%] w-20 h-16 border-2 border-red-400 rounded-lg opacity-60 animate-pulse-subtle" />
                <div className="absolute top-[45%] left-[40%] w-16 h-12 border-2 border-amber-400 rounded-lg opacity-60 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Compliance */}
      <section
        ref={setPinnedRef(4)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left card - 3 cols */}
            <div className="lg:col-span-3 fm-card p-6 md:p-8 animate-item">
              <div className="fm-eyebrow mb-4">Security & Compliance</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                Compliance-ready by design
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Access controls, audit trails, and data residency that maps to your policies—SOC 2, HIPAA, GDPR.
              </p>

              <Link
                to="/product"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fm-accent hover:underline mb-8"
              >
                Download security overview
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Encrypted', icon: Lock, status: 'active' },
                  { label: 'Verified', icon: Shield, status: 'active' },
                  { label: 'Quarantined', icon: Target, status: 'warning' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className={`p-4 rounded-xl text-center ${
                      badge.status === 'active'
                        ? 'bg-emerald-50 dark:bg-emerald-500/10'
                        : 'bg-amber-50 dark:bg-amber-500/10'
                    }`}
                  >
                    <badge.icon
                      className={`w-5 h-5 mx-auto mb-2 ${
                        badge.status === 'active' ? 'text-emerald-500' : 'text-amber-500'
                      }`}
                    />
                    <div className="text-[10px] font-mono uppercase tracking-wider text-fm-slate dark:text-slate-400">
                      {badge.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <div className="fm-card p-6 animate-item">
                <DonutChart
                  segments={[
                    { value: 65, color: '#2B6CB0', label: 'Compliant' },
                    { value: 25, color: '#2BB1C5', label: 'In Progress' },
                    { value: 10, color: '#C9D3DF', label: 'Pending' },
                  ]}
                  centerText="92%"
                  centerSubtext="Compliant"
                />
              </div>

              <div className="fm-card p-6 animate-item">
                <div className="fm-eyebrow mb-3">Audit Timeline</div>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          i <= 3 ? 'bg-fm-accent/20' : 'bg-slate-100 dark:bg-white/5'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            i <= 3 ? 'bg-fm-accent' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-fm-slate mt-1">Q{i}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/product"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-fm-accent hover:underline mt-4"
                >
                  Review certifications
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Interactive Demo CTA */}
      <section
        ref={setPinnedRef(5)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="fm-card p-8 md:p-12 animate-item">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                  Try FlowMind on your data
                </h2>
                <p className="text-fm-slate dark:text-slate-400 mb-8">
                  Connect a source, choose a module, and see insights in minutes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="fm-btn-primary">
                    <Play className="w-4 h-4" />
                    Start an interactive demo
                  </Link>
                  <Link to="/contact" className="fm-btn-secondary">
                    Talk to solutions engineering
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {/* Donut + Metrics */}
                <div className="flex items-center gap-6 justify-center">
                  <DonutChart
                    segments={[
                      { value: 45, color: '#2B6CB0', label: 'CPU' },
                      { value: 30, color: '#2BB1C5', label: 'Memory' },
                      { value: 25, color: '#C9D3DF', label: 'Idle' },
                    ]}
                    size={140}
                    centerText="72%"
                    centerSubtext="Usage"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'CPU', value: '45%', icon: Cpu },
                    { label: 'Memory', value: '62%', icon: HardDrive },
                    { label: 'Latency', value: '24ms', icon: Timer },
                    { label: 'Tasks', value: '1.2K', icon: Layers },
                  ].map((tile) => (
                    <div
                      key={tile.label}
                      className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 text-center"
                    >
                      <tile.icon className="w-4 h-4 text-fm-accent mx-auto mb-1" />
                      <div className="text-sm font-heading font-bold text-fm-text dark:text-white">
                        {tile.value}
                      </div>
                      <div className="text-[9px] font-mono text-fm-slate uppercase">{tile.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Performance Metrics (flowing) */}
      <section className="flowing-section bg-fm-bg dark:bg-fm-bg-dark">
        <div className="fm-container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              Real outcomes, measurable impact
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-2xl mx-auto">
              Teams using FlowMind see measurable improvements across key operational metrics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            <MetricCard
              label="Mean Repair Time"
              value="-34%"
              prefix="-"
              suffix="%"
              trend="down"
              description="Faster root-cause identification"
              sparkline={[45, 42, 48, 40, 38, 35, 36, 33, 30, 32, 28, 29]}
            />
            <MetricCard
              label="Workflow Efficiency"
              value="+41%"
              prefix="+"
              suffix="%"
              trend="up"
              description="Reduced context-switching"
              sparkline={[20, 22, 25, 28, 30, 35, 38, 40, 42, 45, 48, 50]}
            />
            <MetricCard
              label="Operational Costs"
              value="-22%"
              prefix="-"
              suffix="%"
              trend="down"
              description="Automation + better routing"
              sparkline={[80, 78, 75, 72, 70, 68, 65, 63, 62, 60, 58, 56]}
            />
            <MetricCard
              label="System Uptime"
              value="99.97"
              suffix="%"
              trend="up"
              description="Proactive anomaly handling"
              sparkline={[99.5, 99.6, 99.7, 99.75, 99.8, 99.82, 99.85, 99.87, 99.9, 99.92, 99.95, 99.97]}
            />
            <MetricCard
              label="Decision Latency"
              value="-55%"
              prefix="-"
              suffix="%"
              trend="down"
              description="From insight to action"
              sparkline={[60, 55, 50, 45, 42, 38, 35, 32, 30, 28, 27, 25]}
            />
          </div>

          {/* Feature list */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Real-time Processing',
                desc: 'Process millions of events per second with sub-second anomaly detection.',
              },
              {
                icon: Brain,
                title: 'Adaptive Learning',
                desc: 'Models improve over time, learning your unique business patterns and seasonality.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                desc: 'SOC 2 Type II certified with end-to-end encryption and role-based access.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="fm-card p-6 flex gap-4 hover:shadow-card-hover transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-fm-accent/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-fm-accent" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-fm-text dark:text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-fm-slate dark:text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Process Monitoring */}
      <section
        ref={setPinnedRef(6)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-item">
              <div className="fm-eyebrow mb-4">Process Monitoring</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                Monitor processes across teams and systems
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Correlate events, throughput, and error rates in one view—no SQL required.
              </p>
              <Link to="/product" className="fm-btn-primary">
                Build a dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="fm-card p-6 animate-item">
              <FlowLineChart
                series={[
                  { data: lineData1, color: '#2B6CB0', label: 'Throughput', fill: true },
                  { data: lineData2, color: '#2BB1C5', label: 'Errors' },
                  { data: lineData3, color: '#111827', label: 'Latency' },
                ]}
                height={280}
              />
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { label: 'Throughput', color: '#2B6CB0' },
                  { label: 'Error Rate', color: '#2BB1C5' },
                  { label: 'Latency', color: '#111827' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-fm-slate dark:text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Enterprise Integration */}
      <section
        ref={setPinnedRef(7)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-item">
              <div className="fm-eyebrow mb-4">Integrations</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                Connect your stack without replacing it
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Use prebuilt connectors, webhooks, and APIs to unify data across CRM, billing, infrastructure, and support tools.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['CRM', 'ERP', 'TICKETING', 'DATA WAREHOUSE'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-fm-accent/10 text-xs font-mono text-fm-accent uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/product" className="fm-btn-primary">
                View connectors
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stacked panels */}
            <div className="relative h-[400px] animate-item">
              {/* Back panel */}
              <div className="absolute left-8 top-4 w-[85%] h-[320px] fm-card opacity-45 rotate-[-2deg]" />
              {/* Mid panel */}
              <div className="absolute left-4 top-8 w-[90%] h-[320px] fm-card opacity-70 rotate-[-1deg]" />
              {/* Front panel */}
              <div className="absolute left-0 top-12 w-[95%] h-[320px] fm-card p-5">
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />

                <div className="grid grid-cols-2 gap-4 h-full">
                  <div>
                    <DonutChart
                      segments={[
                        { value: 40, color: '#2B6CB0', label: 'Connected' },
                        { value: 35, color: '#2BB1C5', label: 'Pending' },
                        { value: 25, color: '#C9D3DF', label: 'Available' },
                      ]}
                      size={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="fm-card p-3">
                      <div className="text-xs font-mono text-fm-slate uppercase mb-1">Sync Rate</div>
                      <div className="text-lg font-heading font-bold text-fm-text dark:text-white">
                        99.8%
                      </div>
                    </div>
                    <div className="fm-card p-3">
                      <div className="text-xs font-mono text-fm-slate uppercase mb-1">Connectors</div>
                      <div className="text-lg font-heading font-bold text-fm-text dark:text-white">
                        200+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Demand Forecasting */}
      <section
        ref={setPinnedRef(8)}
        className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark relative py-20"
      >
        <div className="fm-container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-item">
              <div className="fm-eyebrow mb-4">Predictive Analytics</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
                Predict demand before it becomes pressure
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-6">
                Forecast workloads, capacity, and resource needs with models tuned to your business patterns.
              </p>
              <Link to="/product" className="fm-btn-primary">
                See forecasting features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="fm-card p-6 animate-item relative">
              <AreaChart
                series={[
                  { data: areaData1, color: '#2B6CB0', label: 'Forecast' },
                  { data: areaData2, color: '#2BB1C5', label: 'Actual' },
                  { data: areaData3, color: '#C9D3DF', label: 'Baseline' },
                ]}
                height={280}
                highlightBand={{ start: 12, end: 17 }}
              />
              {/* Callout */}
              <div className="absolute top-[25%] right-[20%] px-3 py-2 bg-white dark:bg-[#0F1922] rounded-lg shadow-card border border-slate-100 dark:border-white/10 animate-float">
                <div className="text-[10px] font-mono text-fm-slate uppercase">Confidence</div>
                <div className="text-sm font-heading font-semibold text-fm-accent">+94%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Integration Library (Dark) */}
      <section className="min-h-screen bg-[#09131A] relative py-20">
        <div className="fm-container">
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
            <div className="animate-item">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Plug into 200+ integrations
              </h2>
              <p className="text-slate-400 mb-6">
                From Salesforce to Snowflake to Jira—sync data, trigger actions, and keep teams aligned.
              </p>
              <Link to="/product" className="fm-btn-primary">
                Browse integrations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-slate-500 mt-4">New connectors ship weekly.</p>
            </div>

            {/* Integration tiles */}
            <div className="fm-card-dark p-6 animate-item">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Cloud, name: 'AWS' },
                  { icon: Database, name: 'Snowflake' },
                  { icon: Globe, name: 'Salesforce' },
                  { icon: Plug, name: 'Zapier' },
                  { icon: Server, name: 'Datadog' },
                  { icon: MessageSquare, name: 'Slack' },
                  { icon: Layers, name: 'Jira' },
                  { icon: Workflow, name: 'GitHub' },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <integration.icon className="w-6 h-6 text-slate-400 group-hover:text-fm-accent transition-colors" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {integration.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Connectors', value: '200+' },
              { label: 'Data Sources', value: '50+' },
              { label: 'Sync Frequency', value: '< 1 min' },
              { label: 'Uptime SLA', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-heading font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Deployment Options (Dark) */}
      <section className="min-h-screen bg-[#0D1B25] relative py-20">
        <div className="fm-container">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="animate-item">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Deploy your way. Secure by default.
              </h2>
              <p className="text-slate-400 mb-8">
                Cloud, VPC, or on-prem. Encryption at rest and in transit. Role-based access with SSO.
              </p>

              {/* Deployment cards */}
              <div className="space-y-4">
                {[
                  { title: 'Cloud', desc: 'Start in minutes', icon: Cloud, active: true },
                  { title: 'VPC', desc: 'Isolated networking', icon: Server, active: false },
                  { title: 'On‑Premise', desc: 'Full data control', icon: Lock, active: false },
                ].map((option) => (
                  <div
                    key={option.title}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      option.active
                        ? 'bg-white/10 border-fm-accent/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <option.icon
                        className={`w-5 h-5 ${option.active ? 'text-fm-accent' : 'text-slate-400'}`}
                      />
                      <div>
                        <div className="font-heading font-semibold text-white">{option.title}</div>
                        <div className="text-xs text-slate-400">{option.desc}</div>
                      </div>
                      {option.active && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-fm-accent" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/product" className="fm-btn-primary mt-8 inline-flex">
                Compare deployment options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right panel */}
            <div className="fm-card-dark p-6 animate-item">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <DonutChart
                  segments={[
                    { value: 60, color: '#2B6CB0', label: 'Cloud' },
                    { value: 25, color: '#2BB1C5', label: 'VPC' },
                    { value: 15, color: '#C9D3DF', label: 'On-Prem' },
                  ]}
                  size={120}
                  centerText="Cloud"
                  centerSubtext="Most popular"
                />
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Setup Time</div>
                    <div className="text-lg font-heading font-bold text-white">&lt; 5 min</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Encryption</div>
                    <div className="text-lg font-heading font-bold text-white">AES-256</div>
                  </div>
                </div>
              </div>

              <BarChart
                data={[
                  { label: 'CPU', value: 65 },
                  { label: 'Mem', value: 48 },
                  { label: 'Net', value: 82 },
                  { label: 'Disk', value: 35 },
                ]}
                height={120}
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {['SAML / OIDC', 'AUDIT LOGS', 'ENCRYPTED'].map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-lg bg-fm-accent/20 text-[10px] font-mono text-fm-accent uppercase tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Footer CTA + Trust Badges */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              Trusted by teams that ship
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-xl mx-auto mb-8">
              From YC startups to Fortune 500, teams rely on FlowMind to keep their operations running smoothly.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: "FlowMind caught a workflow bottleneck that would have delayed our product launch by 2 weeks. It's like having an extra engineering manager.",
                name: 'Sarah Chen',
                role: 'VP Engineering',
                company: 'TechStart Inc.',
              },
              {
                quote: "We reduced our incident response time by 40% in the first month. The anomaly detection is incredibly accurate.",
                name: 'Marcus Johnson',
                role: 'Head of Operations',
                company: 'DataFlow Co.',
              },
              {
                quote: "Finally, a tool that gives our product team visibility into engineering workflows without adding process overhead.",
                name: 'Elena Rodriguez',
                role: 'Product Director',
                company: 'CloudScale',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="fm-card p-6 hover:shadow-card-hover transition-shadow"
              >
                <p className="text-fm-text dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fm-accent/10 flex items-center justify-center">
                    <span className="text-sm font-heading font-bold text-fm-accent">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-fm-text dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-fm-slate dark:text-slate-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="fm-card p-8 md:p-12 text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
              Start seeing clearly today
            </h3>
            <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
              Join hundreds of teams using FlowMind to optimize their workflows and deliver faster.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="fm-btn-primary">
                Request a demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/pricing" className="fm-btn-secondary">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}