import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { validateResourcesResponse } from "@/lib/validators"
import { callOllamaJSON } from "@/lib/ollama-client"
import { PipelineError } from "@/lib/pipeline-types"
import { getDb, ensureMigrations } from "@/lib/turso"
import { loadPrompt } from "@/lib/prompt-loader"
import { randomUUID } from "crypto"

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await ensureMigrations() // Wait for migrations to complete

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId } = await context.params
    const { sessionId, sourceText } = (await req.json()) as {
      sessionId?: string
      sourceText?: string
    }

    if (!sessionId || !sourceText) {
      return NextResponse.json(
        { error: "Missing sessionId or sourceText" },
        { status: 400 }
      )
    }

    const fullText = sourceText.trim()
    if (!fullText) {
      return NextResponse.json(
        { error: "Source text cannot be empty" },
        { status: 400 }
      )
    }

    // Use only first 500 chars for resource extraction (starling-lm is slow on long prompts)
    let analysisText = fullText.slice(0, 500)

    // Sanitize for safe JSON embedding: remove problematic escape sequences
    analysisText = analysisText
      .replace(/\\/g, " ") // Replace backslashes with space
      .replace(/"/g, "'") // Replace quotes with apostrophes
      .replace(/[\x00-\x1F\x7F]/g, " ") // Remove control characters
      .trim()

    const db = getDb()

    // Verify course ownership
    const courseResult = await db.execute({
      sql: `SELECT id, mentor, subject FROM courses WHERE id = ? AND user_id = ?`,
      args: [courseId, userId],
    })

    if (!courseResult.rows || courseResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 403 }
      )
    }

    const course = courseResult.rows[0] as unknown as {
      id: string
      mentor: string | null
      subject: string
    }

    // Call Ollama to generate resources
    const resourcesPrompt = loadPrompt('resources', {
      mentor: course.mentor || 'Expert',
      subject: course.subject,
      text: analysisText,
    })

    const response = await callOllamaJSON(
      resourcesPrompt,
      validateResourcesResponse
    )

    // Batch insert resources
    const insertPromises = response.resources.map((resource) => {
      const resourceId = randomUUID()
      return db.execute({
        sql: `INSERT INTO resources (id, course_id, raw, important) VALUES (?, ?, ?, ?)`,
        args: [
          resourceId,
          courseId,
          resource.raw,
          resource.important ? 1 : 0,
        ],
      })
    })

    await Promise.all(insertPromises)

    return NextResponse.json({
      status: "resources_done",
      count: response.resources.length,
    })
  } catch (error) {
    console.error("[Pipeline Resources Error]:", error)

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
