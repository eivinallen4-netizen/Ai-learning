type GeneratedTestQuestion = {
  id: string
  question: string
  answer: string
  wrongAnswers: string[]
}

export type LearnBoardPayload = {
  sourceText: string
  resourceName: string
  // Backward compatibility for previously misspelled field names.
  generatedtestQuestions?: GeneratedTestQuestion[]
  createdAt: number
}

const KEY = 'learn_board_payload:latest'

export function saveLearnBoardPayload(payload: LearnBoardPayload): void {
  sessionStorage.setItem(KEY, JSON.stringify(payload))
}

export function readLearnBoardPayload(): LearnBoardPayload | null {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as LearnBoardPayload
  } catch {
    return null
  }
}
