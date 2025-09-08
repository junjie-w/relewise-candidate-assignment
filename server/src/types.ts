export type HealthStatus = 'up' | 'down';

export type HealthResponse = { 
  status: HealthStatus;
  error?: string;
};

export type User = { id: string | null } | null | undefined;

export type TrackProductViewRequest = {
  user: User;
  productId: string;
};

export type Product = {
  id: string;
  name: string;
};

export type SearchInput = {
  term: string;
  languageCode: string;
};

export type SearchRequest = {
  user: User;
  search: SearchInput;
};

export type SearchResponse = {
  products: Product[];
};
