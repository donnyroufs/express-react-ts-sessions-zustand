export type User = {
  id: number;
  username?: string;
  password?: string;
};

export type ResponseAuthUser = {
  isValid: boolean;
  user: User | null;
};