type User = {
  username: string;
  password?: string;
};

interface IAuth {
  username: string;
  iat: string;
}

type UserState = {
  user: User | null;
  error: any;
  setUser: (data: User | null) => void;
  login: (event: React.MouseEvent<HTMLButtonElement>, user: User) => void;
  logout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  status: () => void;
  isAuthenticated: () => Boolean;
};
