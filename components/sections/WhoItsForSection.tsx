// NOTE: Section describing target users and ideal use cases.
import { BadgeCheck, GraduationCap, Lightbulb, UserRoundSearch } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `personas` stores a constant/reference used in this scope.
const personas = [
  { title: 'College Students', body: 'Prep for exams with active recall in short focused sessions.', icon: GraduationCap },
  { title: 'Workers', body: 'Review docs and meeting materials in minutes, not hours.', icon: BadgeCheck },
  { title: 'Self-learners', body: 'Keep momentum while learning new skills from mixed resources.', icon: Lightbulb },
  { title: 'Teams', body: 'Turn shared knowledge into lightweight practice for faster onboarding.', icon: UserRoundSearch },
]

// NOTE: `WhoItsForSection` encapsulates reusable logic for this module.
export default function WhoItsForSection() {
  return (
    <section id='personas' className='relative overflow-hidden bg-muted/30 px-6 py-16'>
      <Scribble variant='plant' className='absolute -left-6 top-4 hidden md:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>Who It&apos;s For</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          Built for college students and workers who want better results without spending more time.
          The core experience is free to use.
        </p>
        <div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {personas.map((persona) => {
// NOTE: `Icon` stores a constant/reference used in this scope.
            const Icon = persona.icon
            return (
              <Card key={persona.title}>
                <CardHeader>
                  <Icon className='size-5 text-primary' />
                  <CardTitle>{persona.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{persona.body}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

