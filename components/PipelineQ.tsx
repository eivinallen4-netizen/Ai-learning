"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PipelineQProps {
  subject: string
  onConfirm: (finalSubject: string) => void
  isLoading?: boolean
}

export function PipelineQ({ subject, onConfirm, isLoading }: PipelineQProps) {
  const [displayedSubject, setDisplayedSubject] = useState("")
  const [inputValue, setInputValue] = useState(subject)

  // Show subject immediately without animation
  useEffect(() => {
    if (subject) {
      setDisplayedSubject(subject)
    }
  }, [subject])

  const handleConfirm = () => {
    const final = inputValue.trim() || subject
    onConfirm(final)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleConfirm()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) return
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", damping: 20 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 max-w-md w-full mx-4 border border-slate-700/50 shadow-2xl backdrop-blur"
      >
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
            Subject Detected
          </p>

          <div className="mb-6">
            <h2
              className="text-4xl font-serif font-light text-white leading-tight"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              {displayedSubject}
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Edit below or press Enter to confirm
          </p>
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="w-full bg-slate-950 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 mb-6"
          placeholder="Edit subject (optional)"
        />

        <motion.button
          onClick={handleConfirm}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 rounded transition-colors"
        >
          {isLoading ? "Processing..." : "Confirm Subject"}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
