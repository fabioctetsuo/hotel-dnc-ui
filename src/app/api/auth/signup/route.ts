"use server";
import axios from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteCookies() {
  cookies().delete("access_token");
  redirect("/login");
}

export async function signup(formData: FormData) {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const {
    data: { access_token },
  } = await axios.post("/auth/register", payload);

  const avatarFormData = new FormData();
  avatarFormData.append("avatar", formData.get("avatar") as Blob);

  await axios.post("/users/avatar", avatarFormData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  redirect("/login?signup=success");
}
