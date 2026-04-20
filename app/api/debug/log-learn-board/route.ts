import { NextResponse } from 'next/server'

type IncomingQuestion = {
  question?: string
  answer?: string
  answers?: string[]
}

type IncomingPayload = {
  resourceName?: string
  sourceText?: string
  mode?: 'exercise' | 'flashcard' | string
  generatedQuestions?: IncomingQuestion[]
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IncomingPayload

    const logData = {
      resourceName: body.resourceName ?? 'Unknown Resource',
      mode: body.mode ?? 'unknown',
      sourceLength: body.sourceText?.length ?? 0,
      sourcePreview: body.sourceText?.slice(0, 180) ?? '',
      questionsCount: body.generatedQuestions?.length ?? 0,
      firstQuestion: body.generatedQuestions?.[0]?.question ?? null,
      at: new Date().toISOString(),
    }

    // This prints in your server terminal (Next.js server logs).
    console.log('[learn-board] payload received', logData)

    return NextResponse.json({ ok: true, logged: logData })
  } catch (error) {
    console.error('[learn-board] payload logging failed', error)
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
