import { HotelType } from "./hotel";
import { User } from "./user";

export type ReservationStatusType = "PENDING" | "APPROVED" | "CANCELLED";

export type ReservationType = {
  id: number;
  userId: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  total: number;
  status: ReservationStatusType;
  createdAt: string;
  updatedAt: string;
  hotel: HotelType;
  user: User;
};
