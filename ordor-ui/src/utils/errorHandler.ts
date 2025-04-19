import { ref } from 'vue'

export interface AppError {
  message: string
  code?: string
  details?: unknown
}

export const currentError = ref<AppError | null>(null)

export const setError = (error: AppError) => {
  currentError.value = error
  // エラーログの出力
  console.error('Application Error:', error)
}

export const clearError = () => {
  currentError.value = null
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'API_ERROR',
      details: error
    }
  }
  return {
    message: '予期せぬエラーが発生しました',
    code: 'UNKNOWN_ERROR',
    details: error
  }
}

export const handleValidationError = (errors: Record<string, string[]>): AppError => {
  const messages = Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n')
  
  return {
    message: '入力内容に誤りがあります',
    code: 'VALIDATION_ERROR',
    details: { messages }
  }
} 