import { NextResponse } from "next/server"
import { callOllamaRaw } from "@/lib/ollama-client"

export async function GET() {
  try {
    // Quick warmup - just get a token from the model to keep it loaded
    await callOllamaRaw("ping")
    return NextResponse.json({ status: "warm" })
  } catch {
    return NextResponse.json({ status: "warming" }, { status: 200 })
  }
}
