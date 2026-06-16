import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { useTheme } from './ThemeProvider'
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'

const navLinks = [
  {
    label: 'Product',
    href: '/product',
    children: [
      { label: 'Workflow Intelligence', href: '/product#workflow-intelligence', desc: 'AI-powered bottleneck detection' },
      { label: 'Predictive Analytics', href: '/product#predictive-analytics', desc: 'Forecast delays before they happen' },
      { label: 'Team Insights', href: '/product#team-insights', desc: 'Understand team productivity' },
      { label: 'Integrations', href: '/product#integrations', desc: 'Connect your existing tools' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'For Founders', href: '/solutions#founders', desc: 'Scale without chaos' },
      { label: 'For Product Teams', href: '/solutions#product-teams', desc: 'Ship faster with visibility' },
      { label: 'For Operations', href: '/solutions#operations', desc: 'Optimize processes end-to-end' },
      { label: 'For Enterprises', href: '/solutions#enterprise', desc: 'Enterprise-grade workflow intelligence' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#09131A]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(17,24,39,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="fm-container flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-fm-accent flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-lg text-fm-text dark:text-white tracking-tight">
              FlowMind
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.href
                      ? 'text-fm-accent'
                      : 'text-fm-text dark:text-slate-300 hover:text-fm-text dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-72 p-2 bg-white dark:bg-[#0F1922] rounded-xl shadow-card border border-slate-100 dark:border-white/10 animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="flex flex-col gap-0.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium text-fm-text dark:text-white">
                          {child.label}
                        </span>
                        <span className="text-xs text-fm-slate dark:text-slate-400">
                          {child.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-fm-slate dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Sign In - Desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex text-sm font-medium text-fm-text dark:text-slate-300 hover:text-fm-text dark:hover:text-white px-3 py-2 transition-colors"
            >
              Sign in
            </Link>

            {/* CTA - Desktop */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-fm-accent text-white text-sm font-medium hover:bg-[#235a94] transition-colors"
            >
              Request demo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg text-fm-text dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-[#09131A] border-b border-slate-100 dark:border-white/10 shadow-lg animate-fade-in">
            <div className="fm-container py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-fm-text dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    onClick={() => !link.children && setIsMobileOpen(false)}
                  >
                    {link.label}
                    {!link.children && <ArrowRight className="w-4 h-4 text-fm-slate" />}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-fm-slate dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-fm-accent text-white text-sm font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Request demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}