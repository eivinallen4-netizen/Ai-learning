// NOTE: Clerk sign-up route page.
import Image from 'next/image'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { clerkAppearance } from '@/lib/clerk-appearance'
import PageScribbles from '@/components/PageScribbles'

// NOTE: `SignUpPage` encapsulates reusable logic for this module.
export default function SignUpPage() {
  return (
    <main className='relative min-h-dvh overflow-x-hidden px-3 py-3 sm:px-5 sm:py-5 md:h-dvh md:overflow-hidden md:px-8 md:py-8'>
      <Image src='/assets/signupinbg.png' alt='' aria-hidden='true' fill priority className='object-cover object-center' />
      <div className='absolute inset-0 bg-gradient-to-br from-slate-950/72 via-slate-900/62 to-blue-950/58' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.18),_transparent_40%),radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.24),_transparent_35%)]' />
      <PageScribbles preset='auth' />

      <div className='relative z-10 mx-auto flex min-h-[calc(100dvh-1.5rem)] w-full max-w-5xl items-center sm:min-h-[calc(100dvh-2.5rem)] md:min-h-full'>
        <div className='grid w-full gap-5 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:gap-6 sm:rounded-2xl sm:p-6 md:grid-cols-2 md:gap-8 md:p-10'>
          <section className='order-2 flex flex-col gap-4 text-white md:order-1 md:gap-5'>
            <Image src='/logo/vert-logo.png' alt='Learn More' width={180} height={52} className='h-10 w-auto object-contain brightness-0 invert' priority />
            <Breadcrumb>
              <BreadcrumbList className='text-slate-200'>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/' className='text-slate-200 hover:text-white'>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='text-slate-300' />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-white'>Sign up</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className='inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-slate-100'>LEARN MORE AUTH</p>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Create your account</h1>
            <p className='max-w-md text-sm text-slate-200'>Join to unlock your full Learn Board workflow.</p>
            <Link href='/' className='inline-flex text-sm text-blue-200 hover:text-white hover:underline'>
              Back to home
            </Link>
          </section>
          <section className='order-1 flex items-center justify-center md:order-2'>
            <div className='w-full max-w-sm'>
              <SignUp routing='path' path='/sign-up' signInUrl='/sign-in' forceRedirectUrl='/' appearance={clerkAppearance} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
