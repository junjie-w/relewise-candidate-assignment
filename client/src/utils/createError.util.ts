export interface AppError {
  message: string
  originalError?: Error
}

export const createError = (error: unknown, context?: string): AppError => {
  // NOTE: simplified error handling for demo purpose
  console.error(error)

  return {
    message: `An error occurred${context && `: ${context}`}`,
    originalError: error instanceof Error ? error : new Error(String(error))
  }
}
