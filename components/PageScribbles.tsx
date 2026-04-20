import Scribble, { type ScribbleVariant } from '@/components/sections/Scribble'

type Preset = 'marketing' | 'app' | 'auth'

type Placement = {
  variant: ScribbleVariant
  scale: number
  className: string
}

const placements: Record<Preset, Placement[]> = {
  marketing: [
    // Mobile: implied environment only (2 assets max).
    { variant: 'round', scale: 0.62, className: 'absolute -left-8 top-14 -rotate-6 opacity-12 md:hidden' },
    { variant: 'cactus', scale: 0.62, className: 'absolute -right-8 bottom-8 rotate-6 opacity-12 md:hidden' },
    // Desktop: corner-only, restrained, readable center corridor.
    { variant: 'round', scale: 0.88, className: 'absolute -left-10 top-20 -rotate-6 opacity-20 hidden md:block' },
    { variant: 'pen', scale: 0.82, className: 'absolute -right-8 top-24 -rotate-12 opacity-18 hidden md:block' },
    { variant: 'tall', scale: 1.04, className: 'absolute -left-8 bottom-10 -rotate-3 opacity-17 hidden md:block' },
    { variant: 'cactus', scale: 0.98, className: 'absolute -right-8 bottom-14 rotate-3 opacity-16 hidden md:block' },
  ],
  app: [
    // Mobile.
    { variant: 'round', scale: 0.56, className: 'absolute -left-8 top-16 -rotate-4 opacity-10 md:hidden' },
    { variant: 'cactus', scale: 0.58, className: 'absolute -right-8 bottom-10 rotate-4 opacity-10 md:hidden' },
    // Desktop dense-ui mode: only one corner pair.
    { variant: 'round', scale: 0.72, className: 'absolute -left-8 top-20 -rotate-4 opacity-14 hidden md:block' },
    { variant: 'cactus', scale: 0.78, className: 'absolute -right-8 bottom-16 rotate-4 opacity-14 hidden md:block' },
  ],
  auth: [
    // Mobile.
    { variant: 'round', scale: 0.52, className: 'absolute -left-8 top-12 -rotate-4 opacity-10 md:hidden' },
    { variant: 'cactus', scale: 0.54, className: 'absolute -right-8 bottom-8 rotate-5 opacity-10 md:hidden' },
    // Desktop auth screens: mild framing.
    { variant: 'round', scale: 0.66, className: 'absolute -left-8 top-14 -rotate-4 opacity-13 hidden md:block' },
    { variant: 'pen', scale: 0.64, className: 'absolute -right-6 top-24 -rotate-10 opacity-12 hidden md:block' },
    { variant: 'tall', scale: 0.78, className: 'absolute -left-3 bottom-8 -rotate-2 opacity-12 hidden md:block' },
    { variant: 'cactus', scale: 0.7, className: 'absolute -right-3 bottom-10 rotate-2 opacity-12 hidden md:block' },
  ],
}

export default function PageScribbles({ preset = 'app' }: { preset?: Preset }) {
  return (
    <div aria-hidden='true' className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
      {placements[preset].map((item, index) => (
        <Scribble key={`${preset}-${item.variant}-${index}`} variant={item.variant} scale={item.scale} className={item.className} />
      ))}
    </div>
  )
}
