import { Brain, ListChecks, MessageCircle, Sparkles, Target, TrendingUp } from 'lucide-react'
import Scribble from './Scribble'

const features = [
  { title: 'Instant quiz generation', body: 'Questions are created directly from your notes and docs, so you can start practicing in seconds.', icon: Sparkles },
  { title: 'Weak-topic tracking', body: 'Every session highlights your lowest-performing concepts so your effort goes where it matters most.', icon: Target },
  { title: 'Adaptive difficulty', body: 'Question difficulty shifts with your answers to keep practice challenging without feeling overwhelming.', icon: Brain },
  { title: 'Fast review mode', body: 'Short micro-test sessions fit between classes, shifts, and meetings when time is tight.', icon: ListChecks },
  { title: 'Progress snapshots', body: 'Score and retention trends make it easy to see whether your learning is actually improving.', icon: TrendingUp },
  { title: 'Source-aware questions', body: 'Prompts stay grounded in your own material, which makes recall more relevant and practical.', icon: MessageCircle },
]

export default function FeatureBreakdownSection() {
  return (
    <section id='features' className='relative section-container overflow-hidden bg-gradient-to-b from-white dark:from-slate-950 via-gray-50 dark:via-slate-900/50 to-white dark:to-slate-950'>
      <Scribble variant='plant' className='absolute -right-8 bottom-0 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>Features That Deliver Real Benefits</h2>
          <p className='section-subtitle'>
            Designed for college students and workers who need better results without adding more hours to their day.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid gap-6 md:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className='card-container group'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors flex-shrink-0'>
                    <Icon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-gray-900 dark:text-white mb-2'>{feature.title}</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>{feature.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

