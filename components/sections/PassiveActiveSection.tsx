// NOTE: Section explaining passive vs active learning methods.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `PassiveActiveSection` encapsulates reusable logic for this module.
export default function PassiveActiveSection() {
  return (
    <section id='comparison-visual' className='relative overflow-hidden bg-muted/30 px-6 py-16'>
      <Scribble variant='round' className='absolute -right-14 top-4 hidden md:block' />
      <Scribble variant='penEraser' className='absolute -left-8 bottom-4 hidden -rotate-3 opacity-35 lg:block' />
      <div className='mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-2'>
        <Card className='border-destructive/30'>
          <CardHeader>
            <CardTitle>Passive</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm text-muted-foreground'>
            <p>Rereading and highlighting can feel productive in the moment.</p>
            <p>But retention drops quickly, and confidence is often misleading.</p>
          </CardContent>
        </Card>
        <Card className='border-primary/30'>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm text-muted-foreground'>
            <p>Short retrieval-based micro-tests reinforce what you actually need to remember.</p>
            <p>You get measurable progress and stronger recall over time.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

