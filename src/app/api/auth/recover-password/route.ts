"use server";
import axios from "@/api";
import { redirect } from "next/navigation";

export async function forgotPassword(prevState: any, formData: FormData) {
  const payload = { email: formData.get("email") };

  try {
    await axios.post("/auth/forgot-password", payload);
  } catch {
    return { message: "Tente novamente mais tarde" };
  }

  redirect("/recuperar-senha");
}

export async function recoverPassword(prevState: any, formData: FormData) {
  const payload = {
    token: formData.get("token"),
    password: formData.get("password"),
  };

  try {
    await axios.patch("/auth/reset-password", payload);
    return { result: "ok" };
  } catch (error: any) {
    if (error?.status === 401) return { message: "Ação não autorizada" };
    return { message: "Tente novamente mais tarde" };
  }
}
