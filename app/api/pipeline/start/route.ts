import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { validateSubjectResponse } from "@/lib/validators"
import { callOllamaJSON } from "@/lib/ollama-client"
import { PipelineError } from "@/lib/pipeline-types"
import { getDb, ensureMigrations } from "@/lib/turso"
import { loadPrompt } from "@/lib/prompt-loader"

export async function POST(req: NextRequest) {
  try {
    await ensureMigrations() // Wait for migrations to complete
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Handle both JSON and FormData
    let sessionId: string | undefined
    let sourceText: string | undefined

    const contentType = req.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = (await req.json()) as {
        sessionId?: string
        sourceText?: string
      }
      sessionId = data.sessionId
      sourceText = data.sourceText
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      sessionId = formData.get('sessionId') as string | null ?? undefined
      sourceText = formData.get('sourceText') as string | null ?? undefined
    }

    if (!sessionId || !sourceText) {
      return NextResponse.json(
        { error: "Missing sessionId or sourceText" },
        { status: 400 }
      )
    }

    // Normalize input - use only first part for analysis
    const fullText = sourceText.trim()
    if (!fullText) {
      return NextResponse.json(
        { error: "Source text cannot be empty" },
        { status: 400 }
      )
    }

    // Use only first 1000 chars for subject detection to avoid JSON parsing issues
    let analysisText = fullText.slice(0, 1000)

    // Sanitize for safe JSON embedding: remove problematic escape sequences
    analysisText = analysisText
      .replace(/\\/g, " ") // Replace backslashes with space
      .replace(/"/g, "'") // Replace quotes with apostrophes
      .replace(/[\x00-\x1F\x7F]/g, " ") // Remove control characters
      .trim()

    // Call Ollama to detect subject
    const detectPrompt = loadPrompt('subject', { text: analysisText })

    const response = await callOllamaJSON(
      detectPrompt,
      validateSubjectResponse
    )

    return NextResponse.json({
      status: "awaiting_confirmation",
      subject: response.subject,
    })
  } catch (error) {
    console.error("[Pipeline Start Error]:", error)

    if (error instanceof PipelineError) {
      const status = error.retryable ? 500 : 503
      return NextResponse.json(
        {
          error: error.message,
          retryable: error.retryable,
        },
        { status }
      )
    }

    return NextResponse.json(
      { error: "Internal server error", retryable: true },
      { status: 500 }
    )
  }
}
