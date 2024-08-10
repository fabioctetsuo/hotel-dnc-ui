"use client";
import TextField from "@/components/Form/TextField";
import MaskedInput from "@/components/Form/MaskedInput";
import Button from "@/components/Button";
import { createHotel } from "@/app/api/hotels/actions";
import { useFormState, useFormStatus } from "react-dom";
import ImageField from "@/components/Form/ImageField";

const initialState = {
  message: "",
};

const CreateHotelForm = () => {
  const [state, formAction] = useFormState(createHotel, initialState);
  const { pending } = useFormStatus();

  return (
    <form className="w-full" action={formAction}>
      <ImageField label="Selecionar foto" id="image" name="image" />
      <TextField
        id="name"
        name="name"
        label="Nome da hospedagem"
        type="text"
        className="mt-2"
        required
      />
      <TextField
        id="description"
        name="description"
        label="Descrição"
        type="text"
        className="mt-2"
        required
      />
      <MaskedInput
        id="price"
        name="price"
        label="Valor da diária"
        className="mt-2"
        required
      />
      <TextField
        id="address"
        name="address"
        label="Endereço"
        type="text"
        className="mt-2"
        required
      />
      <Button
        appearance="primary"
        className="mt-2"
        type="submit"
        disabled={pending}
      >
        Continuar
      </Button>
    </form>
  );
};

export default CreateHotelForm;
