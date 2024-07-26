"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import TextField from "@/components/Form/TextField";
import Button from "@/components/Button";
import { recoverPassword } from "@/app/api/auth/recover-password/route";
import Alert from "@/components/Alert";
import Link from "@/components/Link";
import { ChangeEvent, useState } from "react";
import RecoverPasswordFeedback from "./RecoverPasswordFeedback";

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
      Alterar senha
    </Button>
  );
};

const ForgotPasswordForm = () => {
  const [state, formAction] = useFormState(recoverPassword, initialState);
  const [passwordMatches, setPasswordMatches] = useState(true);
  const passwordMatchError = passwordMatches ? null : "Senhas devem ser iguais";

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const form = document.getElementById(
      "recover-password-form"
    ) as HTMLFormElement;
    const confirmPassword = (event.target as HTMLInputElement).value;
    const password = form.password.value;
    setPasswordMatches(confirmPassword === password);
  };

  return (
    <>
      {state?.result ? (
        <RecoverPasswordFeedback />
      ) : (
        <>
          <form
            id="recover-password-form"
            className="w-full flex flex-col items-center"
            action={formAction}
          >
            {state?.message && <Alert type="danger">{state?.message}</Alert>}
            <Image
              src="/recover-password.svg"
              width={172}
              height={167}
              alt="Ilustração de recuperar minha senha"
            />
            <TextField
              id="token"
              name="token"
              label="Token de confirmação"
              type="text"
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
            <TextField
              id="confirm-passwod"
              name="confirm-password"
              label="Confirme a senha"
              type="password"
              className="mt-2"
              onChange={handleConfirmPasswordChange}
              error={passwordMatchError}
              required
            />
            <SubmitButton />
          </form>
          <span className="my-2">ou</span>
          <Link href="/login" className="my-2">
            Cancelar
          </Link>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
