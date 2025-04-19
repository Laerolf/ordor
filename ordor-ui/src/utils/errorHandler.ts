import { App } from 'vue'

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler = {
  install(app: App) {
    // グローバルエラーハンドラー
    app.config.errorHandler = (err, instance, info) => {
      console.error('グローバルエラー:', err)
      console.error('コンポーネント:', instance)
      console.error('エラー情報:', info)

      // エラーログの送信やエラーモニタリングサービスへの通知など
      // ここで実装
    }

    // 警告ハンドラー
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('警告:', msg)
      console.warn('コンポーネント:', instance)
      console.warn('トレース:', trace)
    }
  }
}

// エラーメッセージの定義
export const ErrorMessages = {
  NETWORK_ERROR: 'ネットワークエラーが発生しました。',
  AUTH_ERROR: '認証エラーが発生しました。',
  VALIDATION_ERROR: '入力値に誤りがあります。',
  SERVER_ERROR: 'サーバーエラーが発生しました。',
  UNKNOWN_ERROR: '予期せぬエラーが発生しました。'
} as const

// エラーハンドリングヘルパー関数
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', error)
  }

  return new AppError(
    ErrorMessages.UNKNOWN_ERROR,
    'UNKNOWN_ERROR',
    error
  )
} 