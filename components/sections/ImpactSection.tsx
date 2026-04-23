'use client'
import { useState, useEffect } from 'react'

export default function ImpactSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev + 1) % 101)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const scenarios = [
    {
      title: 'Struggling?',
      subtitle: 'Tests get easier',
      icon: '📉',
      description: 'AI detects gaps and rebuilds fundamentals',
      color: 'from-orange-500/80',
      stats: ['Adjusted difficulty', '3x clearer concepts', 'Confidence +42%'],
    },
    {
      title: 'Breezing through?',
      subtitle: 'Content gets harder',
      icon: '🚀',
      description: 'Push into advanced material automatically',
      color: 'from-green-500/80',
      stats: ['Advanced topics', 'Edge case mastery', 'Efficiency +67%'],
    },
    {
      title: 'Distracted?',
      subtitle: 'Time refocuses',
      icon: '⚡',
      description: "Skip what you know, drill what you don't",
      color: 'from-blue-500/80',
      stats: ['15min sessions', 'Zero filler', 'Retention +89%'],
    },
  ]

  return (
    <section className='relative section-container overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl' />
      </div>

      <div className='mx-auto max-w-5xl'>
        {/* Section header */}
        <div className='section-header'>
          <h2 className='section-title'>
            Your test <span className='section-title-gradient'>learns with you</span>
          </h2>
          <p className='section-subtitle'>
            Every answer you give teaches the AI what to focus on next. No two sessions are the same.
          </p>
        </div>

        {/* Tab buttons */}
        <div className='flex gap-3 justify-center mb-16 flex-wrap'>
          {scenarios.map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {scenario.icon} {scenario.title}
            </button>
          ))}
        </div>

        {/* Active scenario display */}
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Visual side */}
          <div className='relative h-96'>
            <div className='absolute inset-0 rounded-2xl card-container overflow-hidden'>
              {/* Animated learning visualization */}
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-8 p-8'>
                <div className='relative w-48 h-48'>
                  {/* Center circle */}
                  <div className='absolute inset-0 rounded-full border-2 border-white/10' />
                  {/* Animated rings */}
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className='absolute inset-0 rounded-full border border-blue-500/30'
                      style={{
                        animation: `pulse 3s ease-in-out ${i * 0.3}s infinite`,
                        transform: `scale(${1 + i * 0.15})`,
                      }}
                    />
                  ))}
                  {/* Progress arc */}
                  <svg className='absolute inset-0 w-full h-full -rotate-90' viewBox='0 0 200 200'>
                    <circle cx='100' cy='100' r='90' fill='none' stroke='currentColor' strokeWidth='3' className='text-white/10' />
                    <circle
                      cx='100'
                      cy='100'
                      r='90'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='3'
                      className='text-blue-500 transition-all duration-300'
                      strokeDasharray={`${565 * (progress / 100)} 565`}
                      strokeLinecap='round'
                    />
                  </svg>
                  {/* Center text */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='text-4xl font-black text-white'>{progress}%</div>
                      <div className='text-xs text-white/50 mt-2'>Adaptive match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-4xl font-black mb-2 tracking-tight'>{scenarios[activeTab].subtitle}</h3>
              <p className='text-lg text-foreground/60'>{scenarios[activeTab].description}</p>
            </div>

            {/* Stats grid */}
            <div className='grid grid-cols-1 gap-3'>
              {scenarios[activeTab].stats.map((stat, idx) => (
                <div key={idx} className='flex items-center gap-3 p-4 rounded-lg glass border border-blue-500/20'>
                  <div className='w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0' />
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>{stat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className='w-full btn-primary justify-center text-lg'>
              Try Your First Test →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
