"use client";
import TextField from "@/components/Form/TextField";
import ImageField from "@/components/Form/ImageField";
import RadioGroup from "@/components/Form/RadioGroup";
import Button from "@/components/Button";
import { signup } from "@/app/api/auth/signup/route";

const LoginForm = () => {
  return (
    <form className="w-full" action={signup}>
      <ImageField label="Selecionar foto" id="avatar" name="avatar" />
      <TextField
        id="name"
        name="name"
        label="Nome completo"
        type="text"
        className="mt-2"
        required
      />
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
      <TextField
        id="confirm-password"
        name="confirm-password"
        label="Confirmar senha"
        type="password"
        className="mt-2"
        required
      />
      <RadioGroup
        name="role"
        options={[
          { label: "Sim", id: "user-admin-option", value: "ADMIN" },
          { label: "Não", id: "user-option", value: "USER" },
        ]}
      />
      <Button appearance="primary" className="mt-2" type="submit">
        Cadastrar
      </Button>
    </form>
  );
};

export default LoginForm;
