'use client'

import * as React from 'react'
import { ArrowUp, Check } from '@deemlol/next-icons'
import { useAuth } from '@clerk/nextjs'
import { Paperclip, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { useLoading } from '@/components/LoadingScreen'
import { saveLearnBoardPayload } from '@/lib/learn-board-state'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const UNAUTH_MAX_CHARS = 300

function buildResourceName(rawText: string): string {
  const firstLine = rawText
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean)
  return (firstLine || 'Uploaded Resource').slice(0, 60)
}

function ResourceInput({ className, onChange, onFocus, onTouchStart, ...props }: React.ComponentProps<'textarea'>) {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [value, setValue] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [uploadMessage, setUploadMessage] = React.useState('')

  const maxChars = isSignedIn ? undefined : UNAUTH_MAX_CHARS
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!value.trim() && !uploadedFile) return
      if (isSubmitting) return

      if (!isSignedIn) {
        stopLoading()
        router.push('/sign-in')
        return
      }

      setIsSubmitting(true)

      try {
        let sourceText = value.trim()

        // Read file content if uploaded
        if (uploadedFile) {
          startLoading(`Reading ${uploadedFile.name}...`)
          sourceText = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsText(uploadedFile)
          })
        }

        const resourceName = buildResourceName(sourceText || uploadedFile!.name)
        const sessionId = crypto.randomUUID()

        // For large files, use FormData instead of JSON to avoid serialization issues
        if (sourceText.length > 1000000) {
          // Large file - use FormData
          console.warn('Using FormData for large file')
          startLoading('Processing file...')

          sessionStorage.setItem('pipeline_session_id', sessionId)

          const formData = new FormData()
          formData.append('sessionId', sessionId)
          formData.append('sourceText', sourceText)

          let res = await fetch('/api/pipeline/start', {
            method: 'POST',
            body: formData,
          })

          // Auto-retry once for retryable errors (Ollama temp failures)
          if (!res.ok) {
            const data = await res.json()
            if (data.retryable) {
              console.log('Auto-retrying after retryable error...')
              // Rebuild FormData for retry
              const retryFormData = new FormData()
              retryFormData.append('sessionId', sessionId)
              retryFormData.append('sourceText', sourceText)

              res = await fetch('/api/pipeline/start', {
                method: 'POST',
                body: retryFormData,
              })
            }

            if (!res.ok) {
              const retryData = await res.json()
              throw new Error(retryData.error || 'Failed to process file')
            }
          }
        } else {
          // Small text - use sessionStorage and normal flow
          try {
            startLoading('Saving your resource...')
            saveLearnBoardPayload({
              sourceText,
              resourceName,
              createdAt: Date.now(),
            })
          } catch (e) {
            // Fallback to FormData if sessionStorage fails
            console.warn('SessionStorage failed, using FormData')
            startLoading('Processing file...')

            sessionStorage.setItem('pipeline_session_id', sessionId)

            const formData = new FormData()
            formData.append('sessionId', sessionId)
            formData.append('sourceText', sourceText)

            let res = await fetch('/api/pipeline/start', {
              method: 'POST',
              body: formData,
            })

            // Auto-retry once for retryable errors
            if (!res.ok) {
              const data = await res.json()
              if (data.retryable) {
                console.log('Auto-retrying after retryable error...')
                const retryFormData = new FormData()
                retryFormData.append('sessionId', sessionId)
                retryFormData.append('sourceText', sourceText)

                res = await fetch('/api/pipeline/start', {
                  method: 'POST',
                  body: retryFormData,
                })
              }

              if (!res.ok) {
                const retryData = await res.json()
                throw new Error(retryData.error || 'Failed to process file')
              }
            }
          }
        }

        router.push('/pretest')
      } catch (error) {
        console.error('Submit error:', error)
        setUploadStatus('error')
        setUploadMessage(error instanceof Error ? error.message : 'Failed to process')
        setTimeout(() => setUploadStatus('idle'), 3000)
      } finally {
        stopLoading()
        setIsSubmitting(false)
      }
    },
    [isSignedIn, isSubmitting, router, startLoading, stopLoading, value, uploadedFile]
  )

  const onPickFile = React.useCallback(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    fileInputRef.current?.click()
  }, [isSignedIn, router])

  const handleFileChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const MAX_SIZE = 50 * 1024 * 1024
      if (file.size > MAX_SIZE) {
        setUploadStatus('error')
        setUploadMessage('File too large (max 50MB)')
        setTimeout(() => setUploadStatus('idle'), 3000)
        return
      }

      try {
        setUploadStatus('loading')
        setUploadMessage('Processing file...')

        // Just store the file reference - don't parse it
        setUploadedFile(file)
        setUploadStatus('success')
        setUploadMessage(`Ready: ${file.name}`)

        setTimeout(() => setUploadStatus('idle'), 2000)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } catch (error) {
        setUploadStatus('error')
        setUploadMessage('Failed to upload')
        setTimeout(() => setUploadStatus('idle'), 3000)
      }
    },
    []
  )

  const handleTextareaChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value)
      setUploadedFile(null)
      onChange?.(event)
    },
    [onChange]
  )

  const handleClear = React.useCallback(() => {
    setValue('')
    setUploadedFile(null)
    setUploadStatus('idle')
  }, [])

  const hasContent = uploadedFile || value.trim().length > 0

  return (
    <div className='w-full'>
      <input
        ref={fileInputRef}
        type='file'
        accept='.txt,.md,.pdf,.doc,.docx,.csv'
        onChange={handleFileChange}
        className='hidden'
        aria-label='Upload file'
      />

      <form
        onSubmit={handleSubmit}
        data-slot='resource-input'
        className={cn(
          'w-full rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 px-3 py-3 shadow-lg backdrop-blur transition-all duration-300 hover:border-slate-600 focus-within:border-cyan-500/50 focus-within:shadow-lg focus-within:shadow-cyan-500/10',
          className
        )}
      >
        {/* File loaded indicator */}
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className='mb-2 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 border border-emerald-500/30'
          >
            <Check className='w-4 h-4 text-emerald-400' />
            <span className='text-xs font-medium text-emerald-300'>{uploadedFile.name}</span>
            <button
              type='button'
              onClick={handleClear}
              className='ml-auto hover:text-emerald-200 transition-colors'
            >
              <X className='w-4 h-4' />
            </button>
          </motion.div>
        )}

        {!uploadedFile && (
          <textarea
            data-slot='textarea'
            rows={2}
            className={cn(
              'min-h-14 w-full resize-none bg-transparent px-0 py-2 text-sm leading-6 outline-none placeholder:text-slate-500 text-slate-100'
            )}
            {...props}
            name={props.name ?? 'resource'}
            value={value}
            maxLength={maxChars}
            onFocus={onFocus}
            onTouchStart={onTouchStart}
            onChange={handleTextareaChange}
            placeholder='Paste text or click 📎 to upload a file'
          />
        )}

        <div className='mt-3 flex items-center justify-between px-0'>
          <motion.div
            animate={{ opacity: uploadStatus !== 'idle' ? 1 : 0 }}
            className='text-xs'
          >
            {uploadStatus === 'loading' && (
              <div className='flex items-center gap-2 text-slate-400'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='w-3 h-3 border border-slate-500 border-t-cyan-400 rounded-full'
                />
                <span>{uploadMessage}</span>
              </div>
            )}
            {uploadStatus === 'success' && (
              <div className='flex items-center gap-2 text-emerald-400'>
                <Check className='w-4 h-4' />
                <span>{uploadMessage}</span>
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className='flex items-center gap-2 text-red-400'>
                <X className='w-4 h-4' />
                <span>{uploadMessage}</span>
              </div>
            )}
          </motion.div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onPickFile}
              className='relative rounded-lg p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 group'
              title='Upload file'
            >
              <Paperclip className='w-4 h-4 group-hover:scale-110 transition-transform' />
            </button>

            <Button
              type='submit'
              size='icon-sm'
              className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all'
              disabled={isSubmitting || !hasContent}
            >
              <ArrowUp className='w-4 h-4' />
            </Button>
          </div>
        </div>

        <p className='px-0 pt-2 text-xs text-slate-500'>
          {uploadedFile ? `${uploadedFile.name} ready to process` : maxChars ? `${value.length}/${maxChars} characters` : `${value.length} characters`}
        </p>
      </form>
    </div>
  )
}

export { ResourceInput }
