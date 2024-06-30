export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Movie {
  description: string;
  id: number;
  genre: string;
  poster: string;
  rating: string;
  release_year: number;
  title: string;
}

export interface Actor {
  name: string;
  photo: string;
}

export interface RootState {
  session: {
    isLogin: boolean;
  };
}
