'use client'
// NOTE: Question runner page that reads quiz payload from URL params.

import * as React from 'react'
import { useSearchParams } from 'next/navigation'

import PageScribbles from '@/components/PageScribbles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type QuestionItem = {
  question: string
  answer: string
  answers: string[]
}

// NOTE: `dummyQuestions` stores a constant/reference used in this scope.
const dummyQuestions: QuestionItem[] = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
    answers: ['Madrid', 'Paris', 'Berlin', 'Rome'],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    answers: ['Jupiter', 'Earth', 'Mars', 'Venus'],
  },
  {
    question: 'What is 2 + 2?',
    answer: '4',
    answers: ['3', '4', '5', '6'],
  },
  {
    question: 'Which language is used with React?',
    answer: 'JavaScript',
    answers: ['Python', 'JavaScript', 'C++', 'Go'],
  },
]

// NOTE: `normalizeQuestions` validates/normalizes incoming data into a safe shape.
function normalizeQuestions(input: unknown): QuestionItem[] {
  if (!Array.isArray(input)) return []

  return input
    .map((row) => {
      if (!row || typeof row !== 'object') return null
// NOTE: `item` stores a constant/reference used in this scope.
      const item = row as Record<string, unknown>
// NOTE: `question` stores a constant/reference used in this scope.
      const question = typeof item.question === 'string' ? item.question.trim() : ''
// NOTE: `answer` stores a constant/reference used in this scope.
      const answer = typeof item.answer === 'string' ? item.answer.trim() : ''
// NOTE: `answers` stores a constant/reference used in this scope.
      const answers = Array.isArray(item.answers)
        ? item.answers
            .filter((x): x is string => typeof x === 'string')
            .map((x) => x.trim())
            .filter(Boolean)
        : []

      if (!question || answers.length === 0) return null
      return { question, answer, answers }
    })
    .filter((x): x is QuestionItem => Boolean(x))
}

// NOTE: `QuestionsPage` encapsulates reusable logic for this module.
export default function QuestionsPage() {
  return (
    <React.Suspense
      fallback={
        <main className='relative mx-auto min-h-screen w-full max-w-3xl overflow-hidden px-4 py-8 sm:px-6'>
          <PageScribbles preset='app' />
          <div className='relative z-10'>Loading questions...</div>
        </main>
      }
    >
      <QuestionsPageContent />
    </React.Suspense>
  )
}

function QuestionsPageContent() {
// NOTE: `searchParams` stores a constant/reference used in this scope.
  const searchParams = useSearchParams()
  const [questions, setQuestions] = React.useState<QuestionItem[]>(dummyQuestions)
  const [selectedAnswers, setSelectedAnswers] = React.useState<string[]>(() =>
    Array(dummyQuestions.length).fill('')
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
// NOTE: `payload` stores a constant/reference used in this scope.
    const payload = searchParams.get('payload')
    if (!payload) return

    try {
// NOTE: `decoded` stores a constant/reference used in this scope.
      const decoded = decodeURIComponent(payload)
// NOTE: `parsed` stores a constant/reference used in this scope.
      const parsed = JSON.parse(decoded) as unknown
// NOTE: `normalized` stores a constant/reference used in this scope.
      const normalized = normalizeQuestions(parsed)
      if (normalized.length > 0) {
        setQuestions(normalized)
        setSelectedAnswers(Array(normalized.length).fill(''))
        setCurrentIndex(0)
        setSubmitted(false)
      }
    } catch {
      // Keep dummy data when payload is malformed.
    }
  }, [searchParams])

// NOTE: `current` stores a constant/reference used in this scope.
  const current = questions[currentIndex]
// NOTE: `isLast` tracks a boolean condition used in rendering/logic.
  const isLast = currentIndex === questions.length - 1
// NOTE: `canProceed` determines whether an action should be enabled.
  const canProceed = Boolean(selectedAnswers[currentIndex]?.trim())

// NOTE: `results` stores a constant/reference used in this scope.
  const results = React.useMemo(
    () =>
      questions.map((item, index) => ({
        id: index + 1,
        question: item.question,
        answer: item.answer,
        answers: item.answers,
        selected: selectedAnswers[index] ?? '',
        isCorrect: item.answer ? selectedAnswers[index] === item.answer : null,
      })),
    [questions, selectedAnswers]
  )

  const handleAnswerSelect = React.useCallback((option: string) => {
    setSelectedAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = option
      return next
    })
  }, [currentIndex])

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
  }, [questions.length])

  const submitAnswers = React.useCallback(() => {
    setSubmitted(true)
  }, [])

  const renderAnswerOption = React.useCallback(
    (option: string) => {
      const selected = selectedAnswers[currentIndex] === option
      return (
        <Button
          key={option}
          type='button'
          variant={selected ? 'default' : 'outline'}
          className='justify-start'
          onClick={() => handleAnswerSelect(option)}
        >
          {option}
        </Button>
      )
    },
    [currentIndex, handleAnswerSelect, selectedAnswers]
  )

  return (
    <main className='relative mx-auto min-h-screen w-full max-w-3xl overflow-hidden px-4 py-8 sm:px-6'>
      <PageScribbles preset='app' />
      <div className='relative z-10'>
      <p className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h1 className='mb-2 text-3xl font-semibold tracking-tight'>{current.question}</h1>
      <p className='mb-6 text-sm text-muted-foreground'>
        Single-question mode with next/submit. Pass data using `?payload=`; dummy data is used by default.
      </p>

      <div className='grid gap-4'>
        <div className='grid gap-2'>
          {current.answers.map(renderAnswerOption)}
        </div>

        <div className='flex items-center gap-2 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            Back
          </Button>

          {!isLast ? (
            <Button
              type='button'
              onClick={goToNext}
              disabled={!canProceed}
            >
              Next
            </Button>
          ) : (
            <Button type='button' onClick={submitAnswers} disabled={!canProceed}>
              Submit
            </Button>
          )}
        </div>
      </div>

      {submitted ? (
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle className='text-base'>Submitted Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='overflow-x-auto rounded-md border bg-muted/30 p-3 text-xs'>
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : null}
      </div>
    </main>
  )
}
