'use client'
import { ReactNode, useEffect, useState } from 'react'

type LlamaCheckProps = {
  children: ReactNode
}

export default function LlamaCheck({ children }: LlamaCheckProps) {
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch('/api/check-ollama', { cache: 'no-store' })
        setIsAvailable(response.ok)
      } catch (error) {
        console.error('Ollama check failed:', error)
        setIsAvailable(false)
      }
    }

    checkOllama()
  }, [])

  return isAvailable
    ? <span className='text-green-600'>{children}</span>
    : <span className='text-red-600'>{children}</span>
}
