"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/Button";
import CalendarField from "@/components/Form/CalendarField";

import { HotelType } from "../../../types/hotel";
import { ChangeEvent, useState } from "react";
import { bookHotelById } from "@/app/api/reservations/route";
import TextField from "@/components/Form/TextField";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";

const initialState = {
  message: "",
};

type BookingHotelFormType = {
  hotel: HotelType;
};

function getNightsInHotel(checkin: string | null, checkout: string | null) {
  if (!checkin || !checkout) return 1;
  // Converte as datas para objetos Date
  const start = new Date(checkin).getTime();
  const end = new Date(checkout).getTime();

  // Calcula a diferença em milissegundos
  const millisecondsDiff = end - start;

  // Converte a diferença de milissegundos para dias
  const nights = millisecondsDiff / (1000 * 60 * 60 * 24);

  return Math.floor(nights); // Arredonda para baixo
}

export const BookingHotelForm = ({ hotel }: BookingHotelFormType) => {
  const [state, formAction] = useFormState(bookHotelById, initialState);
  const { pending } = useFormStatus();

  const today = new Date().toISOString().substring(0, 10);
  const [checkinDate, setCheckinDate] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<string | null>(null);

  const estimatedValue =
    getNightsInHotel(checkinDate, checkoutDate) * hotel.price;

  return (
    <form action={formAction} className="flex w-full flex-col mt-6">
      <TextField
        id="hotelId"
        name="hotelId"
        defaultValue={hotel.id}
        label="ID do hotel"
        readOnly
        hidden
      />
      <div className="flex w-full">
        <CalendarField
          id="checkIn"
          name="checkIn"
          label="Data de check-in"
          className="w-full mr-2"
          min={today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckinDate(event.target.value);
          }}
        />
        <CalendarField
          id="checkOut"
          name="checkOut"
          label="Data de check-out"
          className="w-full"
          min={checkinDate ?? today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckoutDate(event.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-between font-bold  mt-6">
        <span>Valor total</span>
        <span>{getFormattedPrice(estimatedValue)}</span>
      </div>
      <hr className="my-10" />
      <Button appearance="primary" type="submit" disabled={pending}>
        Reservar
      </Button>
    </form>
  );
};

export default BookingHotelForm;
