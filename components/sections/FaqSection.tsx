// NOTE: Landing page frequently asked questions section.
import { Card, CardContent } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `faqItems` stores a constant/reference used in this scope.
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

// NOTE: `FaqSection` encapsulates reusable logic for this module.
export default function FaqSection() {
  return (
    <section id='faq' className='relative overflow-hidden px-6 py-16'>
      <Scribble variant='round' className='absolute -left-14 bottom-2 hidden md:block' />
      <div className='mx-auto w-full max-w-4xl'>
        <h2 className='text-3xl font-semibold'>FAQ</h2>
        <div className='mt-6 space-y-3'>
          {faqItems.map((item) => (
            <Card key={item.q}>
              <CardContent className='pt-6'>
                <details className='group'>
                  <summary className='cursor-pointer list-none text-sm font-semibold'>{item.q}</summary>
                  <p className='mt-3 text-sm text-muted-foreground'>{item.a}</p>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

