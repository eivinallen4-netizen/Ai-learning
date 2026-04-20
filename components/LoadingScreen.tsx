'use client'
// NOTE: Global loading context/provider and full-screen loading UI.

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type LoadingState = {
  isLoading: boolean
  message: string
}

type LoadingContextValue = LoadingState & {
  startLoading: (message?: string) => void
  stopLoading: () => void
  setLoading: (next: Partial<LoadingState>) => void
}

// NOTE: `LoadingContext` stores a constant/reference used in this scope.
const LoadingContext = createContext<LoadingContextValue | null>(null)

// NOTE: `LoadingProvider` encapsulates reusable logic for this module.
export function LoadingProvider({
  children,
  initialMessage = 'Loading...',
}: {
  children: ReactNode
  initialMessage?: string
}) {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    message: initialMessage,
  })

// NOTE: `startLoading` stores a constant/reference used in this scope.
  const startLoading = useCallback((message?: string) => {
    setState((prev) => ({
      isLoading: true,
      message: message ?? prev.message,
    }))
  }, [])

// NOTE: `stopLoading` stores a constant/reference used in this scope.
  const stopLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: false }))
  }, [])

// NOTE: `setLoading` updates related React state.
  const setLoading = useCallback((next: Partial<LoadingState>) => {
    setState((prev) => ({ ...prev, ...next }))
  }, [])

// NOTE: `value` stores a constant/reference used in this scope.
  const value = useMemo(
    () => ({
      ...state,
      startLoading,
      stopLoading,
      setLoading,
    }),
    [state, startLoading, stopLoading, setLoading]
  )

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

// NOTE: `useLoading` encapsulates reusable logic for this module.
export function useLoading() {
// NOTE: `ctx` stores a constant/reference used in this scope.
  const ctx = useContext(LoadingContext)
  if (!ctx) {
    throw new Error('useLoading must be used inside LoadingProvider')
  }
  return ctx
}

// NOTE: `LoadingScreen` encapsulates reusable logic for this module.
export function LoadingScreen({
  open,
  message = 'Loading...',
  className,
}: {
  open: boolean
  message?: string
  className?: string
}) {
  if (!open) return null

  return (
    <div className={cn('fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm', className)}>
      <div className='flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm'>
        <Loader2 className='size-5 animate-spin text-primary' />
        <p className='text-sm font-medium'>{message}</p>
      </div>
    </div>
  )
}

// NOTE: `GlobalLoadingScreen` encapsulates reusable logic for this module.
export function GlobalLoadingScreen() {
  const { isLoading, message } = useLoading()
  return <LoadingScreen open={isLoading} message={message} />
}

