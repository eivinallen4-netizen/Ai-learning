import {
  ValidationError,
  SubjectResponse,
  MentorResponse,
  ResourceResponse,
  TestResponse,
  AnswerItem,
  QuestionItem,
} from "./pipeline-types"

export function validateSubjectResponse(data: unknown): SubjectResponse {
  if (!data || typeof data !== "object") {
    throw new ValidationError("Response is not an object")
  }

  const obj = data as Record<string, unknown>

  if (typeof obj.subject !== "string" || !obj.subject.trim()) {
    throw new ValidationError("Missing or empty 'subject' field")
  }

  return {
    subject: obj.subject.trim(),
  }
}

export function validateMentorResponse(data: unknown): MentorResponse {
  if (!data || typeof data !== "object") {
    throw new ValidationError("Response is not an object")
  }

  const obj = data as Record<string, unknown>

  if (typeof obj.mentor !== "string" || !obj.mentor.trim()) {
    throw new ValidationError("Missing or empty 'mentor' field")
  }

  return {
    mentor: obj.mentor.trim(),
  }
}

export function validateResourcesResponse(data: unknown): ResourceResponse {
  if (!data || typeof data !== "object") {
    throw new ValidationError("Response is not an object")
  }

  const obj = data as Record<string, unknown>

  if (!Array.isArray(obj.resources)) {
    throw new ValidationError("'resources' must be an array")
  }

  if (obj.resources.length === 0) {
    throw new ValidationError("'resources' array cannot be empty")
  }

  const validated = obj.resources.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new ValidationError(
        `Resource at index ${index} is not an object`
      )
    }

    const res = item as Record<string, unknown>

    if (typeof res.raw !== "string" || !res.raw.trim()) {
      throw new ValidationError(
        `Resource at index ${index} missing or empty 'raw' field`
      )
    }

    if (typeof res.important !== "boolean") {
      throw new ValidationError(
        `Resource at index ${index} 'important' must be boolean`
      )
    }

    return {
      raw: res.raw.trim(),
      important: res.important,
    }
  })

  return {
    resources: validated,
  }
}

export function validateTestResponse(data: unknown): TestResponse {
  if (!data || typeof data !== "object") {
    throw new ValidationError("Response is not an object")
  }

  const obj = data as Record<string, unknown>

  if (!Array.isArray(obj.questions)) {
    throw new ValidationError("'questions' must be an array")
  }

  if (obj.questions.length === 0) {
    throw new ValidationError("'questions' array cannot be empty")
  }

  const validated = obj.questions.map((item, qIndex) => {
    if (!item || typeof item !== "object") {
      throw new ValidationError(`Question at index ${qIndex} is not an object`)
    }

    const q = item as Record<string, unknown>

    if (typeof q.text !== "string" || !q.text.trim()) {
      throw new ValidationError(
        `Question at index ${qIndex} missing or empty 'text' field`
      )
    }

    if (!Array.isArray(q.answers)) {
      throw new ValidationError(
        `Question at index ${qIndex} 'answers' must be an array`
      )
    }

    if (q.answers.length < 2) {
      throw new ValidationError(
        `Question at index ${qIndex} must have at least 2 answers`
      )
    }

    const answers: AnswerItem[] = q.answers.map((ans, aIndex) => {
      if (!ans || typeof ans !== "object") {
        throw new ValidationError(
          `Answer at question ${qIndex}, index ${aIndex} is not an object`
        )
      }

      const a = ans as Record<string, unknown>

      if (typeof a.id !== "string" || !a.id.trim()) {
        throw new ValidationError(
          `Answer at question ${qIndex}, index ${aIndex} missing or empty 'id' field`
        )
      }

      if (typeof a.text !== "string" || !a.text.trim()) {
        throw new ValidationError(
          `Answer at question ${qIndex}, index ${aIndex} missing or empty 'text' field`
        )
      }

      return {
        id: a.id.trim(),
        text: a.text.trim(),
      }
    })

    if (typeof q.rightAnswerId !== "string") {
      throw new ValidationError(
        `Question at index ${qIndex} 'rightAnswerId' must be a string`
      )
    }

    const answerIds = answers.map((a) => a.id)
    if (!answerIds.includes(q.rightAnswerId)) {
      throw new ValidationError(
        `Question at index ${qIndex} 'rightAnswerId' "${q.rightAnswerId}" not found in answers`
      )
    }

    return {
      text: q.text.trim(),
      answers,
      rightAnswerId: q.rightAnswerId,
    } as QuestionItem
  })

  return {
    questions: validated,
  }
}
