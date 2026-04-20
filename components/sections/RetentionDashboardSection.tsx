// NOTE: Section previewing retention/progress style insights.
import { Card, CardContent } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `RetentionDashboardSection` encapsulates reusable logic for this module.
export default function RetentionDashboardSection() {
  return (
    <section id='retention-dashboard' className='relative overflow-hidden bg-muted/30 px-6 py-16'>
      <Scribble variant='tall' className='absolute -left-6 bottom-0 hidden lg:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>Retention Dashboard</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          See how your memory is changing over time, spot weak topics early, and track progress with clear numbers.
        </p>
        <Card className='mt-8'>
          <CardContent>
            <div className='grid gap-3 md:grid-cols-4'>
              <div className='rounded-md border bg-background p-4'>
                <p className='text-xs text-muted-foreground'>Overall retention</p>
                <p className='mt-1 text-2xl font-semibold'>87%</p>
              </div>
              <div className='rounded-md border bg-background p-4'>
                <p className='text-xs text-muted-foreground'>Weak topic</p>
                <p className='mt-1 text-2xl font-semibold text-amber-600'>Inference</p>
              </div>
              <div className='rounded-md border bg-background p-4'>
                <p className='text-xs text-muted-foreground'>This week</p>
                <p className='mt-1 text-2xl font-semibold'>+12%</p>
              </div>
              <div className='rounded-md border bg-background p-4'>
                <p className='text-xs text-muted-foreground'>Sessions</p>
                <p className='mt-1 text-2xl font-semibold'>18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

