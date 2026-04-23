'use client'
import { useState } from 'react'
import Scribble from './Scribble'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    q: 'How is this different from flashcards?',
    a: 'Quizzes are generated from your own material and adapt to weak topics as you practice, so retention improves faster with less setup work.',
  },
  {
    q: 'Can I use my own notes and links?',
    a: 'Yes. Paste notes, docs, and links directly to start a practice flow in seconds.',
  },
  {
    q: 'How long should each review session be?',
    a: 'Most users run 5 to 12 minute sessions. Short sessions are easier to stay consistent with and still build strong retention.',
  },
  {
    q: 'Does it work for non-students?',
    a: 'Yes. Workers use it with training docs and internal material to prepare for meetings, onboarding, and interviews.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. The core experience is free for college students and workers.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id='faq' className='relative section-container overflow-hidden'>
      <Scribble variant='round' className='absolute -left-14 bottom-2 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-4xl relative z-10'>
        {/* Header */}
        <div className='section-header mb-12'>
          <h2 className='section-title'>Frequently Asked Questions</h2>
          <p className='section-subtitle'>Everything you need to know about adaptive learning</p>
        </div>

        {/* FAQ Grid */}
        <div className='space-y-4'>
          {faqItems.map((item, idx) => (
            <div
              key={item.q}
              className='card-container cursor-pointer transition-all duration-300 hover:shadow-lg'
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className='flex items-start gap-4'>
                <div className='flex-1'>
                  <h3 className='font-bold text-gray-900 dark:text-white text-lg'>{item.q}</h3>
                  {openIndex === idx && (
                    <p className='mt-4 text-gray-600 dark:text-gray-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200'>
                      {item.a}
                    </p>
                  )}
                </div>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center p-8 rounded-2xl glass border border-blue-500/20'>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>Still have questions?</p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>Contact us at support@example.com or check our documentation</p>
        </div>
      </div>
    </section>
  )
}

