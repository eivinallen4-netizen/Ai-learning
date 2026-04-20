// NOTE: Section describing user pain points this app solves.
import { BookOpen, Clock3, FileText, TriangleAlert } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `painPoints` stores a constant/reference used in this scope.
const painPoints = [
  { title: 'Rereading loop', body: 'You put in the time, but the information does not stick when you need it.', icon: BookOpen },
  { title: 'No feedback', body: 'It is hard to know what you actually understand until tests or deadlines hit.', icon: TriangleAlert },
  { title: 'Cram and forget', body: 'Passive study fades quickly, so the same topics keep coming back.', icon: Clock3 },
  { title: 'Scattered sources', body: 'Notes, slides, and docs are spread across tools without one practice flow.', icon: FileText },
]

// NOTE: `ProblemSection` encapsulates reusable logic for this module.
export default function ProblemSection() {
  return (
    <section id='problem' className='relative overflow-hidden px-6 py-16'>
      <Scribble variant='plant' className='absolute -left-8 top-10 hidden md:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>The Problem Learn More LGO Solves</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          Most people are not short on effort. They are short on an effective system that turns study time into real retention.
        </p>
        <div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {painPoints.map((item) => {
// NOTE: `Icon` stores a constant/reference used in this scope.
            const Icon = item.icon
            return (
              <Card key={item.title}>
                <CardHeader>
                  <Icon className='size-5 text-primary' />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{item.body}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

