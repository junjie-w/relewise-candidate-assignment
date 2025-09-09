
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { healthRoutes } from './routes/health.js';
import { trackProductViewRoutes } from './routes/trackProductView.js';
import { searchRoutes } from './routes/search.js';
import { errorHandler } from './errors/handler.js';
import { SERVER_CONFIG } from './constants.js';

export const fastify = Fastify({
  logger: true
})

fastify.setErrorHandler(errorHandler)

// CORS configuration for build environment (in dev environment, Vite proxy handles CORS)
await fastify.register(cors, {
  origin: SERVER_CONFIG.CORS_ALLOWED_ORIGINS
})

await fastify.register(healthRoutes);
await fastify.register(trackProductViewRoutes);
await fastify.register(searchRoutes);

const start = async () => {
  try {
    const address = await fastify.listen({ port: SERVER_CONFIG.PORT });
    fastify.log.info(`Server is running at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
