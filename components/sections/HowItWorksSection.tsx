// NOTE: Step-by-step explanation of the study workflow.
import { Brain, FileText, Sparkles, Target } from 'lucide-react'
import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Scribble from './Scribble'

// NOTE: `steps` stores a constant/reference used in this scope.
const steps = [
  { id: '1', label: 'Drop your material', icon: FileText, img: "/prev/uploadresouce.png" },
  { id: '2', label: 'Generate a micro-test', icon: Sparkles, img: "/prev/resouce.png" },
  { id: '3', label: 'Answer actively', icon: Brain, img: "/prev/resouce.png" },
  { id: '4', label: 'Review weak spots', icon: Target, img: "/prev/resouce.png" },
]

// NOTE: `HowItWorksSection` encapsulates reusable logic for this module.
export default function HowItWorksSection() {
  return (
    <section id='how-it-works' className='relative overflow-hidden px-6 py-16'>
      <Scribble variant='tall' className='absolute right-0 top-4 hidden lg:block' />
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>How It Works</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          Add your material, generate questions instantly, and review weak spots in short focused sessions.
          It is simple enough to use between classes, shifts, or meetings.
        </p>
        <div className='mt-8 grid gap-4 md:grid-cols-4'>
          {steps.map((step) => {
// NOTE: `Icon` stores a constant/reference used in this scope.
            const Icon = step.icon
            return (
              <Card key={step.id}>
                <CardHeader>
                  <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Step {step.id}</p>
                  <CardTitle>{step.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Icon className='size-5 text-primary mt-2' />
                  <div className='mt-3 rounded-md border border-muted/40'>
                    <Image src={step.img} alt='' width={340} height={180} className='h-auto w-full rounded-md' />
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

