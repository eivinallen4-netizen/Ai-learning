'use client'
// NOTE: Client provider that initializes Convex and exposes it to React components.

import { ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

// NOTE: `convex` stores a constant/reference used in this scope.
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

// NOTE: `ConvexClientProvider` encapsulates reusable logic for this module.
export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}

