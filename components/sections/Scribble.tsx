// NOTE: Decorative scribble asset renderer used in marketing sections.
import Image from 'next/image'

import { cn } from '@/lib/utils'

// NOTE: `scribbleAssets` stores a constant/reference used in this scope.
const scribbleAssets = {
  round: { src: '/scribble/round%20scrible.png', width: 220, height: 220 },
  plant: { src: '/scribble/black%20plant.png', width: 190, height: 190 },
  tall: { src: '/scribble/slightly_taller_plant.png', width: 170, height: 240 },
  cactus: { src: '/scribble/green-cactas.png', width: 170, height: 210 },
  pen: { src: '/scribble/tran-pen.png', width: 150, height: 224 },
  eraser: { src: '/scribble/eraser.png', width: 150, height: 224 },
  penEraser: { src: '/scribble/peneraser.png', width: 150, height: 224 },
}

type ScribbleVariant = keyof typeof scribbleAssets
export type { ScribbleVariant }

// NOTE: `Scribble` encapsulates reusable logic for this module.
export default function Scribble({
  variant = 'round',
  className,
  priority = false,
  scale = 1,
}: {
  variant?: ScribbleVariant
  className?: string
  priority?: boolean
  scale?: number
}) {
// NOTE: `asset` stores a constant/reference used in this scope.
  const asset = scribbleAssets[variant]
  const width = Math.max(1, Math.round(asset.width * scale))
  const height = Math.max(1, Math.round(asset.height * scale))

  return (
    <Image
      src={asset.src}
      width={width}
      height={height}
      alt=''
      aria-hidden='true'
      priority={priority}
      className={cn('pointer-events-none select-none opacity-60 mix-blend-multiply will-change-transform animate-[scribble-float_5.5s_ease-in-out_infinite]', className)}
    />
  )
}
