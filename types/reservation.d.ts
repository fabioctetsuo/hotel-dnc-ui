import { HotelType } from "./hotel";

export type ReservationStatusType = "PENDING" | "APPROVED" | "CANCELED";

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
};
