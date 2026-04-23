"use client"

import { PipelineStatus } from "@/lib/pipeline-types"
import { motion } from "framer-motion"

interface PipelineProgressProps {
  status: PipelineStatus
}

const STEPS = [
  { key: "detecting_subject", label: "DETECT" },
  { key: "awaiting_confirmation", label: "CONFIRM" },
  { key: "creating_course", label: "CREATE" },
  { key: "generating_mentor", label: "MENTOR" },
  { key: "generating_resources", label: "RESOURCES" },
  { key: "generating_test", label: "TEST" },
  { key: "complete", label: "DONE" },
]

const STATUS_TO_STEP_INDEX: Record<PipelineStatus, number> = {
  idle: 0,
  detecting_subject: 0,
  awaiting_confirmation: 1,
  creating_course: 2,
  generating_mentor: 3,
  generating_resources: 4,
  generating_test: 5,
  complete: 6,
  error: 0,
}

export function PipelineProgress({ status }: PipelineProgressProps) {
  const currentIndex = STATUS_TO_STEP_INDEX[status]
  const isError = status === "error"

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex && !isError
          const isFuture = index > currentIndex

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: isActive
                    ? "#3b82f6"
                    : isCompleted
                      ? "#10b981"
                      : "#64748b",
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2 ${
                  isActive ? "ring-4 ring-blue-300 animate-pulse" : ""
                }`}
              >
                {isCompleted ? (
                  <span>✓</span>
                ) : isError && isActive ? (
                  <span>!</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              <p
                className={`text-xs font-mono tracking-tight ${
                  isActive || isCompleted
                    ? "text-white"
                    : "text-slate-500"
                }`}
              >
                {step.label}
              </p>

              {index < STEPS.length - 1 && (
                <div
                  className={`absolute left-0 right-0 h-1 top-5 -z-10 ${
                    index < currentIndex ? "bg-green-500" : "bg-slate-700"
                  }`}
                  style={{
                    width: `calc(100% / ${STEPS.length} - 2rem)`,
                    left: `calc((100% / ${STEPS.length}) * ${index} + 3rem)`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
