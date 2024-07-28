"use server";
import axios from "@/api";
import decryptToken from "@/helpers/decryptToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getReservationsByUser } from "../reservations/route";
import { getHotelById } from "../hotels/route";
import { Profile } from "../../../../types/user";

export async function getProfile(): Promise<Profile> {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { id } = decryptToken(accessToken);

  const { data } = await axios.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [lastReservation] = await getReservationsByUser();
  const hotel = await getHotelById(lastReservation.hotelId);

  return { lastReservation: { ...lastReservation, hotel }, ...data };
}
