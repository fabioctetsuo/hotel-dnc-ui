"use client";
import TextField from "@/components/Form/TextField";
import ImageField from "@/components/Form/ImageField";
import RadioGroup from "@/components/Form/RadioGroup";
import Button from "@/components/Button";
import { signup } from "@/app/api/auth/signup/route";
import { updateUser } from "@/app/api/users/route";

type UserFormProps = {
  user?: {
    email: string;
    name: string;
    image?: string | null;
  };
};

const UserForm = ({ user }: UserFormProps) => {
  return (
    <form className="w-full" action={user ? updateUser : signup}>
      <ImageField
        label="Selecionar foto"
        id="avatar"
        name="avatar"
        defaultValue={user?.image as string}
      />
      <TextField
        id="name"
        name="name"
        label="Nome completo"
        type="text"
        className="mt-2"
        defaultValue={user?.name}
        required
      />
      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        defaultValue={user?.email}
        className="mt-2"
        required
      />
      {!user && (
        <>
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
        </>
      )}
      <Button appearance="primary" className="mt-2" type="submit">
        Cadastrar
      </Button>
    </form>
  );
};

export default UserForm;
