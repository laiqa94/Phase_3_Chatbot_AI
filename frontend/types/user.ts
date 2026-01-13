export type User = {
  id: string;
  email: string;
  displayName?: string;
};

export type Session = {
  accessToken: string;
  expiresAt?: string;
  user: User;
};
