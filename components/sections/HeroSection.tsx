'use client'
import { ResourceInput } from '@/components/ResourceInput'
import LlamaCheck from '../LlamaCheck'

export default function HeroSection() {

  return (
    <section id='hero' className='relative min-h-screen overflow-hidden px-6 py-24 pt-32 flex items-center justify-center section-container'>
      {/* Animated gradient mesh background */}
      <div className='absolute inset-0 -z-20'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl'
          style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className='absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-transparent rounded-full blur-3xl'
          style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
        <div className='absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl'
          style={{ animation: 'float 12s ease-in-out infinite 1s' }} />
      </div>


      {/* Main content */}
      <div className='mx-auto w-full max-w-5xl relative z-10'>
        {/* Badge */}
        <div className='flex justify-center mb-12'>
          <div className='glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/20'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <p className='text-xs font-semibold tracking-widest uppercase bg-text-gradient'>
              Powered by <LlamaCheck>AI</LlamaCheck> • Fully Free
            </p>
          </div>
        </div>

        {/* Hero headline */}
        <h1 className='text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-center mb-6 tracking-tighter'>
          <span className='block'>Master It.</span>
          <span className='block text-gradient'>Actually Keep It.</span>
        </h1>

        {/* Subheadline */}
        <p className='text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed'>
          Pre-med struggling with organic chemistry. Law student drowning in case law. CS major debugging algorithms at 2am. Same problem: you're memorizing, not learning.
        </p>

        <p className='text-center text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium'>
          AI that adapts to <span className='text-blue-600 dark:text-blue-400'>your actual level</span>, generates unlimited practice tests, and shows you what you actually don't know.
        </p>

        {/* CTA Input */}
        <div id='start' className='mx-auto w-full max-w-xl mb-12'>
          <ResourceInput placeholder='Paste anything to learn • Notes • Articles • Links...' />
        </div>

        {/* Credibility line */}
        <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
          Used by <span className='font-semibold text-gray-800 dark:text-gray-200'>pre-med, law & CS students</span> across 200+ US universities • Start free today
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </section>
  )
}
