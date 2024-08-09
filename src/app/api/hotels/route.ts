"use server";
import axios from "@/api";
import { cookies } from "next/headers";
import { HotelType } from "../../../../types/hotel";
import { redirect } from "next/navigation";
import { File } from "buffer";

export async function getHotels(page: number, limit: number) {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export async function getHotelById(hotelId: number): Promise<HotelType> {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get(`/hotels/${hotelId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export async function getHotelByOwner(): Promise<HotelType[]> {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get("/hotels/owner", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export async function createHotel(prevState: any, formData: FormData) {
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) redirect("/login");

  try {
    const price = formData.get("price") as string;
    const image = formData.get("image") as unknown as File;

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(
        price
          .replace("R$", "")
          .replace(/\s/g, "")
          .replaceAll(".", "")
          .replaceAll(",", ".")
      ),
      address: formData.get("address"),
    };

    const { data } = await axios.post("/hotels", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (image?.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image as Blob);

      await axios.patch(`/hotels/image/${data.id}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    return { ...prevState, message: `Erro ao cadastrar o hotel` };
  }

  redirect(`/minhas-hospedagens`);
}
