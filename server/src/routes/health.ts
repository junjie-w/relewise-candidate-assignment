import { FastifyInstance } from 'fastify';
import { getHealth } from '../handlers/health.js';

export const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', getHealth);
};
