import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 px-6 py-16 overflow-hidden'>
      {/* Subtle gradient background */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/5' />

      <div className='mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-start md:justify-between relative z-10'>
        {/* Brand section */}
        <div>
          <Link href='/' className='inline-block mb-4'>
            <img
              src='/logo/vert-logo.png'
              alt='Learn More'
              className='h-10 w-auto'
            />
          </Link>
          <p className='text-sm text-gray-600 dark:text-gray-400 max-w-sm'>Free learning support for college students and workers. Study smarter, remember longer.</p>
        </div>

        {/* Navigation */}
        <nav className='flex flex-wrap items-center gap-8 text-sm'>
          <Link href='/' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>Home</Link>
          <Link href='/how-it-works' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>How It Works</Link>
          <Link href='/results' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>Results</Link>
          <Link href='/testimonials' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>Testimonials</Link>
          <Link href='/pricing' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>Pricing</Link>
          <Link href='/faq' className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>FAQ</Link>
          <Link href='/get-started' className='font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold'>Get Started</Link>
        </nav>
      </div>

      {/* Bottom divider and copyright */}
      <div className='mx-auto mt-12 w-full max-w-6xl border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <p className='text-xs text-gray-600 dark:text-gray-400'>© {year} Learn More. All rights reserved.</p>
        <div className='flex gap-6 text-xs text-gray-600 dark:text-gray-400'>
          <Link href='#' className='hover:text-gray-900 dark:hover:text-gray-100'>Privacy</Link>
          <Link href='#' className='hover:text-gray-900 dark:hover:text-gray-100'>Terms</Link>
        </div>
      </div>
    </footer>
  )
}

