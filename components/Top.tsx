'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

export default function Top() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/results', label: 'Results' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
  ]

  const isSignedIn = pathname.startsWith('/learn')
  const isLandingPage = [
    '/',
    '/how-it-works',
    '/results',
    '/testimonials',
    '/pricing',
    '/faq',
    '/get-started',
  ].includes(pathname)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm'
          : 'bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className='px-6 py-4 mx-auto max-w-7xl flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center group'>
          <img
            src='/logo/vert-logo.png'
            alt='Learn More'
            className='h-8 sm:h-10 w-auto group-hover:opacity-80 transition-opacity duration-300'
          />
        </Link>

        {/* Desktop Navigation */}
        {isLandingPage ? (
          <nav className='hidden md:flex items-center gap-1'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className='hidden md:flex items-center gap-1'>
            <Link
              href='/learn'
              className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200'
            >
              Dashboard
            </Link>
          </nav>
        )}

        {/* CTA and Auth */}
        <div className='flex items-center gap-3'>
          <SignedOut>
            {isLandingPage && (
              <Link
                href='/sign-up'
                className='hidden sm:inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm'
              >
                Get Started
              </Link>
            )}
            <SignInButton mode='redirect'>
              <button className='hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href='/learn'
              className='hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors'
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6 text-gray-900 dark:text-white' />
            ) : (
              <Menu className='w-6 h-6 text-gray-900 dark:text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md'>
          <nav className='px-6 py-4 space-y-2'>
            {isLandingPage ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
              <Link
                href='/learn'
                className='block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200'
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            )}

            <SignedOut>
              {isLandingPage && (
                <Link
                  href='/get-started'
                  className='block w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200'
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              )}
              <SignInButton mode='redirect'>
                <button className='block w-full mt-2 px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-sm'>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  )
}
