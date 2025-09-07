
import Fastify from 'fastify'
import { healthRoutes } from './routes/health.js';

export const fastify = Fastify({
  logger: true
})

await fastify.register(healthRoutes);

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
