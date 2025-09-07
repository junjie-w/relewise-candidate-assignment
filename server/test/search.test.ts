import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import Fastify, { FastifyInstance } from 'fastify';
import { searchRoutes } from '../src/routes/search.js';

describe('Search Endpoint', () => {
  describe('should return 200 for valid requests', () => {
    let fastify: FastifyInstance;

    beforeEach(async () => {
      fastify = Fastify({ logger: false });
      await fastify.register(searchRoutes);
    });

    test('when user.id, search.term and search.languageCode are all present', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: { id: 'user1' },
          search: {
            term: 'tea',
            languageCode: 'en'
          }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      const body = response.json();
      assert.ok(body.hasOwnProperty('products'));
      assert.ok(Array.isArray(body.products));
      assert.ok(body.products.length === 8);
    });

    test('when user is null', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: null,
          search: {
            term: 'wine',
            languageCode: 'en'
          }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      const body = response.json();
      assert.ok(body.hasOwnProperty('products'));
      assert.ok(Array.isArray(body.products));
      assert.ok(body.products.length === 8);
    });

    test('when user.id is null', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: { id: null },
          search: {
            term: 'beer',
            languageCode: 'en'
          }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      const body = response.json();
      assert.ok(body.hasOwnProperty('products'));
      assert.ok(Array.isArray(body.products));
      assert.ok(body.products.length === 8);
    });
  });

  describe('should return 400 for invalid requests', () => {
    let fastify: FastifyInstance;

    beforeEach(async () => {
      fastify = Fastify({ logger: false });
      await fastify.register(searchRoutes);
    });

    test('when search.term is missing', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: { id: 'user1' },
          search: {
            languageCode: 'en'
          }
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
    });

    test('when search.languageCode is missing', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: { id: 'user1' },
          search: {
            term: 'tea'
          }
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
    });

    test('when search object is missing', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/search',
        payload: {
          user: { id: 'user1' }
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
    });
  });
});
