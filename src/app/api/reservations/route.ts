"use server";
import axios from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHotelById } from "../hotels/route";
import {
  ReservationStatusType,
  ReservationType,
} from "../../../../types/reservation";
import { HotelType } from "../../../../types/hotel";

export async function bookHotelById(prevState: any, formData: FormData) {
  let bookingId;
  try {
    const accessToken = cookies().get("access_token")?.value;
    const payload = {
      hotelId: Number(formData.get("hotelId")),
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
    };
    console.log({ payload });

    const { data } = await axios.post("/reservations", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    bookingId = data.id;
  } catch (error) {
    console.log(error);
    return { ...prevState, message: "Tente novamente mais tarde" };
  }

  redirect(`/reservas/${bookingId}/sucesso`);
}

export async function getReservationById(id: number): Promise<ReservationType> {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get(`/reservations/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const hotel = await getHotelById(data.hotelId);

  return { ...data, hotel };
}

export async function getReservationsByUser(): Promise<ReservationType[]> {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get(`/reservations/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (data.length) {
    const reservations = await Promise.all(
      data.map(async (reservation: ReservationType) => {
        const hotel = await getHotelById(reservation.hotelId);
        return { ...reservation, hotel };
      })
    );

    return reservations;
  }

  return data;
}

export async function getReservationsByHotel(
  hotel: HotelType
): Promise<ReservationType[]> {
  const accessToken = cookies().get("access_token")?.value;
  const { id } = hotel;

  const { data: reservations } = await axios.get(`/reservations/hotel/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (reservations.length) {
    const aggregatedReservations = reservations.map(
      (reservation: ReservationType) => {
        return { ...reservation, hotel };
      }
    );

    return aggregatedReservations;
  }

  return reservations;
}

export async function updateReservationStatus(
  reservationId: number,
  status: ReservationStatusType
) {
  const accessToken = cookies().get("access_token")?.value;
  const payload = { status };

  const { data } = await axios.patch(
    `/reservations/${reservationId}`,
    payload,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return data;
}
