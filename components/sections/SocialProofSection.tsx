// NOTE: Testimonials/reviews section for social proof.
import { CircleUserRound, Star } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `testimonials` stores a constant/reference used in this scope.
const testimonials = [
  ['92%', 'I finally remember key concepts after one short review session.', 'Maya, CS student'],
  ['88%', 'A five-minute quiz before meetings helps me walk in prepared.', 'Jason, Product manager'],
  ['95%', 'It pinpoints weak spots so my study time is finally efficient.', 'Nora, Med school applicant'],
]

// NOTE: `SocialProofSection` encapsulates reusable logic for this module.
export default function SocialProofSection() {
  return (
    <section id='reviews' className='relative overflow-hidden bg-muted/30 px-6 py-16'>
      <Scribble variant='round' className='absolute -right-12 bottom-6 hidden md:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold text-center'>Social Proof</h2>
        <p className='mt-3 text-center text-muted-foreground'>
          College students and workers are using this daily to improve recall and show up more prepared.
        </p>
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {testimonials.map(([score, quote, author]) => (
            <Card key={author}>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <CircleUserRound className='size-8 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-semibold'>Last test score: {score}</p>
                    <div className='mt-1 flex gap-1 text-amber-500'>
                      <Star className='size-3 fill-current' />
                      <Star className='size-3 fill-current' />
                      <Star className='size-3 fill-current' />
                      <Star className='size-3 fill-current' />
                      <Star className='size-3 fill-current' />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>{quote}</p>
                <p className='mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

