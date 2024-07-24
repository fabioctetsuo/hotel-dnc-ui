"use client";
import TextField from "@/components/Form/TextField";
import Button from "@/components/Button";

const LoginForm = () => {
  return (
    <form className="w-full" onSubmit={console.log}>
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
