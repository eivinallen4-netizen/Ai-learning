'use client'
// NOTE: Top navigation/header with desktop nav and mobile hamburger menu.

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"

import { Button } from "./ui/button"

// NOTE: `Top` encapsulates reusable logic for this module.
export default function Top()
{
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

// NOTE: `navItems` stores a constant/reference used in this scope.
    const navItems = [
      { href: "/#hero", label: "Home" },
      { href: "/#problem", label: "Problem" },
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/#features", label: "Features" },
      { href: "/#reviews", label: "Reviews" },
      { href: "/#faq", label: "FAQ" },
    ];

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen((prev) => !prev)
    }

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }

    const renderDesktopNavItem = (item: { href: string; label: string }) => (
      <Button key={item.href} variant='ghost' size='sm' asChild>
        <Link href={item.href}>{item.label}</Link>
      </Button>
    )

    const renderMobileNavItem = (item: { href: string; label: string }) => (
      <Button key={item.href} variant='ghost' className='justify-start' asChild>
        <Link href={item.href} onClick={closeMobileMenu}>
          {item.label}
        </Link>
      </Button>
    )

  return (
    <header className='sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-3 py-3'>
        <div className='flex min-w-0 items-center gap-3 md:gap-6'>
          <Link href='/' className='inline-flex shrink-0 items-center'>
          <Image
            src="/logo/vert-logo.png"
            alt="Learn More LGO"
            width={180}
            height={52}
            className="h-8 w-auto object-contain sm:h-10"
            priority
          />
          </Link>
          <nav className='hidden items-center gap-1 md:flex'>
            {navItems.map(renderDesktopNavItem)}
            <SignedIn>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            </SignedIn>
          </nav>
        </div>

        <div className='hidden h-fit md:block'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='redirect'>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>

        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='md:hidden'
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls='mobile-nav'
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
        </Button>
      </div>

      {isMobileMenuOpen ? (
        <div id='mobile-nav' className='border-t px-3 pb-4 md:hidden'>
          <nav className='flex flex-col gap-1 pt-3'>
            {navItems.map(renderMobileNavItem)}
            <SignedIn>
              <Button variant='ghost' className='justify-start' asChild>
                <Link href='/dashboard' onClick={closeMobileMenu}>
                  Dashboard
                </Link>
              </Button>
            </SignedIn>
          </nav>
          <div className='mt-3 border-t pt-3'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode='redirect'>
                <Button size='sm'>Sign in</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      ) : null}
    </header>
  )
}
