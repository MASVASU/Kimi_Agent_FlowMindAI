import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Workflow,
  Brain,
  Users,
  Zap,
  Shield,
  Activity,
  Check,
} from 'lucide-react'
import { default as FlowLineChart } from '../components/charts/LineChart'
import AreaChart from '../components/charts/AreaChart'
import DonutChart from '../components/charts/DonutChart'

gsap.registerPlugin(ScrollTrigger)

const lineData1 = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 40 + Math.sin(i * 0.8) * 20 + i * 3 }))
const lineData2 = Array.from({ length: 12 }, (_, i) => ({ x: i, y: 35 + Math.cos(i * 0.6) * 15 + i * 2 }))

const features = [
  {
    id: 'workflow-intelligence',
    icon: Workflow,
    title: 'Workflow Intelligence',
    subtitle: 'Map, measure, and optimize every process',
    description: 'Automatically discover workflows across your organization. Visualize process paths, identify bottlenecks, and get AI-powered recommendations for improvement.',
    capabilities: [
      'Automatic workflow discovery from event logs',
      'Process path visualization with heatmaps',
      'Bottleneck detection with severity scoring',
      'AI-powered optimization recommendations',
      'What-if scenario modeling',
      'Cross-system workflow correlation',
    ],
    metrics: { label: 'Bottlenecks Found', value: '47%', desc: 'Average reduction in cycle time' },
  },
  {
    id: 'predictive-analytics',
    icon: Brain,
    title: 'Predictive Analytics',
    subtitle: 'Forecast delays before they happen',
    description: 'Machine learning models analyze historical patterns to predict project delays, resource constraints, and capacity issues with up to 94% accuracy.',
    capabilities: [
      'Delivery timeline forecasting',
      'Resource capacity planning',
      'Risk scoring with confidence intervals',
      'Seasonal pattern detection',
      'Dependency impact analysis',
      'Predictive alerting',
    ],
    metrics: { label: 'Forecast Accuracy', value: '94%', desc: 'Within 2-week window' },
  },
  {
    id: 'anomaly-detection',
    icon: Activity,
    title: 'Anomaly Detection',
    subtitle: 'Spot deviations that matter',
    description: 'Dynamic baselines learn your normal operational patterns and surface only actionable deviations—no more alert fatigue from static thresholds.',
    capabilities: [
      'Dynamic baseline calculation',
      'Multi-dimensional anomaly scoring',
      'Root-cause correlation snippets',
      'Auto-ticket creation with context',
      'Anomaly suppression rules',
      'Historical anomaly replay',
    ],
    metrics: { label: 'False Positive Rate', value: '<3%', desc: 'Industry-leading precision' },
  },
  {
    id: 'team-insights',
    icon: Users,
    title: 'Team Insights',
    subtitle: 'Understand team productivity patterns',
    description: 'Gain visibility into team workload distribution, collaboration patterns, and productivity trends—without surveillance or micromanagement.',
    capabilities: [
      'Workload distribution analysis',
      'Collaboration pattern mapping',
      'Context-switching measurement',
      'Flow state detection',
      'Team health indicators',
      'Burnout risk early warning',
    ],
    metrics: { label: 'Productivity Gain', value: '+41%', desc: 'Reduced context switching' },
  },
  {
    id: 'process-automation',
    icon: Zap,
    title: 'Process Automation',
    subtitle: 'Automate repetitive operational tasks',
    description: 'Build automated workflows that trigger actions, create tickets, send notifications, and update systems based on detected patterns and anomalies.',
    capabilities: [
      'Visual workflow builder',
      'Conditional branching logic',
      'Multi-system action execution',
      'Approval workflow integration',
      'Error handling and retries',
      'Execution audit trails',
    ],
    metrics: { label: 'Tasks Automated', value: '10K+', desc: 'Per month average' },
  },
  {
    id: 'compliance-monitoring',
    icon: Shield,
    title: 'Compliance Monitoring',
    subtitle: 'Stay audit-ready at all times',
    description: 'Continuous compliance monitoring with automated evidence collection, policy enforcement, and audit-ready reporting for SOC 2, HIPAA, and GDPR.',
    capabilities: [
      'Automated evidence collection',
      'Policy drift detection',
      'Access control monitoring',
      'Data residency tracking',
      'Audit trail generation',
      'Compliance dashboard',
    ],
    metrics: { label: 'Audit Prep Time', value: '-80%', desc: 'From weeks to days' },
  },
]

