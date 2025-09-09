export const SERVER_PORT = 3000 // NOTE: server runs on port 3000

export const API_ENDPOINTS = {
  SEARCH: '/search',
  TRACK_PRODUCT_VIEW: '/track-product-view'
} as const

export const API_CONFIG = {
  API_BASE_URL: import.meta.env.DEV ? '' : `http://localhost:${SERVER_PORT}`,
  ENDPOINTS: {
    // In dev environment, CORS is handled by Vite proxy
    // In build environment, CORS is handled by Fastify CORS
    SEARCH: import.meta.env.DEV ? `/api${API_ENDPOINTS.SEARCH}` : API_ENDPOINTS.SEARCH,
    TRACK_PRODUCT_VIEW: import.meta.env.DEV ? `/api${API_ENDPOINTS.TRACK_PRODUCT_VIEW}` : API_ENDPOINTS.TRACK_PRODUCT_VIEW
  },
  HEADERS: {
    'Content-Type': 'application/json'
  },
  LANGUAGE_CODE: 'da'
} as const

export const getApiBaseUrl = (): string => {
  return API_CONFIG.API_BASE_URL
}

export const getLanguageCode = (): string => {
  return API_CONFIG.LANGUAGE_CODE
}
