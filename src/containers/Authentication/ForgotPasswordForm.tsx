"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import TextField from "@/components/Form/TextField";
import Button from "@/components/Button";
import { forgotPassword } from "@/app/api/auth/recover-password/route";
import Alert from "@/components/Alert";

const initialState = {
  message: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      appearance="primary"
      className="mt-2"
      type="submit"
      disabled={pending}
    >
      Enviar e-mail
    </Button>
  );
};

const ForgotPasswordForm = () => {
  const [state, formAction] = useFormState(forgotPassword, initialState);

  return (
    <form className="w-full flex flex-col items-center" action={formAction}>
      {state?.message && <Alert type="danger">{state?.message}</Alert>}
      <Image
        src="/forgot-password.svg"
        width={200}
        height={131}
        alt="Ilustração de esqueci minha senha"
      />
      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        className="mt-2"
        required
      />
      <SubmitButton />
    </form>
  );
};

export default ForgotPasswordForm;
