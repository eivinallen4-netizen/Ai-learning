// NOTE: Final call-to-action section encouraging users to start.
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Scribble from './Scribble'

// NOTE: `FinalCtaSection` encapsulates reusable logic for this module.
export default function FinalCtaSection() {
  return (
    <section id='final-cta' className='relative overflow-hidden px-6 pt-8 pb-20'>
      <Scribble variant='tall' className='absolute right-2 top-0 hidden md:block' />
      <div className='mx-auto w-full max-w-6xl rounded-2xl border bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 p-10 text-center'>
        <h2 className='text-3xl font-bold sm:text-4xl'>Start learning faster today.</h2>
        <p className='mx-auto mt-3 max-w-2xl text-muted-foreground'>
          Turn your notes and docs into short AI micro-tests that help you remember more for school and work.
          Free to use.
        </p>
        <Button asChild size='lg' className='mt-6'>
          <Link href='#start'>Generate My First Quiz</Link>
        </Button>
      </div>
    </section>
  )
}

