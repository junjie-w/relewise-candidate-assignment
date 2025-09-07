import { Product } from '../types.js';

/**
 * Search products by term
 * @param products
 * @param searchTerm
 * @returns Filtered array of products
 */
export const searchProducts = (
  products: Product[],
  searchTerm: string,
): Product[] => {
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) {
    return [];
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.id.toLowerCase().includes(term)
  );
  
  return filteredProducts
};
