import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Building2,
  Send,
  Check,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Clock,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'demo' | 'sales' | 'support'>('demo')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', company: '', teamSize: '', message: '' })
    }, 3000)
  }

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

  const tabs = [
    { id: 'demo' as const, label: 'Request Demo', icon: MessageSquare, desc: 'See FlowMind in action' },
    { id: 'sales' as const, label: 'Contact Sales', icon: Building2, desc: 'Enterprise inquiries' },
    { id: 'support' as const, label: 'Support', icon: Mail, desc: 'Get help from our team' },
  ]

  return (
    <div ref={containerRef} className="pt-16">
      {/* Hero */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-20 md:py-28">
        <div className="fm-container">
          <div className="max-w-3xl animate-section">
            <div className="fm-eyebrow mb-4">Contact</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              Let's talk
            </h1>
            <p className="text-lg md:text-xl text-fm-slate dark:text-slate-400 leading-relaxed">
              Whether you're ready to get started or just exploring, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark pb-20">
        <div className="fm-container">
          <div className="grid lg:grid-cols-5 gap-10 animate-section">
            {/* Left - Info */}
            <div className="lg:col-span-2 animate-item">
              {/* Tabs */}
              <div className="space-y-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-fm-accent/10 border border-fm-accent/20'
                        : 'bg-white dark:bg-[#0F1922] border border-slate-200 dark:border-white/10 hover:border-fm-accent/30'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeTab === tab.id ? 'bg-fm-accent/20' : 'bg-slate-100 dark:bg-white/5'
                      }`}
                    >
                      <tab.icon
                        className={`w-5 h-5 ${
                          activeTab === tab.id ? 'text-fm-accent' : 'text-fm-slate'
                        }`}
                      />
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          activeTab === tab.id ? 'text-fm-text dark:text-white' : 'text-fm-slate dark:text-slate-400'
                        }`}
                      >
                        {tab.label}
                      </div>
                      <div className="text-xs text-fm-slate dark:text-slate-500">{tab.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-fm-slate shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-fm-text dark:text-white">Email</div>
                    <a
                      href="mailto:hello@flowmind.ai"
                      className="text-sm text-fm-accent hover:underline"
                    >
                      hello@flowmind.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-fm-slate shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-fm-text dark:text-white">Office</div>
                    <p className="text-sm text-fm-slate dark:text-slate-400">
                      555 Montgomery Street<br />
                      San Francisco, CA 94111
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-fm-slate shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-fm-text dark:text-white">Hours</div>
                    <p className="text-sm text-fm-slate dark:text-slate-400">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM PT
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <div className="text-sm font-medium text-fm-text dark:text-white mb-3">Follow us</div>
                <div className="flex gap-2">
                  {[
                    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                    { icon: Github, label: 'GitHub', href: 'https://github.com' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white dark:bg-[#0F1922] border border-slate-200 dark:border-white/10 flex items-center justify-center text-fm-slate hover:text-fm-accent hover:border-fm-accent/30 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3 animate-item">
              <div className="fm-card p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-fm-text dark:text-white mb-2">
                      Message sent!
                    </h3>
                    <p className="text-fm-slate dark:text-slate-400">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-fm-text dark:text-white mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-fm-text dark:text-white mb-1.5">
                        Work email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-fm-text dark:text-white mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-fm-text dark:text-white mb-1.5">
                          Team size
                        </label>
                        <select
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all"
                        >
                          <option value="">Select...</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-1000">201-1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-fm-text dark:text-white mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all resize-none"
                        placeholder={`Tell us about your ${activeTab === 'demo' ? 'workflow challenges' : activeTab === 'sales' ? 'organization and needs' : 'issue or question'}...`}
                      />
                    </div>

                    <button type="submit" className="w-full fm-btn-primary justify-center">
                      <Send className="w-4 h-4" />
                      {activeTab === 'demo' && 'Request demo'}
                      {activeTab === 'sales' && 'Contact sales'}
                      {activeTab === 'support' && 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="text-center mb-12 animate-section">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
              Quick answers
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto animate-section">
            {[
              { q: 'How long is the demo?', a: 'Most demos take 20-30 minutes, tailored to your use case.' },
              { q: 'Do you offer a free trial?', a: 'Yes! 14-day free trial of the Growth plan, no credit card required.' },
              { q: 'What integrations are supported?', a: '200+ integrations including Salesforce, Jira, Slack, Snowflake, and more.' },
              { q: 'Is my data secure?', a: 'SOC 2 Type II certified with end-to-end encryption at rest and in transit.' },
              { q: 'Can I deploy on-premise?', a: 'Yes, available on our Enterprise plan with full data control.' },
              { q: 'How fast can we get started?', a: 'Cloud deployment takes less than 5 minutes. Full enterprise setup is under 2 weeks.' },
            ].map((faq) => (
              <div key={faq.q} className="fm-card p-5 animate-item">
                <h4 className="font-medium text-fm-text dark:text-white mb-2 text-sm">{faq.q}</h4>
                <p className="text-xs text-fm-slate dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm font-medium text-fm-accent hover:underline">
              View full FAQ on pricing page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}