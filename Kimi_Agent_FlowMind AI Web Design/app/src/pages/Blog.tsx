import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Clock,
  Tag,
  Search,
  TrendingUp,
  Users,
  Zap,
  Brain,
  BarChart3,
  Target,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Product', slug: 'product' },
  { name: 'Engineering', slug: 'engineering' },
  { name: 'Operations', slug: 'operations' },
  { name: 'AI & ML', slug: 'ai-ml' },
  { name: 'Company', slug: 'company' },
]

const posts = [
  {
    title: 'How We Built Anomaly Detection That Learns Your Business',
    excerpt: 'Building dynamic baselines for anomaly detection required us to rethink how ML models adapt to business context. Here\'s how we did it.',
    category: 'ai-ml',
    author: 'Sarah Chen',
    role: 'Head of ML',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    featured: true,
    icon: Brain,
  },
  {
    title: 'The Hidden Cost of Context Switching in Engineering Teams',
    excerpt: 'Our analysis of 10,000+ developer workflows reveals the true cost of interruptions—and how to minimize them.',
    category: 'engineering',
    author: 'Marcus Johnson',
    role: 'Engineering Lead',
    date: 'Jan 10, 2025',
    readTime: '6 min read',
    featured: false,
    icon: Zap,
  },
  {
    title: 'From Series A to 200 Customers: Our Growth Playbook',
    excerpt: 'A transparent look at the strategies that helped us grow from a YC startup to serving hundreds of enterprise customers.',
    category: 'company',
    author: 'Elena Rodriguez',
    role: 'CEO',
    date: 'Jan 5, 2025',
    readTime: '10 min read',
    featured: false,
    icon: TrendingUp,
  },
  {
    title: 'Predictive Capacity Planning: Beyond Spreadsheets',
    excerpt: 'Why traditional capacity planning fails—and how AI-powered forecasting helps teams stay ahead of demand.',
    category: 'product',
    author: 'David Kim',
    role: 'Product Manager',
    date: 'Dec 28, 2024',
    readTime: '7 min read',
    featured: false,
    icon: BarChart3,
  },
  {
    title: 'Building SOC 2 Compliance Into Your Product From Day One',
    excerpt: 'Lessons from our journey to SOC 2 Type II certification and how we baked security into our product architecture.',
    category: 'engineering',
    author: 'Alex Thompson',
    role: 'Security Lead',
    date: 'Dec 20, 2024',
    readTime: '9 min read',
    featured: false,
    icon: Target,
  },
  {
    title: 'Workflow Intelligence: The Next Frontier in Operations',
    excerpt: 'Why workflow intelligence is becoming the must-have tool for modern operations teams.',
    category: 'operations',
    author: 'Sarah Chen',
    role: 'Head of ML',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    featured: false,
    icon: Users,
  },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = posts.find((p) => p.featured)

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
            <div className="fm-eyebrow mb-4">Blog</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-fm-text dark:text-white mb-6 leading-[0.95]">
              Insights on workflow intelligence
            </h1>
            <p className="text-lg md:text-xl text-fm-slate dark:text-slate-400 mb-10 leading-relaxed">
              Thoughts on building better processes, leveraging AI for operations, and lessons from our journey.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fm-slate" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#0F1922] border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark pb-6">
        <div className="fm-container">
          <div className="flex flex-wrap gap-2 animate-section">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.slug
                    ? 'bg-fm-accent text-white'
                    : 'bg-white dark:bg-[#0F1922] text-fm-slate dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-fm-accent/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === 'all' && !searchQuery && (
        <section className="bg-fm-bg dark:bg-fm-bg-dark py-8">
          <div className="fm-container">
            <div className="fm-card overflow-hidden animate-section">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center animate-item">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-fm-accent/10 text-xs font-mono text-fm-accent uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="text-xs font-mono text-fm-slate uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-fm-slate dark:text-slate-400 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-fm-accent/10 flex items-center justify-center">
                      <span className="text-xs font-heading font-bold text-fm-accent">
                        {featuredPost.author[0]}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-fm-text dark:text-white">
                        {featuredPost.author}
                      </div>
                      <div className="text-xs text-fm-slate">
                        {featuredPost.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-fm-slate">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.date}
                    </span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-fm-accent/10 to-fm-cyan/10 flex items-center justify-center p-10">
                  <featuredPost.icon className="w-32 h-32 text-fm-accent/30" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="bg-fm-bg dark:bg-fm-bg-dark py-12">
        <div className="fm-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-section">
            {filteredPosts
              .filter((p) => !p.featured || activeCategory !== 'all' || searchQuery)
              .map((post) => (
                <article
                  key={post.title}
                  className="fm-card overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-0.5 animate-item group"
                >
                  <div className="h-40 bg-gradient-to-br from-fm-accent/10 to-fm-cyan/10 flex items-center justify-center">
                    <post.icon className="w-16 h-16 text-fm-accent/20 group-hover:text-fm-accent/40 transition-colors" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-3 h-3 text-fm-slate" />
                      <span className="text-xs font-mono text-fm-slate uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-fm-text dark:text-white mb-2 group-hover:text-fm-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-fm-slate dark:text-slate-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-fm-slate">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-fm-slate dark:text-slate-400">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-[#0F1922] py-20">
        <div className="fm-container">
          <div className="fm-card p-8 md:p-12 text-center animate-section">
            <div className="animate-item">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-fm-text dark:text-white mb-4">
                Want product updates delivered to your inbox?
              </h2>
              <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Subscribe to our newsletter for the latest on workflow intelligence, product updates, and industry insights.
              </p>
              <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-fm-text dark:text-white placeholder:text-fm-slate focus:outline-none focus:ring-2 focus:ring-fm-accent/50"
                />
                <button className="fm-btn-primary">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}