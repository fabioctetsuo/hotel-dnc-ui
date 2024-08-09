"use server";
import axios from "@/api";
import decryptToken from "@/helpers/decryptToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getReservationsByUser } from "../reservations/route";
import { getHotelByOwner } from "../hotels/route";
import { Profile } from "../../../../types/user";

export async function getProfile(): Promise<Profile> {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { id } = decryptToken(accessToken);

  const { data } = await axios.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (data.role === "ADMIN") {
    const hotels = await getHotelByOwner();

    return { hotels, ...data };
  } else {
    const [lastReservation] = await getReservationsByUser();

    if (lastReservation) {
      return { lastReservation, ...data };
    }

    return data;
  }
}

export async function updateUser(formData: FormData) {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const { id } = decryptToken(accessToken);
  const avatar = formData.get("avatar");

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  await axios.patch(`/users/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (avatar) {
    const avatarFormData = new FormData();
    avatarFormData.append("avatar", formData.get("avatar") as Blob);

    await axios.post("/users/avatar", avatarFormData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  redirect("/perfil");
}
