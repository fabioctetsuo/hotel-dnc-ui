"use client";
import { useRouter } from "next/navigation";
import TextField from "@/components/Form/TextField";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
    });

    if (result?.ok) router.push("/");
    else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        className="mt-2"
        required
      />
      <TextField
        id="password"
        name="password"
        label="Senha"
        type="password"
        className="mt-2"
        required
      />
      <Button appearance="primary" className="mt-2" type="submit">
        Continuar
      </Button>
    </form>
  );
};

export default LoginForm;
