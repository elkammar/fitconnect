import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui'
import LoginModal from './auth/LoginModal'
import SignupModal from './auth/SignupModal'
import useApp from '../hooks/useApp'

/**
 * Navigation Component
 *
 * Main navigation bar with logo, navigation links, and authentication buttons.
 * Features responsive design with mobile hamburger menu.
 * Sticky positioning at the top of the page.
 */
export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, currentUser, logout } = useApp()

  // Navigation links configuration
  const navLinks = [
    { path: '/discover', label: 'Discover Classes' },
    { path: '/bookings', label: 'My Bookings' },
    { path: '/how-it-works', label: 'How It Works' }
  ]

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Open login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsSignupModalOpen(false)
    setIsMobileMenuOpen(false)
  }

  // Open signup modal
  const openSignupModal = () => {
    setIsSignupModalOpen(true)
    setIsLoginModalOpen(false)
    setIsMobileMenuOpen(false)
  }

  // Switch from login to signup
  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  // Switch from signup to login
  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  // Handle logout
  const handleLogout = async () => {
    console.log('Navigation: Logout button clicked')
    try {
      await logout()
      setIsMobileMenuOpen(false)
      console.log('Navigation: Logout completed')
    } catch (error) {
      console.error('Navigation: Logout failed:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200">
                FitConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
                {/* Active indicator underline */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transition-transform duration-200 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons (Right) */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="medium">
                    {currentUser?.full_name || 'Profile'}
                  </Button>
                </Link>
                <Button variant="outline" size="medium" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="medium" onClick={openLoginModal}>
                  Sign In
                </Button>
                <Button variant="primary" size="medium" onClick={openSignupModal}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger Icon */}
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 space-y-2 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={handleLinkClick}>
                  <Button variant="ghost" size="medium" className="w-full">
                    {currentUser?.full_name || 'Profile'}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="medium"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="medium"
                  className="w-full"
                  onClick={openLoginModal}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  className="w-full"
                  onClick={openSignupModal}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  )
}
