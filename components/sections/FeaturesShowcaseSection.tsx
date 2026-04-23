'use client'
import { useEffect, useRef, useState } from 'react'

export default function FeaturesShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'Instant Question Gen',
      desc: 'Paste any learning material. AI generates perfect questions in 5 seconds.',
      icon: '✨',
      gradient: 'from-purple-500/80',
      accent: 'purple',
    },
    {
      title: 'Smart Explanations',
      desc: 'Stuck? Get AI tutoring that matches your learning style and pace.',
      icon: '🧠',
      gradient: 'from-cyan-500/80',
      accent: 'cyan',
    },
    {
      title: 'Adaptive Difficulty',
      desc: 'Too hard? Too easy? The system adjusts in real-time, no configuration.',
      icon: '⚙️',
      gradient: 'from-green-500/80',
      accent: 'green',
    },
    {
      title: 'Resource Library',
      desc: 'AI curates related topics, definitions, and references automatically.',
      icon: '📚',
      gradient: 'from-blue-500/80',
      accent: 'blue',
    },
    {
      title: 'Learning Timeline',
      desc: 'See your progress across all topics with detailed retention insights.',
      icon: '📊',
      gradient: 'from-orange-500/80',
      accent: 'orange',
    },
    {
      title: 'Zero Setup',
      desc: 'No account needed. Start learning in 10 seconds with just a link.',
      icon: '🚀',
      gradient: 'from-red-500/80',
      accent: 'red',
    },
  ]

  return (
    <section ref={containerRef} className='relative section-container overflow-hidden bg-gradient-to-b from-white dark:from-slate-950 via-white dark:via-slate-950 to-gray-50 dark:to-slate-900/50'>
      {/* Animated background elements */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute -top-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl'
          style={{ transform: `translate(0, ${scrollProgress * 100}px)` }}
        />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
      </div>

      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>
            Everything <span className='section-title-gradient'>runs on AI</span>
          </h2>
          <p className='section-subtitle'>
            Your personal tutor, question generator, resource curator—all working together to keep you in the flow state.
          </p>
        </div>

        {/* Features grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className='group relative overflow-hidden rounded-2xl card-container'
              style={{
                animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              {/* Content */}
              <div className='relative p-8 h-full flex flex-col gap-4'>
                <div className='text-4xl'>{feature.icon}</div>
                <h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{feature.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1'>{feature.desc}</p>

                {/* Bottom accent line */}
                <div className='h-1.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full group-hover:from-blue-500/70 group-hover:to-purple-500/70 transition-all duration-300 mt-4' />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-20 text-center'>
          <p className='text-gray-600 dark:text-gray-400 mb-8 text-lg'>Ready to experience adaptive learning?</p>
          <button className='btn-primary px-10 py-4 text-lg'>
            Start Learning Now →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
