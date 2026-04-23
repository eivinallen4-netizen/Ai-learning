import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { validateTestResponse } from "@/lib/validators"
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
    const { sessionId } = (await req.json()) as {
      sessionId?: string
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      )
    }

    const db = getDb()

    // Verify course ownership and get course + resources
    const courseResult = await db.execute({
      sql: `SELECT id, subject, mentor FROM courses WHERE id = ? AND user_id = ?`,
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
      subject: string
      mentor: string | null
    }

    // Get resources
    const resourcesResult = await db.execute({
      sql: `SELECT raw, important FROM resources WHERE course_id = ? ORDER BY ROWID`,
      args: [courseId],
    })

    const resources = (resourcesResult.rows || []) as unknown as Array<{
      raw: string
      important: number
    }>

    if (resources.length === 0) {
      return NextResponse.json(
        { error: "No resources found for course" },
        { status: 400 }
      )
    }

    // Call Ollama to generate test
    const resourcesText = resources
      .map((r) => `- ${r.raw} ${r.important ? "(IMPORTANT)" : ""}`)
      .join("\n")

    const testPrompt = loadPrompt('test', {
      mentor: course.mentor || 'Expert',
      subject: course.subject,
      concepts: resourcesText.slice(0, 200),
    })

    const testResponse = await callOllamaJSON(
      testPrompt,
      validateTestResponse
    )

    // Create test record
    const testId = randomUUID()
    await db.execute({
      sql: `INSERT INTO tests (id, course_id) VALUES (?, ?)`,
      args: [testId, courseId],
    })

    // Insert all answers for each question
    const answerInserts: Promise<any>[] = []

    for (const question of testResponse.questions) {
      for (const answer of question.answers) {
        const answerId = randomUUID()
        const isCorrect = answer.id === question.rightAnswerId ? 1 : 0

        answerInserts.push(
          db.execute({
            sql: `INSERT INTO answers (id, test_id, text, is_correct) VALUES (?, ?, ?, ?)`,
            args: [answerId, testId, answer.text, isCorrect],
          })
        )
      }
    }

    await Promise.all(answerInserts)

    return NextResponse.json({
      status: "complete",
      testId,
      questionCount: testResponse.questions.length,
    })
  } catch (error) {
    console.error("[Pipeline Test Error]:", error)

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
