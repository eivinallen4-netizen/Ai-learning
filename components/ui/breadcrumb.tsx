// NOTE: Reusable breadcrumb primitives used for path navigation UI.
import * as React from 'react'
import Link from 'next/link'
import { Slot } from 'radix-ui'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

// NOTE: `Breadcrumb` encapsulates reusable logic for this module.
function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

// NOTE: `BreadcrumbList` encapsulates reusable logic for this module.
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn('flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5', className)}
      {...props}
    />
  )
}

// NOTE: `BreadcrumbItem` encapsulates reusable logic for this module.
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}

// NOTE: `BreadcrumbLink` encapsulates reusable logic for this module.
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  asChild?: boolean
}) {
// NOTE: `Comp` stores a constant/reference used in this scope.
  const Comp = asChild ? Slot.Root : Link

  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
}

// NOTE: `BreadcrumbPage` encapsulates reusable logic for this module.
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role='link'
      aria-disabled='true'
      aria-current='page'
      data-slot='breadcrumb-page'
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  )
}

// NOTE: `BreadcrumbSeparator` encapsulates reusable logic for this module.
function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      role='presentation'
      aria-hidden='true'
      data-slot='breadcrumb-separator'
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
