import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Check,
  ArrowRight,
  Sparkles,
  Building2,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    description: 'For small teams getting started with workflow intelligence',
    monthlyPrice: 49,
    yearlyPrice: 39,
    icon: Zap,
    popular: false,
    features: [
      'Up to 10 team members',
      '3 data source integrations',
      'Basic workflow mapping',
      'Standard dashboards',
      'Email alerts',
      '7-day data retention',
      'Community support',
    ],
    cta: 'Start free trial',
    ctaStyle: 'secondary' as const,
  },
  {
    name: 'Growth',
    description: 'For growing teams that need advanced analytics and automation',
    monthlyPrice: 149,
    yearlyPrice: 119,
    icon: Sparkles,
    popular: true,
    features: [
      'Up to 50 team members',
      'Unlimited integrations',
      'Advanced workflow intelligence',
      'Predictive analytics',
      'Anomaly detection',
      'Custom dashboards',
      'Slack & Teams alerts',
      'API access',
      '90-day data retention',
      'Priority support',
    ],
    cta: 'Start free trial',
    ctaStyle: 'primary' as const,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced security and compliance needs',
    monthlyPrice: null,
    yearlyPrice: null,
    icon: Building2,
    popular: false,
    features: [
      'Unlimited team members',
      'Unlimited integrations',
      'Full workflow intelligence suite',
      'Advanced predictive models',
      'Custom ML model training',
      'SSO & SAML',
      'Audit logs & compliance',
      'Custom data retention',
      'Dedicated success manager',
      'SLA guarantee',
      'On-premise deployment option',
    ],
    cta: 'Contact sales',
    ctaStyle: 'secondary' as const,
  },
]

const comparisonFeatures = [
  { name: 'Team members', starter: '10', growth: '50', enterprise: 'Unlimited' },
  { name: 'Data sources', starter: '3', growth: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Workflow mapping', starter: 'Basic', growth: 'Advanced', enterprise: 'Advanced' },
  { name: 'Predictive analytics', starter: false, growth: true, enterprise: true },
  { name: 'Anomaly detection', starter: false, growth: true, enterprise: true },
  { name: 'Custom dashboards', starter: false, growth: true, enterprise: true },
  { name: 'API access', starter: false, growth: true, enterprise: true },
  { name: 'SSO / SAML', starter: false, growth: false, enterprise: true },
  { name: 'Audit logs', starter: false, growth: false, enterprise: true },
  { name: 'Data retention', starter: '7 days', growth: '90 days', enterprise: 'Custom' },
  { name: 'Support', starter: 'Community', growth: 'Priority', enterprise: 'Dedicated' },
  { name: 'SLA', starter: false, growth: false, enterprise: true },
  { name: 'On-premise', starter: false, growth: false, enterprise: true },
]

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with a 14-day free trial of the Growth plan. No credit card required. You get full access to all features, and our team will help you set up your first workflows.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the next billing cycle.',
  },
  {
    question: 'What counts as a team member?',
    answer: 'A team member is anyone who accesses the FlowMind platform, receives alerts, or is included in workflow analytics. View-only seats for stakeholders are available at a reduced rate.',
  },
  {
    question: 'Do you offer discounts for nonprofits or education?',
    answer: 'Yes! We offer 50% off for qualified nonprofits and educational institutions. Contact our sales team with your organization details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers for annual Enterprise plans.',
  },
  {
    question: 'Is there a limit on data volume?',
    answer: 'Starter plans include up to 1M events/month. Growth plans include 10M events/month. Enterprise plans have custom limits based on your needs.',
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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
          <div className="text-center max-w-2xl mx-auto animate-section">
            <div className="fm-eyebrow mb-4">Pricing</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-fm-slate dark:text-slate-400 mb-10">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white dark:bg-[#0F1922] border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly
                    ? 'bg-fm-accent text-white'
                    : 'text-fm-slate dark:text-slate-400 hover:text-fm-text dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isYearly
                    ? 'bg-fm-accent text-white'
                    : 'text-fm-slate dark:text-slate-400 hover:text-fm-text dark:hover:text-white'
                }`}
              >
                Yearly
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isYearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark pb-20">
        <div className="fm-container">
          <div className="grid md:grid-cols-3 gap-6 animate-section">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`fm-card p-6 md:p-8 relative animate-item ${
                  plan.popular ? 'ring-2 ring-fm-accent' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-fm-accent text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="w-10 h-10 rounded-xl bg-fm-accent/10 flex items-center justify-center mb-4">
                  <plan.icon className="w-5 h-5 text-fm-accent" />
                </div>

                <h3 className="font-heading text-xl font-bold text-fm-text dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-fm-slate dark:text-slate-400 mb-5">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold text-fm-text dark:text-white">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-fm-slate dark:text-slate-400">/mo</span>
                    </div>
                  ) : (
                    <div className="font-heading text-3xl font-bold text-fm-text dark:text-white">
                      Custom
                    </div>
                  )}
                  {plan.monthlyPrice && isYearly && (
                    <p className="text-xs text-fm-slate dark:text-slate-400 mt-1">
                      Billed annually (${(plan.yearlyPrice || 0) * 12}/year)
                    </p>
                  )}
                </div>

                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all mb-6 ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-fm-accent text-white hover:bg-[#235a94]'
                      : 'border border-slate-200 dark:border-white/10 text-fm-text dark:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-fm-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-fm-text dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
              Feature comparison
            </h2>
            <p className="text-fm-slate dark:text-slate-400">
              Compare plans to find the right fit for your team.
            </p>
          </div>

          <div className="overflow-x-auto animate-section">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="py-4 px-4 text-sm font-medium text-fm-slate dark:text-slate-400">Feature</th>
                  <th className="py-4 px-4 text-sm font-medium text-fm-text dark:text-white text-center">Starter</th>
                  <th className="py-4 px-4 text-sm font-medium text-fm-accent text-center">Growth</th>
                  <th className="py-4 px-4 text-sm font-medium text-fm-text dark:text-white text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-slate-100 dark:border-white/5 ${
                      i % 2 === 0 ? 'bg-slate-50/50 dark:bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-fm-text dark:text-white">
                      {feature.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="w-4 h-4 text-fm-accent mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )
                      ) : (
                        <span className="text-sm text-fm-slate dark:text-slate-400">{feature.starter}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.growth === 'boolean' ? (
                        feature.growth ? (
                          <Check className="w-4 h-4 text-fm-accent mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )
                      ) : (
                        <span className="text-sm text-fm-slate dark:text-slate-400">{feature.growth}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="w-4 h-4 text-fm-accent mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )
                      ) : (
                        <span className="text-sm text-fm-slate dark:text-slate-400">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20">
        <div className="fm-container">
          <div className="max-w-3xl mx-auto animate-section">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-8 text-center">
              Frequently asked questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="fm-card overflow-hidden animate-item"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-fm-text dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-fm-slate shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-fm-slate shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-fm-slate dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="fm-card p-8 md:p-12 text-center animate-section">
            <div className="animate-item">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Our team is happy to help you find the right plan for your organization.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="fm-btn-primary">
                  Contact sales
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="fm-btn-secondary">
                  Schedule a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}