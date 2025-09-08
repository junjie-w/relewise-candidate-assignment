import { FastifyRequest, FastifyReply } from 'fastify';
import { SearchRequest, SearchResponse } from '../types.js';
import { mockProducts } from '../data/mockProducts.js';
import { searchProducts } from '../helpers/search.js';

export const search = async (
  request: FastifyRequest<{ Body: SearchRequest }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, search } = request.body;
  const { term, languageCode } = search;

  request.log.info(`Search request: term="${term}", languageCode="${languageCode}", user="${user?.id}"`);

  const searchResults = searchProducts(mockProducts, term);

  const response: SearchResponse = {
    products: searchResults
  };

  reply.status(200).send(response);
};
