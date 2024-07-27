"use server";
import axios from "@/api";
import { cookies } from "next/headers";

export async function getHotels(page: number, limit: number) {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

export async function getHotelById(hotelId: number) {
  const accessToken = cookies().get("access_token")?.value;

  const { data } = await axios.get(`/hotels/${hotelId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}
