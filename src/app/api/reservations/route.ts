"use server";
import axios from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHotelById } from "../hotels/route";
import { ReservationType } from "../../../../types/reservation";

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
  } catch {
    return { ...prevState, message: "Tente novamente mais tarde" };
  }

  redirect(`/reserva/${bookingId}`);
}

export async function getReservationById(id: number) {
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

  return data;
}
