// NOTE: Root app layout wiring providers, global loading UI, and route-level top nav.
import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { GlobalLoadingScreen, LoadingProvider } from '@/components/LoadingScreen'
import { clerkAppearance } from '@/lib/clerk-appearance'
import RouteTop from '@/components/RouteTop'





// NOTE: `metadata` stores a constant/reference used in this scope.
export const metadata: Metadata = {
  title: 'Learn More',
  description: 'Speed up your learning by perirodicly testiing',
}

// NOTE: `RootLayout` encapsulates reusable logic for this module.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` antialiased `}>
        <ClerkProvider
          signInUrl='/sign-in'
          signUpUrl='/sign-up'
          signInFallbackRedirectUrl='/'
          signUpFallbackRedirectUrl='/'
          appearance={clerkAppearance}
        >
          <LoadingProvider>
            <ConvexClientProvider>
              <RouteTop />
              {children}
              <GlobalLoadingScreen />
            </ConvexClientProvider>
          </LoadingProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
