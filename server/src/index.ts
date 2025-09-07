
import Fastify from 'fastify'
import { healthRoutes } from './routes/health.js';
import { trackProductViewRoutes } from './routes/trackProductView.js';
import { searchRoutes } from './routes/search.js';
import { errorHandler } from './errors/handler.js';

export const fastify = Fastify({
  logger: true
})

fastify.setErrorHandler(errorHandler)

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
