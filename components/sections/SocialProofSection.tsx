import { CircleUserRound, Star } from 'lucide-react'
import Scribble from './Scribble'

const testimonials = [
  ['92%', 'I finally remember key concepts after one short review session.', 'Maya, CS student'],
  ['88%', 'A five-minute quiz before meetings helps me walk in prepared.', 'Jason, Product manager'],
  ['95%', 'It pinpoints weak spots so my study time is finally efficient.', 'Nora, Med school applicant'],
]

export default function SocialProofSection() {
  return (
    <section id='reviews' className='relative section-container overflow-hidden bg-gradient-to-b from-white dark:from-slate-950 to-gray-50 dark:to-slate-900/50'>
      <Scribble variant='round' className='absolute -right-12 bottom-6 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>Loved by Learners</h2>
          <p className='section-subtitle'>
            College students and workers are using this daily to improve recall and show up more prepared.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid gap-6 md:grid-cols-3'>
          {testimonials.map(([score, quote, author]) => (
            <div key={author} className='card-container group hover:-translate-y-1'>
              {/* Header */}
              <div className='flex items-start justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
                    <CircleUserRound className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='font-bold text-gray-900 dark:text-white'>{score}</p>
                    <div className='mt-1 flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='w-3 h-3 fill-amber-400 text-amber-400' />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed italic'>&quot;{quote}&quot;</p>

              {/* Author */}
              <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400'>
                {author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

