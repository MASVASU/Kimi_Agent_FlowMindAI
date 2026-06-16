import { Link } from 'react-router'
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Modules', href: '/product' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/blog' },
    { label: 'Roadmap', href: '/product' },
  ],
  Platform: [
    { label: 'Connectors', href: '/product#integrations' },
    { label: 'API', href: '/product' },
    { label: 'Security', href: '/product' },
    { label: 'Deployment', href: '/product' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Legal', href: '/about' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Docs', href: '/product' },
    { label: 'Community', href: '/contact' },
    { label: 'Support', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#09131A] text-white">
      {/* CTA Section */}
      <div className="fm-container py-16 border-b border-white/10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to bring clarity to your operations?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join teams that use FlowMind to ship faster, waste less, and stay aligned.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fm-accent text-white font-medium text-sm hover:bg-[#235a94] transition-colors"
            >
              Request a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="fm-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-fm-accent flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                FlowMind
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 max-w-xs">
              AI-powered workflow intelligence for modern teams.
            </p>
            {/* YC Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono font-semibold text-fm-cyan tracking-wider uppercase">
                YC W24
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fm-container py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FlowMind Systems, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Cookies
            </Link>
            <Link to="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              SLA
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}