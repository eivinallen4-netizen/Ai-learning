export type PipelineStatus =
  | "idle"
  | "detecting_subject"
  | "awaiting_confirmation"
  | "creating_course"
  | "generating_mentor"
  | "generating_resources"
  | "generating_test"
  | "complete"
  | "error"

export type PipelineState = {
  sessionId: string
  userId: string
  status: PipelineStatus
  courseId?: string
  subject?: string
  error?: string
  updatedAt: number
}

export type SubjectResponse = {
  subject: string
}

export type MentorResponse = {
  mentor: string
}

export type ResourceItem = {
  raw: string
  important: boolean
}

export type ResourceResponse = {
  resources: ResourceItem[]
}

export type AnswerItem = {
  id: string
  text: string
}

export type QuestionItem = {
  text: string
  answers: AnswerItem[]
  rightAnswerId: string
}

export type TestResponse = {
  questions: QuestionItem[]
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

export class PipelineError extends Error {
  retryable: boolean

  constructor(message: string, retryable = true) {
    super(message)
    this.name = "PipelineError"
    this.retryable = retryable
  }
}
