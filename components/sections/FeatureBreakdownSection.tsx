// NOTE: Landing page section that breaks down core features.
import { Brain, ListChecks, MessageCircle, Sparkles, Target, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `features` stores a constant/reference used in this scope.
const features = [
  { title: 'Instant quiz generation', body: 'Questions are created directly from your notes and docs, so you can start practicing in seconds.', icon: Sparkles },
  { title: 'Weak-topic tracking', body: 'Every session highlights your lowest-performing concepts so your effort goes where it matters most.', icon: Target },
  { title: 'Adaptive difficulty', body: 'Question difficulty shifts with your answers to keep practice challenging without feeling overwhelming.', icon: Brain },
  { title: 'Fast review mode', body: 'Short micro-test sessions fit between classes, shifts, and meetings when time is tight.', icon: ListChecks },
  { title: 'Progress snapshots', body: 'Score and retention trends make it easy to see whether your learning is actually improving.', icon: TrendingUp },
  { title: 'Source-aware questions', body: 'Prompts stay grounded in your own material, which makes recall more relevant and practical.', icon: MessageCircle },
]

// NOTE: `FeatureBreakdownSection` encapsulates reusable logic for this module.
export default function FeatureBreakdownSection() {
  return (
    <section id='features' className='relative overflow-hidden bg-muted/30 px-6 py-16'>
      <Scribble variant='plant' className='absolute -right-8 bottom-0 hidden md:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>Features That Deliver Real Benefits</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          Designed for college students and workers who need better results without adding more hours to their day.
        </p>
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {features.map((feature) => {
// NOTE: `Icon` stores a constant/reference used in this scope.
            const Icon = feature.icon
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <Icon className='size-5 text-primary' />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{feature.body}</p>
                  <div className='rounded-md border bg-background p-3 text-xs text-muted-foreground mt-2'>
                    Mini UI screenshot area
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

