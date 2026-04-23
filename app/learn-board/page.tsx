'use client'

import * as React from 'react'
import Link from 'next/link'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { readLearnBoardPayload, type LearnBoardPayload } from '@/lib/learn-board-state'
import PageScribbles from '@/components/PageScribbles'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const CARD_COUNT = 16

type CardStatus = 'idle' | 'loading' | 'ready' | 'error'

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function scoreColor(percent: number): string {
  const hue = Math.round((percent / 100) * 120)
  return `hsl(${hue} 75% 42%)`
}

function buildFinalStudyPrompt(args: {
  resourceName: string
  mode: 'exercise' | 'flashcard'
  sourceText: string
}): string {
  return [
    `Source Name: ${args.resourceName}`,
    `Study Mode: ${args.mode}`,
    '',
    'Generate study outputs that are specific to this source text only.',
    'Do not use outside knowledge.',
    '',
    'Full source context:',
    args.sourceText.trim(),
  ].join('\n')
}

function cardLabel(index: number): string {
  if (index === 0) return 'Add Exercise'
  if (index === 1) return 'Flash Card'
  return `Locked ${index + 1}`
}

type QuizQuestion = {
  question: string
  answer: string
  answers: string[]
}

function buildQuizPayloadFromSource(sourceText: string): QuizQuestion[] {
  const fallback: QuizQuestion[] = [
    {
      question: 'What is the main topic of this resource?',
      answer: 'The key concept in your uploaded notes',
      answers: ['A random unrelated topic', 'Only formatting details', 'The key concept in your uploaded notes', 'None of the above'],
    },
    {
      question: 'What should you focus on while reviewing?',
      answer: 'Core ideas, definitions, and examples',
      answers: ['Memorizing punctuation only', 'Core ideas, definitions, and examples', 'Ignoring context', 'Only reading once quickly'],
    },
  ]

  const sentences = sourceText
    .split(/[\n.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)

  if (sentences.length < 2) return fallback

  return sentences.map((sentence, index) => {
    const answer = sentence.length > 96 ? `${sentence.slice(0, 93)}...` : sentence
    return {
      question: `Which statement best matches source point #${index + 1}?`,
      answer,
      answers: [
        'This point is unrelated to the source text',
        answer,
        'The source says to skip active recall',
        'The source has no key points',
      ],
    }
  })
}

function statusTextForCard(status: CardStatus): string {
  if (status === 'loading') return 'Loading...'
  if (status === 'ready') return 'Ready'
  if (status === 'error') return 'Error'
  return ''
}

function classNameForCard(showBaseContent: boolean): string {
  if (showBaseContent) {
    return 'relative flex min-h-28 items-center justify-center rounded-xl border border-transparent bg-transparent p-5 shadow-none transition-colors hover:border-muted-foreground/40 hover:bg-muted/20 active:bg-muted/35'
  }
  return 'group relative flex min-h-28 items-center justify-center rounded-xl border border-transparent bg-transparent p-5 shadow-none transition-colors hover:border-muted-foreground/40 hover:bg-muted/20'
}

export default function LearnBoardPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  const [payload, setPayload] = React.useState<LearnBoardPayload | null>(null)
  const [cardStatus, setCardStatus] = React.useState<CardStatus[]>(() => Array(CARD_COUNT).fill('idle'))
  const [statusMessage, setStatusMessage] = React.useState('')

  const updateCardStatus = React.useCallback((cardIndex: number, status: CardStatus) => {
    setCardStatus((prev) => {
      const next = [...prev]
      next[cardIndex] = status
      return next
    })
  }, [])

  React.useEffect(() => {
    const found = readLearnBoardPayload()
    if (found) setPayload(found)
  }, [])

  const handlePrimaryCardClick = React.useCallback(
    async (cardIndex: number) => {
      if (!payload || !isSignedIn || cardIndex > 1) return

      const rawText = buildFinalStudyPrompt({
        resourceName: payload.resourceName,
        mode: cardIndex === 0 ? 'exercise' : 'flashcard',
        sourceText: payload.sourceText,
      })

      updateCardStatus(cardIndex, 'loading')
      setStatusMessage(`${cardLabel(cardIndex)} is running...`)

      try {
        if (cardIndex === 0) {
          const quizPayload = buildQuizPayloadFromSource(payload.sourceText)
          await fetch('/api/debug/log-learn-board', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resourceName: payload.resourceName,
              sourceText: payload.sourceText,
              mode: 'exercise',
              generatedQuestions: quizPayload,
            }),
          })
          const encodedPayload = encodeURIComponent(JSON.stringify(quizPayload))
          router.push(`/tests?payload=${encodedPayload}`)
          return
        }

        if (cardIndex === 1) {
          const sessionId = crypto.randomUUID()
          await fetch('/api/debug/log-learn-board', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resourceName: payload.resourceName,
              sourceText: payload.sourceText,
              mode: 'flashcard',
              generatedQuestions: [],
              sessionId,
            }),
          })
          router.push(`/learn/${sessionId}/flashcards`)
          return
        }

        const serverLogBody = {
          subject: payload.resourceName.slice(0, 80) || 'Uploaded Resource',
          title: cardLabel(cardIndex),
          rawText,
        }
        await fetch('/api/debug/log-learn-board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resourceName: payload.resourceName,
            sourceText: payload.sourceText,
            mode: 'flashcard',
            generatedQuestions: [],
            meta: serverLogBody,
          }),
        })
        updateCardStatus(cardIndex, 'ready')
        setStatusMessage(`${cardLabel(cardIndex)} finished successfully.`)
      } catch {
        updateCardStatus(cardIndex, 'error')
        setStatusMessage(`${cardLabel(cardIndex)} failed. Try again.`)
      }
    },
    [isSignedIn, payload, router, updateCardStatus]
  )

  const handleCardClick = React.useCallback(
    (index: number, clickable: boolean) => {
      if (clickable) void handlePrimaryCardClick(index)
    },
    [handlePrimaryCardClick]
  )

  const renderLearningCard = React.useCallback(
    (_: unknown, index: number) => {
      const showBaseContent = index < 2
      const status = cardStatus[index]
      const statusText = statusTextForCard(status)
      const clickable = index < 2 && Boolean(isSignedIn)
      const label = cardLabel(index)

      return (
        <Card
          key={index}
          aria-label={label}
          title={label}
          onClick={() => handleCardClick(index, clickable)}
          className={classNameForCard(showBaseContent)}
        >
          {showBaseContent ? <p className='text-sm text-muted-foreground'>{label}</p> : null}
          <div className='absolute bottom-2 right-2 text-[10px] text-muted-foreground'>{statusText}</div>
          <span className='sr-only'>{label}</span>
        </Card>
      )
    },
    [cardStatus, handleCardClick, isSignedIn]
  )

  if (isLoaded && !isSignedIn) {
    return (
      <main className='relative min-h-screen overflow-hidden bg-muted/40 p-4 md:p-6'>
        <PageScribbles preset='app' />
        <div className='rounded-2xl border bg-background p-6'>
          <p className='text-sm text-muted-foreground'>You must be signed in to use Learn Board.</p>
          <div className='mt-4'>
            <SignInButton mode='redirect'>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </div>
        </div>
      </main>
    )
  }

  if (!payload) {
    return (
      <main className='relative min-h-screen overflow-hidden bg-muted/40 p-4 md:p-6'>
        <PageScribbles preset='app' />
        <div className='rounded-2xl border bg-background p-6'>
          <p className='text-sm text-muted-foreground'>No Learn Board data found. Submit a resource first.</p>
          <div className='mt-4'>
            <Button asChild>
              <Link href='/'>Back Home</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // Placeholder pretest score used by the sidebar progress pill.
// NOTE: `rawPretest` stores a constant/reference used in this scope.
  const rawPretest = 64
// NOTE: `pretestPercentage` stores a constant/reference used in this scope.
  const pretestPercentage = clamp(Math.round(rawPretest), 0, 100)
// NOTE: `pretestColor` stores a constant/reference used in this scope.
  const pretestColor = scoreColor(pretestPercentage)

  return (
    <main className='relative h-dvh overflow-hidden bg-muted/40 p-4 md:p-6'>
      <PageScribbles preset='app' />
      <div className='flex h-full flex-col gap-4 md:flex-row'>
        <aside className='w-full rounded-2xl border bg-background p-5 md:h-full md:w-72 md:p-6'>
          <h1 className='mb-4 text-2xl font-semibold'>Learn Board</h1>
          <Separator className='my-5' />
          {/* Future action hook for adding another course/workspace. */}
          <Button className='w-full justify-start gap-2 rounded-full'>
            <Plus className='size-5' /> Add Another Course
          </Button>
          <div className='mt-4 rounded-xl border bg-muted/20 p-3 text-xs text-muted-foreground'>
            Resource: {payload.resourceName}
          </div>
          {!isSignedIn ? (
            <div className='mt-3 rounded-xl border bg-background p-3'>
              <p className='text-sm font-medium'>Login to run actions</p>
              <div className='mt-3'>
                <SignInButton mode='redirect'>
                  <Button size='sm'>Login</Button>
                </SignInButton>
              </div>
            </div>
          ) : null}
        </aside>

        <section className='flex h-full flex-1 flex-col overflow-hidden rounded-2xl border bg-background p-4 md:p-6'>
          <h2 className='ml-1 text-3xl font-semibold md:text-4xl'>Hi Theo</h2>
          <div className='mx-1 mt-4 rounded-xl border bg-muted/20 p-3'>
            <div className='flex items-center gap-2 text-sm'>
              <span className='size-2.5 rounded-full' style={{ backgroundColor: pretestColor }} />
              <p style={{ color: pretestColor }}>Pretest {pretestPercentage}%</p>
            </div>
            <div className='mt-2 h-2 overflow-hidden rounded-full bg-muted'>
              <div className='h-full rounded-full transition-all' style={{ width: `${pretestPercentage}%`, backgroundColor: pretestColor }} />
            </div>
          </div>

          <div className='mx-1 mt-5'>
            <h3 className='text-lg font-medium'>Learning Options</h3>
            <Separator className='mt-2' />
          </div>
          {statusMessage ? (
            <p className='mx-1 mt-3 text-xs text-muted-foreground'>{statusMessage}</p>
          ) : null}

          {/* High-level action status feedback for the last run card. */}
          {statusMessage ? (
            <p className='mx-1 mt-3 text-xs text-muted-foreground'>{statusMessage}</p>
          ) : null}
          <div className='mt-5 grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-1 pr-2 sm:grid-cols-3 lg:grid-cols-4'>
            {Array.from({ length: CARD_COUNT }).map(renderLearningCard)}
          </div>
        </section>
      </div>
    </main>
  )
}
