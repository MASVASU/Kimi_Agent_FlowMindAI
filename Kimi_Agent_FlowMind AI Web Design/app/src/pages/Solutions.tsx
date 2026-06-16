import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Rocket,
  Users,
  Settings,
  Building2,
  Check,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Workflow,
  Target,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    id: 'founders',
    icon: Rocket,
    title: 'For Founders',
    subtitle: 'Scale without chaos',
    description: 'As a founder, you need visibility into every part of your business without getting buried in operational details. FlowMind gives you the high-level insights you need to make strategic decisions while your team stays focused on execution.',
    benefits: [
      'See across all teams and projects in one view',
      'Identify bottlenecks before they become fires',
      'Make data-driven resource allocation decisions',
      'Keep investors updated with automated reports',
      'Scale processes as you grow headcount',
    ],
    metrics: [
      { label: 'Time Saved', value: '10hrs', desc: 'Per week on status updates' },
      { label: 'Projects On Track', value: '+35%', desc: 'With early warning system' },
      { label: 'Decision Speed', value: '2x', desc: 'Fer with real-time data' },
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'product-teams',
    icon: Users,
    title: 'For Product Teams',
    subtitle: 'Ship faster with visibility',
    description: 'Product teams need to ship fast while maintaining quality. FlowMind helps you understand engineering velocity, identify process blockers, and align cross-functional teams around shared goals.',
    benefits: [
      'Track engineering velocity and cycle time trends',
      'Identify blockers in the delivery pipeline',
      'Correlate process changes with output metrics',
      'Align product, design, and engineering workflows',
      'Predict delivery timelines with ML accuracy',
    ],
    metrics: [
      { label: 'Cycle Time', value: '-28%', desc: 'Average reduction' },
      { label: 'On-Time Delivery', value: '94%', desc: 'With forecasting' },
      { label: 'Cross-team Alignment', value: '+42%', desc: 'Measured collaboration' },
    ],
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'operations',
    icon: Settings,
    title: 'For Operations Teams',
    subtitle: 'Optimize processes end-to-end',
    description: 'Operations teams are the backbone of every organization. FlowMind helps you map processes, measure efficiency, and continuously improve how work flows through your organization.',
    benefits: [
      'Automatically map processes from system logs',
      'Measure process efficiency with KPI dashboards',
      'Detect anomalies and outliers in real-time',
      'Generate audit trails for compliance',
      'Automate repetitive operational tasks',
    ],
    metrics: [
      { label: 'Process Efficiency', value: '+41%', desc: 'Average improvement' },
      { label: 'Anomaly Detection', value: '<3%', desc: 'False positive rate' },
      { label: 'Cost Reduction', value: '-22%', desc: 'Through optimization' },
    ],
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'enterprise',
    icon: Building2,
    title: 'For Enterprises',
    subtitle: 'Enterprise-grade workflow intelligence',
    description: 'Large organizations have complex, interconnected processes spanning multiple departments and systems. FlowMind provides the governance, security, and scale needed for enterprise deployment.',
    benefits: [
      'SOC 2 Type II, HIPAA, and GDPR compliance',
      'SSO and role-based access control',
      'Multi-tenant with data residency options',
      'Custom integrations with existing systems',
      'Dedicated support and success management',
    ],
    metrics: [
      { label: 'Uptime SLA', value: '99.9%', desc: 'Guaranteed availability' },
      { label: 'Setup Time', value: '<2w', desc: 'For full deployment' },
      { label: 'ROI', value: '340%', desc: 'Average first year' },
    ],
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
]

const useCases = [
  {
    title: 'Revenue Operations',
    description: 'Unify sales, marketing, and customer success workflows to accelerate revenue growth.',
    icon: TrendingUp,
  },
  {
    title: 'Engineering Operations',
    description: 'Optimize development workflows, reduce cycle time, and improve deployment frequency.',
    icon: Zap,
  },
  {
    title: 'Compliance & Risk',
    description: 'Monitor compliance posture, detect policy violations, and maintain audit readiness.',
    icon: Shield,
  },
  {
    title: 'Business Intelligence',
    description: 'Transform operational data into actionable insights for strategic decision-making.',
    icon: BarChart3,
  },
  {
    title: 'Process Excellence',
    description: 'Continuously improve business processes with data-driven insights and automation.',
    icon: Workflow,
  },
  {
    title: 'Strategic Planning',
    description: 'Use predictive analytics to forecast capacity needs and plan resource allocation.',
    icon: Target,
  },
]

export default function Solutions() {
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
            <div className="fm-eyebrow mb-4">Solutions</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              Workflow intelligence for every team
            </h1>
            <p className="text-lg md:text-xl text-fm-slate dark:text-slate-400 mb-8 leading-relaxed">
              Whether you're a startup founder or running operations at a Fortune 500, FlowMind adapts to your needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="fm-btn-primary">
                Talk to solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/pricing" className="fm-btn-secondary">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by Role */}
      {solutions.map((solution, index) => (
        <section
          key={solution.id}
          id={solution.id}
          className={`py-16 md:py-24 ${
            index % 2 === 0 ? 'bg-fm-bg dark:bg-fm-bg-dark' : 'bg-white dark:bg-[#0F1922]'
          }`}
        >
          <div className="fm-container">
            <div className={`grid lg:grid-cols-2 gap-10 items-center animate-section ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="animate-item">
                  <div className={`w-14 h-14 rounded-2xl ${solution.bgColor} flex items-center justify-center mb-5`}>
                    <solution.icon className={`w-7 h-7 ${solution.iconColor}`} />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-fm-text dark:text-white mb-2">
                    {solution.title}
                  </h2>
                  <p className="text-fm-accent font-medium mb-4">{solution.subtitle}</p>
                  <p className="text-fm-slate dark:text-slate-400 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-fm-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-fm-accent" />
                        </div>
                        <span className="text-sm text-fm-text dark:text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="fm-btn-primary">
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className={`animate-item ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`fm-card p-6 bg-gradient-to-br ${solution.color}`}>
                  <div className="space-y-4">
                    {solution.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-white/80 dark:bg-[#0F1922]/80 backdrop-blur-sm rounded-xl p-5"
                      >
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-heading text-3xl font-bold text-fm-text dark:text-white">
                            {metric.value}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-fm-slate uppercase tracking-wider mb-1">
                          {metric.label}
                        </div>
                        <div className="text-sm text-fm-slate dark:text-slate-400">{metric.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Use Cases Grid */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              Use cases
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-xl mx-auto">
              FlowMind adapts to how your organization works.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-section">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="fm-card p-6 hover:shadow-card-hover transition-all hover:-translate-y-0.5 animate-item"
              >
                <div className="w-10 h-10 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-5 h-5 text-fm-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-fm-slate dark:text-slate-400">{useCase.description}</p>
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
                Not sure which solution fits?
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Our solutions engineers will help you identify the right modules for your team's needs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="fm-btn-primary">
                  Talk to solutions engineering
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/product" className="fm-btn-secondary">
                  Explore all features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}