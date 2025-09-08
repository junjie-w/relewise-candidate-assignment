const VitePreviewPort = 4173 // NOTE: client production server runs on port 4173 by default
const allowedOrigins = [
  `http://localhost:${VitePreviewPort}`
]

export const SERVER_CONFIG = {
  PORT: 3000,
  CORS_ALLOWED_ORIGINS: allowedOrigins
} as const
