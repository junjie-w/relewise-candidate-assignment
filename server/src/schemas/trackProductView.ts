import { FastifySchema } from 'fastify';

export const trackProductViewSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['productId'],
    properties: {
      user: {
        oneOf: [
          {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] }
            },
            additionalProperties: false
          },
          { type: 'null' }
        ]
      },
      productId: { 
        type: 'string',
        minLength: 1
      }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    400: {
      type: 'object',
      required: ['error'],
      properties: {
        error: { type: 'string' }
      },
      additionalProperties: false
    }
  }
};
