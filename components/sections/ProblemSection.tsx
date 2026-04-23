import { BookOpen, Clock3, FileText, TriangleAlert } from 'lucide-react'
import Scribble from './Scribble'

const painPoints = [
  { title: 'Rereading loop', body: 'You put in the time, but the information does not stick when you need it.', icon: BookOpen },
  { title: 'No feedback', body: 'It is hard to know what you actually understand until tests or deadlines hit.', icon: TriangleAlert },
  { title: 'Cram and forget', body: 'Passive study fades quickly, so the same topics keep coming back.', icon: Clock3 },
  { title: 'Scattered sources', body: 'Notes, slides, and docs are spread across tools without one practice flow.', icon: FileText },
]

export default function ProblemSection() {
  return (
    <section id='problem' className='relative section-container overflow-hidden'>
      <Scribble variant='plant' className='absolute -left-8 top-10 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header mb-16'>
          <h2 className='section-title'>The Problem We Solve</h2>
          <p className='section-subtitle'>
            Most people are not short on effort. They are short on an effective system that turns study time into real retention.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {painPoints.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className='card-container group'>
                <div className='mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors duration-300'>
                  <Icon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                </div>
                <h3 className='font-bold text-gray-900 dark:text-white mb-2'>{item.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

