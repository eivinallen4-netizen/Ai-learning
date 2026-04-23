'use client'
// NOTE: Global loading context/provider and full-screen loading UI.

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className='flex items-center gap-4 rounded-2xl border border-primary/30 bg-card px-8 py-6 shadow-xl bg-gradient-to-r from-primary/5 to-transparent'
      >
        <div className='relative'>
          <div className='absolute inset-0 bg-primary/20 rounded-full animate-pulse blur-lg' />
          <Loader2 className='size-6 animate-spin text-primary relative' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-base font-semibold text-white'>{message}</p>
          <p className='text-xs text-slate-400'>Processing your request...</p>
        </div>
      </motion.div>
    </div>
  )
}

// NOTE: `GlobalLoadingScreen` encapsulates reusable logic for this module.
export function GlobalLoadingScreen() {
  const { isLoading, message } = useLoading()
  return <LoadingScreen open={isLoading} message={message} />
}

