import { FastifyRequest, FastifyReply } from 'fastify';
import { TrackProductViewRequest } from '../types.js';

export const trackProductView = async (
  request: FastifyRequest<{ Body: TrackProductViewRequest }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, productId } = request.body;

  request.log.info(`Product view tracked: product ${productId} viewed by user: ${user?.id}`);

  reply.status(200).send({});
};
