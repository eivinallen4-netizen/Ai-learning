// NOTE: Landing page section comparing old study habits vs improved workflow.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// NOTE: `BeforeAfterSection` encapsulates reusable logic for this module.
export default function BeforeAfterSection() {
  return (
    <section id='before-after' className='px-6 py-16'>
      <div className='mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Before</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm text-muted-foreground'>
            <p>Study sessions feel long but results are inconsistent.</p>
            <p>Weak areas stay hidden until deadlines are close.</p>
            <p>More effort goes in than retention comes out.</p>
          </CardContent>
        </Card>
        <Card className='border-primary/40'>
          <CardHeader>
            <CardTitle>After</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm text-muted-foreground'>
            <p>Short AI micro-tests make recall practice consistent.</p>
            <p>Weak topics are surfaced early and reviewed on purpose.</p>
            <p>You learn faster, remember longer, and cram less.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

