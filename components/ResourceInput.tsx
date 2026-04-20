'use client'
// NOTE: Main input form for pasting/uploading study resources before Learn Board.

import * as React from 'react'
import { ArrowUp } from '@deemlol/next-icons'
import { useAuth } from '@clerk/nextjs'
import { Paperclip } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useLoading } from '@/components/LoadingScreen'
import { saveLearnBoardPayload } from '@/lib/learn-board-state'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

// NOTE: `UNAUTH_MAX_CHARS` stores a fixed constant/reference used by this module.
const UNAUTH_MAX_CHARS = 300

function buildResourceName(rawText: string): string {
  const firstLine = rawText
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean)
  return (firstLine || 'Uploaded Resource').slice(0, 60)
}

// NOTE: `ResourceInput` encapsulates reusable logic for this module.
function ResourceInput({ className, onChange, onFocus, onTouchStart, ...props }: React.ComponentProps<'textarea'>) {
  const { isSignedIn } = useAuth()
// NOTE: `router` stores a constant/reference used in this scope.
  const router = useRouter()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [value, setValue] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

// NOTE: `maxChars` stores a constant/reference used in this scope.
  const maxChars = isSignedIn ? undefined : UNAUTH_MAX_CHARS

// NOTE: `handleSubmit` stores a constant/reference used in this scope.
  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

// NOTE: `rawText` stores a constant/reference used in this scope.
      const rawText = value.trim()
      if (!rawText || isSubmitting) return

      if (!isSignedIn) {
        stopLoading()
        router.push('/sign-in')
        return
      }

      const resourceName = buildResourceName(rawText)

      setIsSubmitting(true)
      startLoading('Saving your resource...')
      try {
        saveLearnBoardPayload({
          sourceText: rawText,
          resourceName,
          createdAt: Date.now(),
        })
        router.push('/learn-board')
      } finally {
        stopLoading()
        setIsSubmitting(false)
      }
    },
    [isSignedIn, isSubmitting, router, startLoading, stopLoading, value]
  )

// NOTE: `onPickFile` stores an event handler callback.
  const onPickFile = React.useCallback(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
    }
  }, [isSignedIn, router])

  const handleTextareaFocus = React.useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(event)
    },
    [onFocus]
  )

  const handleTextareaTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLTextAreaElement>) => {
      onTouchStart?.(event)
    },
    [onTouchStart]
  )

  const handleTextareaChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value)
      onChange?.(event)
    },
    [onChange]
  )

  const handleSubmitButtonClick = React.useCallback(() => {
    if (!isLoading && !isSubmitting && value.trim()) {
      startLoading('Saving your resource...')
    }
  }, [isLoading, isSubmitting, startLoading, value])

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSubmit}
        data-slot='resource-input'
        className={cn('w-full rounded-3xl border border-border bg-background px-2 py-2 shadow-sm', className)}
      >
        <textarea
          data-slot='textarea'
          rows={2}
          className={cn(
            'min-h-14 w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 outline-none placeholder:text-muted-foreground'
          )}
          {...props}
          name={props.name ?? 'resource'}
          value={value}
          maxLength={maxChars}
          onFocus={handleTextareaFocus}
          onTouchStart={handleTextareaTouchStart}
          onChange={handleTextareaChange}
        />
        <div className='mt-1 flex items-center justify-between px-1'>
          <Button type='button' variant='ghost' size='icon-sm' className='relative rounded-full text-muted-foreground' onClick={onPickFile}>
            <Paperclip className='size-4' />
          </Button>

          <Button
            type='submit'
            size='icon-sm'
            className='rounded-full'
            disabled={isSubmitting || !value.trim()}
            onClick={handleSubmitButtonClick}
          >
            <ArrowUp />
          </Button>
        </div>
        <p className='px-3 pb-1 pt-1 text-left text-xs text-muted-foreground'>
          {maxChars ? `${value.length}/${maxChars} chars` : `${value.length} chars`}
          {!isSignedIn ? ' - Sign in required to submit.' : ''}
          {' - Source: text'}
        </p>
      </form>

    </div>
  )
}

export { ResourceInput }
