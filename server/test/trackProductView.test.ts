import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import Fastify from 'fastify';
import { trackProductViewRoutes } from '../src/routes/trackProductView.js';

describe('track-product-view Endpoint', () => {
  describe('should return 200 for valid requests', () => {
    let fastify;

    beforeEach(async () => {
      fastify = Fastify({ logger: false });
      await fastify.register(trackProductViewRoutes);
    });

    test('when user.id is a string', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1',
          user: { id: 'user1' }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {});
    });

    test('when user.id is empty string', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1',
          user: { id: '' }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {});
    });

    test('when user.id is null', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1',
          user: { id: null }
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {});
    });

    test('when user is null', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1',
          user: null
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {});
    });

    test('when user is undefined', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1'
        }
      });
      
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), {});
    });

  });

  describe('should return 400 for invalid requests', () => {
    let fastify;

    beforeEach(async () => {
      fastify = Fastify({ logger: false });
      await fastify.register(trackProductViewRoutes);
    });

    test('when productId is missing', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          user: { id: 'user1' }
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(typeof response.json().error, 'string');
    });

    test('when productId is empty string', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: '',
          user: { id: 'user1' }
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(typeof response.json().error, 'string');
    });

    test('when user has invalid structure', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/track-product-view',
        payload: {
          productId: 'product1',
          user: 'some string'
        }
      });
      
      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(typeof response.json().error, 'string');
    });
  });
});
