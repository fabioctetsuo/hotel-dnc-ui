export type HotelType = {
  id: number;
  name: string;
  description: string;
  address: string;
  image?: string | null;
  price: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
    avatar: string | null;
    createdAt: string;
  };
};
