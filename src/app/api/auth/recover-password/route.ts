"use server";
import axios from "@/api";
import { redirect } from "next/navigation";

export async function recoverPassword(prevState: any, formData: FormData) {
  const payload = { email: formData.get("email") };

  try {
    await axios.post("/auth/forgot-password", payload);
  } catch {
    return { message: "Tente novamente mais tarde" };
  }

  redirect("/recuperar-senha");
}
