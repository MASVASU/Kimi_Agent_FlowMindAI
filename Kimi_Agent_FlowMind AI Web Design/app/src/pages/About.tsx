import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Target,
  Eye,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'We believe in accurate, actionable insights. Every feature is designed to give you confidence in your operational decisions.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'No black boxes. You should always understand how our AI arrives at its recommendations and be able to validate its outputs.',
  },
  {
    icon: Zap,
    title: 'Velocity',
    description: 'Speed matters. We help teams move faster by eliminating process friction and surfacing bottlenecks before they become blockers.',
  },
  {
    icon: Users,
    title: 'Human-centered',
    description: 'Technology should serve people, not the other way around. We design for the humans who use our platform every day.',
  },
]

const milestones = [
  { year: '2023', event: 'Founded in San Francisco', highlight: false },
  { year: '2023', event: 'Accepted into Y Combinator W24 batch', highlight: true },
  { year: '2024', event: 'Launched beta with 50 design partners', highlight: false },
  { year: '2024', event: 'Public launch + Series A', highlight: true },
  { year: '2024', event: '200+ enterprise customers', highlight: false },
  { year: '2025', event: 'SOC 2 Type II certified', highlight: true },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        const items = section.querySelectorAll('.animate-item')
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="pt-16">
      {/* Hero */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20 md:py-28">
        <div className="fm-container">
          <div className="max-w-3xl animate-section">
            <div className="fm-eyebrow mb-4">About</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              Building the future of workflow intelligence
            </h1>
            <p className="text-lg md:text-xl text-fm-slate dark:text-slate-400 leading-relaxed mb-8">
              FlowMind was born from a simple observation: the most innovative companies lose countless hours to invisible process friction. We're here to change that.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono font-semibold text-fm-cyan tracking-wider uppercase bg-fm-cyan/10 px-3 py-1.5 rounded-lg">
                YC W24
              </span>
              <span className="text-sm text-fm-slate dark:text-slate-400">
                Backed by Y Combinator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="grid md:grid-cols-2 gap-10 animate-section">
            <div className="animate-item">
              <div className="w-12 h-12 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-fm-accent" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-fm-slate dark:text-slate-400 leading-relaxed">
                To make every organization operate at its fullest potential by eliminating invisible workflow friction. We believe that when teams can see their processes clearly, they can improve them continuously—and deliver better outcomes for everyone.
              </p>
            </div>
            <div className="animate-item">
              <div className="w-12 h-12 rounded-xl bg-fm-cyan/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-fm-cyan" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-fm-slate dark:text-slate-400 leading-relaxed">
                A world where every team has perfect visibility into their workflows, where AI handles the burden of process monitoring, and where humans focus on creative, strategic work that only they can do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              Our values
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 animate-section">
            {values.map((value) => (
              <div
                key={value.title}
                className="fm-card p-6 md:p-8 animate-item"
              >
                <div className="w-10 h-10 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-fm-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-fm-slate dark:text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Milestones */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              Our journey
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-xl mx-auto">
              From Y Combinator to serving hundreds of teams worldwide.
            </p>
          </div>

          <div className="max-w-2xl mx-auto animate-section">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-6 animate-item"
                  >
                    {/* Dot */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        milestone.highlight
                          ? 'bg-fm-accent/20'
                          : 'bg-slate-100 dark:bg-white/5'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          milestone.highlight ? 'bg-fm-accent' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <span className="text-xs font-mono text-fm-slate uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <p className="text-fm-text dark:text-white mt-1">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-section">
            {[
              { label: 'Customers', value: '200+', icon: Users },
              { label: 'Workflows Analyzed', value: '1M+', icon: TrendingUp },
              { label: 'Uptime', value: '99.97%', icon: Shield },
              { label: 'Team Members', value: '45', icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="fm-card p-6 text-center animate-item"
              >
                <stat.icon className="w-6 h-6 text-fm-accent mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-fm-text dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-fm-slate uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="fm-card p-8 md:p-12 text-center animate-section">
            <div className="animate-item">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                Join our team
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
                We're always looking for exceptional people who are passionate about building the future of work.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="fm-btn-primary">
                  View open positions
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="fm-btn-secondary">
                  Learn about our culture
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}