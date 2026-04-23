import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { validateMentorResponse } from "@/lib/validators"
import { callOllamaJSON } from "@/lib/ollama-client"
import { PipelineError } from "@/lib/pipeline-types"
import { getDb, ensureMigrations } from "@/lib/turso"
import { loadPrompt } from "@/lib/prompt-loader"
import { randomUUID } from "crypto"

export async function POST(req: NextRequest) {
  try {
    await ensureMigrations() // Wait for migrations to complete

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionId, subject } = (await req.json()) as {
      sessionId?: string
      subject?: string
    }

    if (!sessionId || !subject) {
      return NextResponse.json(
        { error: "Missing sessionId or subject" },
        { status: 400 }
      )
    }

    const confirmSubject = subject.trim()
    if (!confirmSubject) {
      return NextResponse.json(
        { error: "Subject cannot be empty" },
        { status: 400 }
      )
    }

    // Create course record in Turso
    const courseId = randomUUID()
    const db = getDb()

    await db.execute({
      sql: `INSERT INTO courses (id, user_id, subject, created_at) VALUES (?, ?, ?, ?)`,
      args: [courseId, userId, confirmSubject, Date.now()],
    })

    // Call Ollama to generate mentor
    const mentorPrompt = loadPrompt('mentor', { subject: confirmSubject })

    const mentorResponse = await callOllamaJSON(
      mentorPrompt,
      validateMentorResponse
    )

    // Update course with mentor
    await db.execute({
      sql: `UPDATE courses SET mentor = ? WHERE id = ?`,
      args: [mentorResponse.mentor, courseId],
    })

    return NextResponse.json({
      status: "mentor_ready",
      courseId,
      mentor: mentorResponse.mentor,
    })
  } catch (error) {
    console.error("[Pipeline Confirm Error]:", error)

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
