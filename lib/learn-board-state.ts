// NOTE: Session storage helpers for saving and restoring the latest Learn Board payload.
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
  createdAt: number,
  
}

// NOTE: `KEY` stores a fixed constant/reference used by this module.
const KEY = 'learn_board_payload:latest'

// NOTE: `saveLearnBoardPayload` persists data for later retrieval.
export function saveLearnBoardPayload(payload: LearnBoardPayload): void {
  sessionStorage.setItem(KEY, JSON.stringify(payload))
}

// NOTE: `readLearnBoardPayload` reads data from storage or input and returns parsed results.
export function readLearnBoardPayload(): LearnBoardPayload | null {
// NOTE: `raw` stores a constant/reference used in this scope.
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as LearnBoardPayload
  } catch {
    return null
  }
}
