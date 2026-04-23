"use client"

import { useEffect, useState, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { PipelineQ } from "@/components/PipelineQ"
import { PipelineStatus } from "@/lib/pipeline-types"
import { motion } from "framer-motion"
import { readLearnBoardPayload } from "@/lib/learn-board-state"

const STEPS = [
  { key: "detecting_subject", label: "Detect", color: "from-blue-500 to-cyan-500" },
  { key: "awaiting_confirmation", label: "Confirm", color: "from-purple-500 to-pink-500" },
  { key: "creating_course", label: "Create", color: "from-emerald-500 to-teal-500" },
  { key: "generating_mentor", label: "Mentor", color: "from-amber-500 to-orange-500" },
  { key: "generating_resources", label: "Resources", color: "from-rose-500 to-red-500" },
  { key: "generating_test", label: "Test", color: "from-indigo-500 to-blue-500" },
  { key: "complete", label: "Done", color: "from-green-500 to-emerald-500" },
]

export default function PretestPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  const [sessionId, setSessionId] = useState<string>("")
  const [sourceText, setSourceText] = useState<string>("")
  const [currentStatus, setCurrentStatus] = useState<PipelineStatus | null>(null)
  const [courseId, setCourseId] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [retryable, setRetryable] = useState(false)
  const [confirmedSubject, setConfirmedSubject] = useState<string>("")
  const [hasStarted, setHasStarted] = useState(false)

  const initPipeline = useMutation(api.pipeline.initPipeline)
  const setPipelineStatus = useMutation(api.pipeline.setPipelineStatus)
  const pipelineState = useQuery(api.pipeline.getPipelineState, {
    sessionId,
  })

  // Load initial data
  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    // Check for large file flow (sessionId stored directly)
    const storedSessionId = sessionStorage.getItem('pipeline_session_id')
    if (storedSessionId) {
      sessionStorage.removeItem('pipeline_session_id')
      setSessionId(storedSessionId)
      setSourceText('[File already processing via API]')
      return
    }

    // Check for normal text flow
    const payload = readLearnBoardPayload()
    if (!payload) {
      router.push("/")
      return
    }

    const newSessionId = crypto.randomUUID()
    setSessionId(newSessionId)
    setSourceText(payload.sourceText)
  }, [isLoaded, isSignedIn, router])

  // Sync state from Convex
  useEffect(() => {
    if (pipelineState) {
      setCurrentStatus(pipelineState.status as PipelineStatus)
      if (pipelineState.courseId) {
        setCourseId(pipelineState.courseId)
      }
      if (pipelineState.error) {
        setError(pipelineState.error)
        setRetryable(true)
      }
    }
  }, [pipelineState])

  // Start pipeline
  useEffect(() => {
    if (!sessionId || hasStarted) return

    // If pipeline was already started (via large file flow), skip re-init
    if (pipelineState?.status && pipelineState.status !== "idle") {
      setHasStarted(true)
      return
    }

    if (!sourceText) return

    const startPipeline = async () => {
      try {
        setHasStarted(true)
        await initPipeline({ sessionId, userId: sessionId })
        await setPipelineStatus({ sessionId, status: "detecting_subject" })

        const res = await fetch("/api/pipeline/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, sourceText }),
        })

        if (!res.ok) {
          const data = await res.json()
          setError(data.error || "Detection failed")
          setRetryable(data.retryable ?? true)
          await setPipelineStatus({
            sessionId,
            status: "error",
            error: data.error,
          })
          return
        }

        const { subject } = await res.json()
        setConfirmedSubject(subject)
        await setPipelineStatus({
          sessionId,
          status: "awaiting_confirmation",
          subject,
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error"
        setError(msg)
        setRetryable(true)
        await setPipelineStatus({ sessionId, status: "error", error: msg })
      }
    }

    startPipeline()
  }, [sessionId, sourceText, hasStarted, initPipeline, setPipelineStatus])

  // Generate resources & test after confirmation
  useEffect(() => {
    if (!courseId || currentStatus !== "creating_course" || !sourceText) return

    const generateContent = async () => {
      try {
        await setPipelineStatus({
          sessionId,
          status: "generating_resources",
        })

        const resRes = await fetch(`/api/pipeline/${courseId}/resources`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, sourceText }),
        })

        if (!resRes.ok) {
          throw new Error("Resources failed")
        }

        await setPipelineStatus({
          sessionId,
          status: "generating_test",
        })

        const testRes = await fetch(`/api/pipeline/${courseId}/test`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })

        if (!testRes.ok) {
          throw new Error("Test failed")
        }

        await setPipelineStatus({
          sessionId,
          status: "complete",
        })

        setTimeout(() => {
          router.push(`/tests?courseId=${courseId}`)
        }, 1500)
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error"
        setError(msg)
        setRetryable(true)
        await setPipelineStatus({ sessionId, status: "error", error: msg })
      }
    }

    generateContent()
  }, [courseId, currentStatus, sourceText, sessionId, setPipelineStatus, router])

  const handleSubjectConfirm = useCallback(
    async (finalSubject: string) => {
      try {
        await setPipelineStatus({ sessionId, status: "creating_course" })

        const res = await fetch("/api/pipeline/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, subject: finalSubject }),
        })

        if (!res.ok) {
          throw new Error("Confirmation failed")
        }

        const { courseId: cId } = await res.json()
        setCourseId(cId)
        await setPipelineStatus({
          sessionId,
          status: "creating_course",
          courseId: cId,
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error"
        setError(msg)
        setRetryable(true)
        await setPipelineStatus({ sessionId, status: "error", error: msg })
      }
    },
    [sessionId, setPipelineStatus]
  )

  const handleRetry = () => {
    setError("")
    setRetryable(false)
    setHasStarted(false)
  }

  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStatus)

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-sm tracking-widest uppercase text-slate-400 mb-4">
            Initializing
          </div>
          <div className="w-12 h-12 border-2 border-slate-600 border-t-cyan-500 rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(100, 200, 255, 0.05) 25%, rgba(100, 200, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 200, 255, 0.05) 75%, rgba(100, 200, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(100, 200, 255, 0.05) 25%, rgba(100, 200, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 200, 255, 0.05) 75%, rgba(100, 200, 255, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Building Your Course
              </h1>
              <p className="text-slate-400 text-sm tracking-widest uppercase">
                AI-powered pipeline
              </p>
            </motion.div>
          </div>

          {/* Progress Steps */}
          <div className="mb-16">
            <div className="flex justify-between gap-2">
              {STEPS.map((step, idx) => {
                const isCompleted = idx < currentStepIndex
                const isActive = idx === currentStepIndex
                const isFuture = idx > currentStepIndex

                return (
                  <motion.div
                    key={step.key}
                    className="flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Step circle */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          boxShadow: isActive
                            ? `0 0 20px ${isActive ? "#06b6d4" : "transparent"}`
                            : "none",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                            : isActive
                              ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white ring-2 ring-cyan-300/50"
                              : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {isCompleted ? "✓" : idx + 1}
                      </motion.div>

                      {/* Step label */}
                      <span
                        className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                          isActive || isCompleted
                            ? "text-cyan-400"
                            : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </span>

                      {/* Connecting line */}
                      {idx < STEPS.length - 1 && (
                        <motion.div
                          animate={{
                            backgroundColor: isCompleted
                              ? "#10b981"
                              : isFuture
                                ? "rgba(100, 116, 139, 0.3)"
                                : "rgba(148, 163, 184, 0.5)",
                          }}
                          className="absolute top-5 left-1/2 w-full h-0.5 -z-10"
                          style={{ width: "calc(100% - 0.5rem)" }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Status Card */}
          {(currentStatus || error) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 mb-6 backdrop-blur"
            >
              <div className="space-y-3">
                {currentStatus && currentStatus !== "error" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <span className="text-sm text-slate-300">
                      {currentStatus === "detecting_subject" && "Analyzing your content..."}
                      {currentStatus === "awaiting_confirmation" &&
                        "Ready for your confirmation..."}
                      {currentStatus === "creating_course" && "Creating your course..."}
                      {currentStatus === "generating_mentor" && "Generating your mentor..."}
                      {currentStatus === "generating_resources" && "Building resources..."}
                      {currentStatus === "generating_test" && "Creating assessment..."}
                      {currentStatus === "complete" && "Complete! Redirecting..."}
                    </span>
                  </motion.div>
                )}

                {confirmedSubject && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm"
                  >
                    <span className="text-slate-400">Subject: </span>
                    <span className="text-cyan-300 font-semibold">{confirmedSubject}</span>
                  </motion.div>
                )}

                {courseId && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm"
                  >
                    <span className="text-slate-400">Course ID: </span>
                    <span className="text-emerald-300 font-mono text-xs">
                      {courseId.slice(0, 12)}...
                    </span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 text-red-400"
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Retry button */}
          {error && retryable && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
            >
              Try Again
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Q component overlay */}
      {currentStatus === "awaiting_confirmation" && confirmedSubject && (
        <PipelineQ
          subject={confirmedSubject}
          onConfirm={handleSubjectConfirm}
          isLoading={false}
        />
      )}
    </div>
  )
}
