import PageScribbles from '@/components/PageScribbles'

type SmartReadPageProps = {
  params: Promise<{ sessionId: string }>
}

export default async function SmartReadPage({ params }: SmartReadPageProps) {
  const { sessionId } = await params

  // Session id captured from URL: /learn/[sessionId]/smart-read
  const activeSessionId = sessionId

  return (
    <main className='relative mx-auto min-h-screen w-full max-w-5xl overflow-hidden px-4 py-10 sm:px-6'>
      <PageScribbles preset='app' />
      <div className='relative z-10'>
      <h1 className='text-3xl font-semibold tracking-tight'>Smart Read</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Boilerplate page ready for smart-read logic.</p>

      <div className='mt-6 rounded-xl border bg-background p-4'>
        <p className='text-xs uppercase tracking-wide text-muted-foreground'>Session ID from URL</p>
        <p className='mt-2 break-all font-mono text-sm'>{activeSessionId}</p>
      </div>
      </div>
    </main>
  )
}
