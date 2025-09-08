import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.log.error(error);

  // NOTE: 400 validation errors are handled automatically by Fastify schema validation
  if (error.validation) {
    return reply.status(400).send({
      error: error.message
    });
  }

  // TODO: For now, I will just return 500 for demo purpose
  // In a production app, other error types should be handled here (401, 403, 404, 503...etc)
  return reply.status(500).send({ error: 'Internal server error' });
};
