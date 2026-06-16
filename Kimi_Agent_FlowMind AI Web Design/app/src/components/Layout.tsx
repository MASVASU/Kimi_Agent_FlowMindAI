import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-fm-bg dark:bg-fm-bg-dark transition-colors duration-300">
      {/* Grain overlay */}
      <div className="fm-grain" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}