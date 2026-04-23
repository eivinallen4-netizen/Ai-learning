import { ValidationError, PipelineError } from "./pipeline-types"

const RETRY_DELAYS = [500, 1000, 2000] // ms
const MAX_RETRIES = 3

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function callOllamaRaw(prompt: string): Promise<string> {
  const apiUrl = process.env.OLLAMA_API_URL
  const apiKey = process.env.OLLAMA_API_KEY
  const model = process.env.OLLAMA_MODEL || "llama3.2"

  if (!apiUrl) {
    throw new PipelineError("OLLAMA_API_URL not configured", false)
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`
  }

  // Using Ollama API endpoints - try /chat first, fallback to /generate
  // Note: adjust endpoint based on your Ollama server's supported routes
  const url = `${apiUrl}/chat`

  try {
    console.log(`[Ollama] Calling ${url} with model ${model}`)
    console.log(`[Ollama] Prompt: ${prompt.slice(0, 100)}...`)

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`[Ollama] API error: ${response.status}`, error)
      throw new Error(`Ollama API error: ${response.status} - ${error}`)
    }

    const rawText = await response.text()
    console.log(`[Ollama] Raw response:\n${rawText.slice(0, 500)}\n`)

    // Parse the Ollama response envelope
    const data = JSON.parse(rawText) as { message?: { content: string }; response?: string }

    // Get the assistant's content (which might contain JSON or prose)
    const content = data.message?.content || data.response || ""
    console.log(`[Ollama] Content from message: ${content.slice(0, 200)}...`)

    // Return the full content - callOllamaJSON will extract JSON from it
    return content
  } catch (err) {
    console.error(`[Ollama] Connection error:`, err)
    throw err
  }
}

function cleanJsonString(str: string): string {
  // Remove leading/trailing whitespace
  str = str.trim()

  // Remove markdown code blocks
  str = str.replace(/```json\n?/g, "").replace(/```\n?/g, "")

  // Remove control characters and fix common formatting issues
  str = str.replace(/[\x00-\x1F\x7F]/g, " ")

  // Normalize whitespace inside JSON (but preserve structure)
  str = str.replace(/:\s+/g, ":").replace(/,\s+/g, ",").replace(/\[\s+/g, "[").replace(/\s+\]/g, "]")

  return str.trim()
}

export async function callOllamaJSON<T>(
  prompt: string,
  validator: (data: unknown) => T
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const fullPrompt = `${prompt}\n\nYou MUST respond with ONLY valid JSON. No explanation. No extra text. No markdown.`

      const rawResponse = await callOllamaRaw(fullPrompt)

      // Log raw response for debugging
      console.log(`[Ollama] Raw response length: ${rawResponse.length}`)
      console.log(`[Ollama] First 200 chars: ${rawResponse.slice(0, 200)}`)

      // Hard size limit - we only expect small JSON responses
      if (rawResponse.length > 50000) {
        throw new ValidationError(
          `Response too large (${rawResponse.length} chars) - likely malformed or hallucinated`
        )
      }

      // Extract JSON safely: find first { and last }
      const startIdx = rawResponse.indexOf("{")
      const endIdx = rawResponse.lastIndexOf("}")

      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
        console.error("[Ollama] No valid JSON boundaries found in response")
        console.error(`[Ollama] Response: ${rawResponse}`)
        throw new ValidationError("No valid JSON found in response (missing { or })")
      }

      // Extract only the JSON part
      let jsonString = rawResponse.slice(startIdx, endIdx + 1)

      // Clean and normalize
      jsonString = cleanJsonString(jsonString)

      // Try to parse
      let parsed: unknown
      try {
        parsed = JSON.parse(jsonString)
      } catch (parseErr) {
        // If still failing, try aggressive cleaning
        console.warn(`[Ollama] Initial parse failed, trying aggressive cleaning`)
        jsonString = jsonString
          .replace(/[\n\r\t]/g, " ")
          .replace(/\s+/g, " ")
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]")
          .replace(/:\s+/g, ":")
          .replace(/"\s+:/g, '":')
          .replace(/:\s+"/g, ':"')

        parsed = JSON.parse(jsonString)
      }

      const validated = validator(parsed)
      return validated
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (error instanceof ValidationError || error instanceof SyntaxError) {
        // Validation or parse error - these are retryable
        if (attempt < MAX_RETRIES - 1) {
          const delay = RETRY_DELAYS[attempt]
          console.warn(
            `[Ollama] Attempt ${attempt + 1}/${MAX_RETRIES} failed, retrying in ${delay}ms:`,
            lastError.message
          )
          await sleep(delay)
          continue
        }
      } else {
        // Network or config error - not retryable
        throw new PipelineError(
          `Ollama error: ${lastError.message}`,
          false
        )
      }
    }
  }

  throw new PipelineError(
    `Failed after ${MAX_RETRIES} retries: ${lastError?.message || "Unknown error"}`
  )
}
