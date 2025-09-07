
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { healthRoutes } from './routes/health.js';
import { trackProductViewRoutes } from './routes/trackProductView.js';
import { searchRoutes } from './routes/search.js';
import { errorHandler } from './errors/handler.js';

export const fastify = Fastify({
  logger: true
})

fastify.setErrorHandler(errorHandler)

// NOTE: client server runs on port 5173 by default
const allowedOrigins = ['http://localhost:5173']
await fastify.register(cors, {
  origin: allowedOrigins
})

await fastify.register(healthRoutes);
await fastify.register(trackProductViewRoutes);
await fastify.register(searchRoutes);

const start = async () => {
  try {
    const address = await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
