import PageScribbles from '@/components/PageScribbles'

type FlashcardsPageProps = {
  params: Promise<{ sessionId: string }>
}

export default async function FlashcardsPage({ params }: FlashcardsPageProps) {
  const { sessionId } = await params

  // Session id captured from URL: /learn/[sessionId]/flashcards
  const activeSessionId = sessionId

  const cards = getCardsForSession(activeSessionId)

  return (
    <main className='relative mx-auto min-h-screen w-full max-w-5xl overflow-hidden px-4 py-10 sm:px-6'>
      <PageScribbles preset='app' />
      <div className='relative z-10'>
      <h1 className='text-3xl font-semibold tracking-tight'>Flash Cards</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Boilerplate page ready for flash-card logic.</p>
      <div className='mt-6 rounded-xl border bg-background p-4'>
        <p className='text-xs uppercase tracking-wide text-muted-foreground'>Session ID from URL</p>
        <p className='mt-2 break-all font-mono text-sm'>{activeSessionId}</p>
      </div>

      <div className='mt-6 grid gap-3'>
        {cards.map((card, index) => (
          <div key={`${activeSessionId}-${index}`} className='rounded-lg border bg-background p-4'>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>Question</p>
            <p className='mt-1 text-sm'>{card.question}</p>
            <p className='mt-3 text-xs uppercase tracking-wide text-muted-foreground'>Answer</p>
            <p className='mt-1 text-sm'>{card.answer}</p>
          </div>
        ))}
      </div>
      </div>
    </main>
  )
}

function getCardsForSession(sessionId: string) {
  // Placeholder logic to fetch or generate flashcards based on the session ID.
  // In a real implementation, this might involve fetching from an API or database.

  
  return [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee' },
  ]
}
