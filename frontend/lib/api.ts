const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://codedoc-backend-n2p8.onrender.com'

export interface CodeRequest {
  code: string
  language: string
}

export interface DocstringResponse {
  docstring: string
  success: boolean
  model_used: string
}

export interface ExplanationResponse {
  explanation: string
  success: boolean
  model_used: string
}

export async function generateDocstring(request: CodeRequest): Promise<DocstringResponse> {
  const response = await fetch(`${API_URL}/api/v1/generate-docstring`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export async function explainCode(request: CodeRequest): Promise<ExplanationResponse> {
  const response = await fetch(`${API_URL}/api/v1/explain-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}