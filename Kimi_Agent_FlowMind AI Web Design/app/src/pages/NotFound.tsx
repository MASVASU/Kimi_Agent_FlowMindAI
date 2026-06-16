import { Link } from 'react-router'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="w-24 h-24 rounded-2xl bg-fm-accent/10 flex items-center justify-center mx-auto mb-6">
          <span className="font-heading text-4xl font-bold text-fm-accent">404</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-fm-text dark:text-white mb-4">
          Page not found
        </h1>
        <p className="text-fm-slate dark:text-slate-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Check the URL or navigate back home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="fm-btn-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
          <Link to="/" className="fm-btn-primary">
            <Home className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}