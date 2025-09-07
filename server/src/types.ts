export type HealthResponse = { status: string };

export type User = { id: string | null } | null | undefined;

export type TrackProductViewRequest = {
  user: User;
  productId: string;
};
