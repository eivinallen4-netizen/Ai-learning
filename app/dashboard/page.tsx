'use client'
// NOTE: User dashboard page showing study metrics/cards overview.

import { SignInButton, useAuth } from '@clerk/nextjs'

import Footer from '@/components/Footer'
import PageScribbles from '@/components/PageScribbles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// NOTE: `DashboardPage` encapsulates reusable logic for this module.
export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <div className='relative min-h-screen overflow-hidden bg-background'>
      <PageScribbles preset='app' />
      <main className='relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold tracking-tight'>Your Dashboard</h1>
          <p className='mt-2 text-sm text-muted-foreground'>Backend analytics are currently disabled.</p>
        </div>

        {isLoaded && !isSignedIn ? (
          <Card className='max-w-lg'>
            <CardHeader>
              <CardTitle>Sign in to access your dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <SignInButton mode='redirect'>
                <Button>Sign in</Button>
              </SignInButton>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-semibold'>-</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Times Logged In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-semibold'>-</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Reading Minutes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-semibold'>-</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Questions Passed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-semibold'>-</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
