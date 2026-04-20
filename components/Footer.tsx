// NOTE: Site footer component with links and small branding text.
import Link from 'next/link'

// NOTE: `Footer` encapsulates reusable logic for this module.
export default function Footer() {
// NOTE: `year` stores a constant/reference used in this scope.
  const year = new Date().getFullYear()

  return (
    <footer className='border-t bg-background px-6 py-10'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-base font-semibold'>Learn More</p>
          <p className='mt-1 text-sm text-muted-foreground'>Free learning support for college students and workers.</p>
        </div>

        <nav className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
          <Link href='/#hero' className='hover:text-foreground'>Home</Link>
          <Link href='/#features' className='hover:text-foreground'>Features</Link>
          <Link href='/#reviews' className='hover:text-foreground'>Reviews</Link>
          <Link href='/#faq' className='hover:text-foreground'>FAQ</Link>
        </nav>
      </div>

      <div className='mx-auto mt-6 w-full max-w-6xl border-t pt-4 text-xs text-muted-foreground'>
        © {year} Learn More. All rights reserved.
      </div>
    </footer>
  )
}

