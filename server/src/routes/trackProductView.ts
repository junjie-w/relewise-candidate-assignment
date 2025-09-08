import { FastifyInstance } from 'fastify';
import { trackProductView } from '../handlers/trackProductView.js';
import { trackProductViewSchema } from '../schemas/trackProductView.js';

export const trackProductViewRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/track-product-view', { schema: trackProductViewSchema }, trackProductView);
};
