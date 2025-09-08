import { API_CONFIG, getApiBaseUrl } from './config'
import { createError } from '@/utils/createError.util'

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorMessage = `API request to ${endpoint} failed: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    return response.json()
  } catch (error) {
    const appError = createError(error, `API request to ${endpoint} failed`)
    throw appError
  }
}
