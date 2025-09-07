import { FastifyInstance } from 'fastify';
import { search } from '../handlers/search.js';
import { searchSchema } from '../schemas/search.js';

export const searchRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/search', { schema: searchSchema }, search);
};
