import Link from 'next/link'
import Scribble from './Scribble'

export default function FinalCtaSection() {
  return (
    <section id='final-cta' className='relative section-container overflow-hidden'>
      <Scribble variant='tall' className='absolute right-2 top-0 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-4xl relative z-10'>
        <div className='rounded-3xl glass border border-blue-500/20 p-12 md:p-16 text-center backdrop-blur-xl'>
          {/* Background gradient effect */}
          <div className='absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent' />

          {/* Content */}
          <h2 className='text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white'>
            Start learning <span className='text-gradient'>faster today</span>
          </h2>
          <p className='mx-auto mb-10 max-w-2xl text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
            Turn your notes and docs into short AI micro-tests that help you remember more for school and work.
            Free to use. No signup required.
          </p>
          <Link href='#start'>
            <button className='btn-primary px-10 py-4 text-lg'>
              Generate My First Quiz →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