const integrations = [
  { category: 'CRM', tools: ['Salesforce', 'HubSpot', 'Pipedrive'] },
  { category: 'Project Management', tools: ['Jira', 'Asana', 'Monday', 'Linear'] },
  { category: 'Communication', tools: ['Slack', 'Microsoft Teams', 'Discord'] },
  { category: 'Data & Analytics', tools: ['Snowflake', 'BigQuery', 'Datadog', 'Looker'] },
  { category: 'DevOps', tools: ['GitHub', 'GitLab', 'Jenkins', 'CircleCI'] },
  { category: 'Infrastructure', tools: ['AWS', 'GCP', 'Azure', 'Kubernetes'] },
]

export default function Product() {
  const sectionsRef = useRef<HTMLDivElement>(null)

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
    }, sectionsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionsRef} className="pt-16">
      {/* Hero */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20 md:py-28">
        <div className="fm-container">
          <div className="max-w-3xl animate-section">
            <div className="fm-eyebrow mb-4">Product</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              The complete workflow intelligence platform
            </h1>
            <p className="text-lg md:text-xl text-fm-slate dark:text-slate-400 mb-8 leading-relaxed">
              Everything you need to discover, monitor, optimize, and automate your business processes—powered by AI.
            </p>
            <div className="flex flex-wrap gap-3">
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

      {/* Feature Deep Dives */}
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={feature.id}
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
                  <div className="w-12 h-12 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-fm-accent" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-2">
                    {feature.title}
                  </h2>
                  <p className="text-fm-accent font-medium text-sm mb-4">{feature.subtitle}</p>
                  <p className="text-fm-slate dark:text-slate-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {feature.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-fm-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-fm-text dark:text-slate-300">{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-4 px-4 py-3 rounded-xl bg-fm-accent/5 border border-fm-accent/10">
                    <div>
                      <div className="text-2xl font-heading font-bold text-fm-accent">
                        {feature.metrics.value}
                      </div>
                      <div className="text-[10px] font-mono text-fm-slate uppercase tracking-wider">
                        {feature.metrics.label}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-fm-accent/20" />
                    <div className="text-sm text-fm-slate dark:text-slate-400">
                      {feature.metrics.desc}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`animate-item ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="fm-card p-6">
                  {index % 3 === 0 && (
                    <FlowLineChart
                      series={[
                        { data: lineData1, color: '#2B6CB0', label: 'Before', fill: true },
                        { data: lineData2, color: '#2BB1C5', label: 'After' },
                      ]}
                      height={250}
                    />
                  )}
                  {index % 3 === 1 && (
                    <AreaChart
                      series={[
                        { data: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 30 + Math.sin(i * 0.4) * 15 + i * 2 })), color: '#2B6CB0', label: 'Forecast' },
                        { data: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 25 + Math.cos(i * 0.3) * 12 + i * 1.5 })), color: '#2BB1C5', label: 'Actual' },
                      ]}
                      height={250}
                    />
                  )}
                  {index % 3 === 2 && (
                    <div className="flex items-center justify-center">
                      <DonutChart
                        segments={[
                          { value: 60, color: '#2B6CB0', label: 'Optimal' },
                          { value: 25, color: '#2BB1C5', label: 'Good' },
                          { value: 15, color: '#C9D3DF', label: 'Needs Work' },
                        ]}
                        size={180}
                        centerText={feature.metrics.value}
                        centerSubtext={feature.metrics.label}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Integrations */}
      <section id="integrations" className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
              200+ integrations
            </h2>
            <p className="text-fm-slate dark:text-slate-400 max-w-xl mx-auto">
              Connect your existing tools in minutes. No engineering required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-section">
            {integrations.map((category) => (
              <div key={category.category} className="fm-card p-6 animate-item">
                <h3 className="font-heading font-semibold text-fm-text dark:text-white mb-4">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-sm text-fm-slate dark:text-slate-400 border border-slate-100 dark:border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
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
                Ready to see FlowMind in action?
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Get a personalized demo tailored to your team's workflows and challenges.
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
        </div>
      </section>
    </div>
  )
}