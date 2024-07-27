"use server";
import axios from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
