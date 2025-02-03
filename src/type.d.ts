export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  username: string;
  id: string;
  role: "USER" | "ADMIN";
  image?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errors: Array<string>;
  loading: boolean;
  signIn: (value: UserLogin) => Promise<void>;
  logout: () => void;
}

export interface Users {
  id: string;
  username: string;
  image: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export type Oferts = {
  price: number;
  id: string;
  description: string;
  createdAt: string;
};

export type Desserts = {
  price: number;
  id: string;
  description: string;
  imagen: string;
  createdAt: string;
};

export type Gastronomics = {
  price: number;
  id: string;
  description: string;
  imagen: string;
  createdAt: string;
};

export type Drinks = {
  price: number;
  id: string;
  name: string;
  imagen: string;
  createdAt: string;
};

export type Snacks = {
  price: number;
  id: string;
  name: string;
  imagen: string;
  createdAt: string;
};

export type Gallery = {
  id: string;
  description: string;
  imagen: string;
  createdAt: string;
};

export type Events = {
  id: string;
  description: string;
  imagen: string;
  createdAt: string;
};

export interface Order {
  createdAt: string;
  id: string;
  totalAmount: number;
  pending: boolean;
  user: Users;
  _count: {
    orderItems: number;
  };
}

export interface OrderItem {
  id: string;
  createdAt: string;
  price: number;
  quantity: number;
  ofert: Oferts;
  gastronomic: Gastronomics;
  dessert: Desserts;
}
