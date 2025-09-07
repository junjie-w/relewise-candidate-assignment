export const API_CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    SEARCH: '/search',
    TRACK_PRODUCT_VIEW: '/track-product-view'
  },
  HEADERS: {
    'Content-Type': 'application/json'
  },
  LANGUAGE_CODE: 'da'
} as const

export const getApiBaseUrl = (): string => {
  // NOTE: should be read from environment variables
  return API_CONFIG.API_BASE_URL
}

export const getLanguageCode = (): string => {
  // NOTE: should be read from environment variables
  return API_CONFIG.LANGUAGE_CODE
}
