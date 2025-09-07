import { FastifyRequest, FastifyReply } from 'fastify';

export const getHealth = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // TODO: for now, I will only handle 'up' case here. 
  // Error cases will be caught by the global error handler and should be handled accordingly
  
  reply.status(200).send({ status: 'up' });
};
