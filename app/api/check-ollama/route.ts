import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.OLLAMA_API_URL
    const apiKey = process.env.OLLAMA_API_KEY

    if (!apiUrl) {
      return NextResponse.json(
        { available: false, error: 'OLLAMA_API_URL not configured' },
        { status: 503 }
      )
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const url = `${apiUrl}/tags`
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ available: true, models: data }, { status: 200 })
    }

    return NextResponse.json({ available: false }, { status: 503 })
  } catch (error) {
    console.error('Ollama check error:', error)
    return NextResponse.json({ available: false }, { status: 503 })
  }
}
