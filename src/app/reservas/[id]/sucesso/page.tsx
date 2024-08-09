import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "@/components/Link";
import BookingHotelForm from "@/containers/Hotels/BookingHotelForm";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";
import { getReservationById } from "@/app/api/reservations/route";
import {
  ReservationStatusType,
  ReservationType,
} from "../../../../../types/reservation";
import { getFormattedDate } from "@/helpers/getFormattedDate";

type HotelType = {
  id: number;
  name: string;
  description: string;
  address: string;
  image?: string | null;
  price: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
    avatar: string | null;
    createdAt: string;
  };
};

type ParamsType = {
  id: string;
};

type PageProps = {
  params: ParamsType;
};

const ReservationSuccessPage = async ({ params }: PageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservation: ReservationType = await getReservationById(
    Number(params.id)
  );
  const { hotel } = reservation;

  return (
    <div className="flex flex-col w-full max-w-lg my-24 px-8">
      <section className="w-full">
        <Link href="/reservas">Voltar</Link>
      </section>
      <section className="flex mt-2 flex-col">
        <article className="w-full">
          <h1 className="font-bold text-4xl">
            Sua solicitação de reserva na {hotel.name} foi enviada!
          </h1>
          <div className="mt-4 flex">
            <Image
              src={hotel.owner.avatar ?? "/default-shadow-profile.jpg"}
              alt={`Foto de perfil do anfitriao ${hotel.owner.name}`}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div className="flex flex-col ml-2 justify-center">
              <b>Anfitriã(o): {hotel.owner.name}</b>
              <span>Desde {new Date(hotel.owner.createdAt).getFullYear()}</span>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">
              Enviamos a solicitação de reserva para o anfitrião!
            </h3>
            <span className="mt-4">
              Estamos aguarde o anfitrião aprovar a sua reserva na {hotel.name},
              em breve você receberá atualizações sobre a sua solicitação.
            </span>
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{hotel.address}</span>
          </div>
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl my-4 p-8 flex flex-col">
          <h3 className="text-2xl font-bold">Informações da estadia</h3>
          <div className="font-bold flex justify-between mt-6">
            <span>Código de confirmação</span>
            <span>{reservation.id}</span>
          </div>
          <div className="font-bold flex justify-between mt-4">
            <span>Valor total</span>
            <span>{getFormattedPrice(Math.abs(reservation.total))}</span>
          </div>
          <div className="font-bold flex justify-between mt-4">
            <span>Check-in</span>
            <span>{getFormattedDate(reservation.checkIn)}</span>
          </div>
          <div className="font-bold flex justify-between mt-4">
            <span>Check-out</span>
            <span>{getFormattedDate(reservation.checkOut)}</span>
          </div>
          <hr className="my-6" />
          <Link href="/reservas" className="text-center">
            Voltar para minhas reservas
          </Link>
        </article>
      </section>
    </div>
  );
};

export default ReservationSuccessPage;
