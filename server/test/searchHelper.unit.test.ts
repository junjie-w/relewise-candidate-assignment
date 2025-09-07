import { test, describe } from 'node:test';
import assert from 'node:assert';
import { searchProducts } from '../src/helpers/search.js';
import { mockProducts } from '../src/data/mockProducts.js';

describe('searchProducts function', () => {
  test('should return products matching search term by name or id', () => {
    const results = searchProducts(mockProducts, 'tea');
    
    assert.ok(Array.isArray(results));
    assert.strictEqual(results.length, 8);
    
    results.forEach(product => {
      const nameMatch = product.name.toLowerCase().includes('tea');
      const idMatch = product.id.toLowerCase().includes('tea');
      assert.ok(nameMatch || idMatch);
    });
  });

  test('should be case insensitive', () => {
    const resultsLower = searchProducts(mockProducts, 'tea');
    const resultsUpper = searchProducts(mockProducts, 'TEA');
    
    assert.deepStrictEqual(resultsLower, resultsUpper);
  });

  test('should return empty array for non-matching search term', () => {
    const results = searchProducts(mockProducts, 'something');
    
    assert.ok(Array.isArray(results));
    assert.strictEqual(results.length, 0);
  });

  test('should return empty array for empty search term', () => {
    const results = searchProducts(mockProducts, '');
    
    assert.ok(Array.isArray(results));
    assert.strictEqual(results.length, 0);
  });
});
