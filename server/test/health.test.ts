import { test, describe } from 'node:test';
import assert from 'node:assert';
import Fastify from 'fastify';
import { healthRoutes } from '../src/routes/health.js';

describe('Health Endpoint', () => {
  test('GET / should return status up', async () => {
    const fastify = Fastify({ logger: false });
    await fastify.register(healthRoutes);
    
    const response = await fastify.inject({
      method: 'GET',
      url: '/'
    });
    
    const body = response.json();
    
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(body.status, 'up');
  });
});
