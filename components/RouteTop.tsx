'use client'
// NOTE: Route-aware wrapper deciding when to show or hide the top navigation.

import { usePathname } from 'next/navigation'
import Top from '@/components/Top'

// NOTE: `RouteTop` encapsulates reusable logic for this module.
export default function RouteTop() {
// NOTE: `pathname` stores a constant/reference used in this scope.
  const pathname = usePathname()
// NOTE: `hideTop` stores a constant/reference used in this scope.
  const hideTop = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  if (hideTop) return null
  return <Top />
}

