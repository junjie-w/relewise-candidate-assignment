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
