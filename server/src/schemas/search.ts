import { FastifySchema } from 'fastify';

export const searchSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['search', 'user'],
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
      search: {
        type: 'object',
        required: ['term', 'languageCode'],
        properties: {
          term: { 
            type: 'string',
            minLength: 1
          },
          languageCode: {
            type: 'string',
            // NOTE: assuming only these languages are supported for now
            enum: ['en', 'da', 'de']
          }
        },
        additionalProperties: false
      }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      required: ['products'],
      properties: {
        products: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' }
            },
            additionalProperties: false
          }
        }
      },
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
