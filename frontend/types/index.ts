export interface CodeRequest {
  code: string
  language: string
}

export interface APIResponse {
  success: boolean
  model_used: string
}

export interface DocstringResponse extends APIResponse {
  docstring: string
}

export interface ExplanationResponse extends APIResponse {
  explanation: string
}

export type LoadingMode = 'docstring' | 'explain' | ''