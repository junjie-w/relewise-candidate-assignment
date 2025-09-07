import type { languageCode, SearchRequestDTO, SearchResponseDTO } from '@/types'
import { API_CONFIG, getLanguageCode } from './config'
import { apiRequest } from './apiRequest'
import { createError } from '@/utils/createError.util'

export const searchProducts = async (
  userId: string,
  searchTerm: string
): Promise<SearchResponseDTO> => {
  try {
    const request: SearchRequestDTO = {
      user: { id: userId },
      search: {
        term: searchTerm,
        languageCode: getLanguageCode() as languageCode
      },
    }

    return await apiRequest<SearchResponseDTO>(API_CONFIG.ENDPOINTS.SEARCH, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  } catch (error) {
    const appError = createError(error, `Search failed for term: ${searchTerm}`)
    throw appError
  }
}