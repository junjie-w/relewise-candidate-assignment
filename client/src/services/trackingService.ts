import { API_CONFIG } from './config'
import { apiRequest } from './apiRequest'
import { createError } from '@/utils/createError.util'
import type { TrackProductViewRequestDTO } from '@/types'

export const trackProductView = async (
  userId: string,
  productId: string
): Promise<void> => {
  try {
    const request: TrackProductViewRequestDTO = {
      user: { id: userId },
      productId: productId
    }

    await apiRequest<void>(API_CONFIG.ENDPOINTS.TRACK_PRODUCT_VIEW, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  } catch (error) {
    const appError = createError(error, `Failed to track product view for product: ${productId}`)
    throw appError
  }
}
