import { ReservationType } from "./reservation";

export type UserRole = "ADMIN" | "USER";

export type Profile = User & {
  lastReservation: ReservationType;
};

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  createdAt: string;
};
