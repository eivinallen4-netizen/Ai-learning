// NOTE: Landing hero section with headline and primary resource input.
import { ResourceInput } from '@/components/ResourceInput'
import Scribble from './Scribble'
import LlamaCheck from '../LlamaCheck'

// NOTE: `HeroSection` encapsulates reusable logic for this module.
export default function HeroSection() {
  return (
    <section id='hero' className='relative min-h-[80vh] overflow-hidden px-6 py-20 flex items-center justify-center'>
      <Scribble variant='round' className='absolute -left-12 top-12 hidden md:block' />
      <Scribble variant='tall' className='absolute -right-8 bottom-8 hidden lg:block' />
      <div className='mx-auto w-full max-w-4xl text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
          Powered by <LlamaCheck>Ollama</LlamaCheck> | Free to use
        </p>
        <h1 className='mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl'>
          Study smarter.
          <br />
          Remember longer.
        </h1>
        <p className='mt-5 mx-auto max-w-2xl text-muted-foreground'>
          Turn class notes and work docs into short AI micro-tests in seconds. Built for college students and workers
          who want stronger recall without wasting hours rereading.
        </p>
        <div id='start' className='mt-8 mx-auto w-full max-w-[680px]'>
          <ResourceInput placeholder='Paste notes, links, or docs to generate a micro-test...' />
        </div>
        
      </div>
    </section>
  )
}
