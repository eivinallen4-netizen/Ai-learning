import { Brain, FileText, Sparkles, Target } from 'lucide-react'
import Image from 'next/image'
import Scribble from './Scribble'

const steps = [
  { id: '1', label: 'Drop your material', icon: FileText, img: "/prev/uploadresouce.png" },
  { id: '2', label: 'Generate a micro-test', icon: Sparkles, img: "/prev/resouce.png" },
  { id: '3', label: 'Answer actively', icon: Brain, img: "/prev/resouce.png" },
  { id: '4', label: 'Review weak spots', icon: Target, img: "/prev/resouce.png" },
]

export default function HowItWorksSection() {
  return (
    <section id='how-it-works' className='relative section-container overflow-hidden'>
      <Scribble variant='tall' className='absolute right-0 top-4 hidden lg:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header mb-16'>
          <h2 className='section-title'>How It Works</h2>
          <p className='section-subtitle'>
            Add your material, generate questions instantly, and review weak spots in short focused sessions.
            It is simple enough to use between classes, shifts, or meetings.
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid gap-6 md:grid-cols-4'>
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.id} className='card-container group'>
                {/* Step number and label */}
                <div className='mb-6'>
                  <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mb-3'>
                    {step.id}
                  </div>
                  <h3 className='font-bold text-gray-900 dark:text-white'>{step.label}</h3>
                </div>

                {/* Icon and Image */}
                <div className='mb-4'>
                  <Icon className='w-5 h-5 text-blue-600 dark:text-blue-400 mb-4' />
                  <div className='rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-blue-500/30 transition-colors duration-300'>
                    <Image src={step.img} alt={step.label} width={340} height={180} className='w-full h-auto object-cover' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

