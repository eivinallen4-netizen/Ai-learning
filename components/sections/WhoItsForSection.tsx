import { BadgeCheck, GraduationCap, Lightbulb, UserRoundSearch } from 'lucide-react'
import Scribble from './Scribble'

const personas = [
  { title: 'College Students', body: 'Prep for exams with active recall in short focused sessions.', icon: GraduationCap },
  { title: 'Workers', body: 'Review docs and meeting materials in minutes, not hours.', icon: BadgeCheck },
  { title: 'Self-learners', body: 'Keep momentum while learning new skills from mixed resources.', icon: Lightbulb },
  { title: 'Teams', body: 'Turn shared knowledge into lightweight practice for faster onboarding.', icon: UserRoundSearch },
]

export default function WhoItsForSection() {
  return (
    <section id='personas' className='relative section-container overflow-hidden'>
      <Scribble variant='plant' className='absolute -left-6 top-4 hidden md:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>Who It&apos;s For</h2>
          <p className='section-subtitle'>
            Built for college students and workers who want better results without spending more time.
            The core experience is free to use.
          </p>
        </div>

        {/* Personas Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {personas.map((persona) => {
            const Icon = persona.icon
            return (
              <div key={persona.title} className='card-container group'>
                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-4 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-colors duration-300'>
                  <Icon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                </div>
                <h3 className='font-bold text-gray-900 dark:text-white mb-2'>{persona.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>{persona.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

