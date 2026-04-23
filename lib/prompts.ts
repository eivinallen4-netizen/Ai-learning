// Prompts as a TypeScript module (replaces markdown file)
export const PROMPTS = {
  subject: {
    id: 'subject',
    content: `You are a JSON machine. Extract the main subject.
TEXT: {text}

Output ONLY this JSON, nothing else:
{{"subject":"Subject Name"}}`,
    variables: ['text'],
  },
  mentor: {
    id: 'mentor',
    content: `Create a mentor role for teaching {subject}.
Output ONLY this JSON:
{{"mentor":"Role with 5 years of experience"}}`,
    variables: ['subject'],
  },
  resources: {
    id: 'resources',
    content: `Extract 6 concepts from this text about {subject}:
{text}

Output ONLY this JSON:
{{"resources":[{{"raw":"Concept 1","important":true}},{{"raw":"Concept 2","important":false}}]}}`,
    variables: ['mentor', 'subject', 'text'],
  },
  test: {
    id: 'test',
    content: `Create 3 multiple choice questions about {subject}.
Concepts: {concepts}

Output ONLY this JSON:
{{"questions":[{{"text":"Question?","answers":[{{"id":"a","text":"A"}},{{"id":"b","text":"B"}},{{"id":"c","text":"C"}},{{"id":"d","text":"D"}}],"rightAnswerId":"a"}}]}}`,
    variables: ['mentor', 'subject', 'concepts'],
  },
}

export function loadPrompt(
  id: string,
  variables: Record<string, string>
): string {
  const prompt = PROMPTS[id as keyof typeof PROMPTS]
  if (!prompt) {
    throw new Error(`Prompt not found: ${id}`)
  }

  // Validate required variables
  for (const variable of prompt.variables) {
    if (!(variable in variables)) {
      throw new Error(`Missing variable for prompt "${id}": {${variable}}`)
    }
  }

  // Substitute variables
  let result = prompt.content
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }

  return result
}

export function listPrompts() {
  return Object.values(PROMPTS)
}
