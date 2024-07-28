import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProfile } from "@/app/api/users/route";
import Link from "@/components/Link";
import BookingHotelForm from "@/containers/Hotels/BookingHotelForm";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";
import { User } from "../../../types/user";
import { getFormattedDate } from "@/helpers/getFormattedDate";

type ParamsType = {
  id: string;
};

type PageProps = {
  params: ParamsType;
};

const PerfilPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = await getProfile();

  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section className="w-full">
        <Link href="/">Voltar</Link>
      </section>
      <section className="flex flex-col mt-2 md:flex-row">
        <article className="w-full">
          <h1 className="font-bold text-4xl">Meu perfil</h1>
          <div className="mt-4 flex flex-col justify-center items-center">
            <Image
              src={user.avatar ?? "/default-shadow-profile.jpg"}
              alt={`Foto de perfil do anfitriao ${user.name}`}
              width={300}
              height={300}
              className="rounded-full w-36 h-36 object-cover"
            />
            <div className="flex flex-col mt-4 justify-center">
              <span>
                Na DNC hotel desde {new Date(user.createdAt).getFullYear()}
              </span>
            </div>
          </div>
          <hr className="my-6" />
          <div className="mt-4 flex flex-col justify-between font-bold lg:flex-row">
            <span>Endereço</span>
            <span>{user.name}</span>
          </div>
          <div className="mt-4 flex flex-col justify-between font-bold lg:flex-row">
            <span>Sobre este espaço</span>
            <span>{user.email}</span>
          </div>
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl ml-4 p-8 flex flex-col">
          <span className="flex text-2xl font-bold">Reserva mais recente</span>
          <div className="flex w-full mt-10">
            <Image
              src={user.lastReservation.hotel.image ?? "/default-hotel.jpg"}
              alt={`Foto do ${user.lastReservation.hotel.name}`}
              width={300}
              height={300}
              className="rounded-lg w-32 h-32 object-cover"
            />
            <div className="w-full flex flex-col justify-between  ml-4">
              <b>{user.lastReservation.hotel.name}</b>
              <div>
                <div className="mt-2 flex flex-col justify-between font-bold lg:flex-row">
                  <span>Sobre este espaço</span>
                  <span>{user.lastReservation.status}</span>
                </div>
                <div className="mt-2 flex flex-col justify-between font-bold lg:flex-row">
                  <span>Check-in</span>
                  <span>{getFormattedDate(user.lastReservation.checkIn)}</span>
                </div>
                <div className="mt-2 flex flex-col justify-between font-bold lg:flex-row">
                  <span>Check-out</span>
                  <span>{getFormattedDate(user.lastReservation.checkOut)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <BookingHotelForm hotel={hotel} /> */}
        </article>
      </section>
    </div>
  );
};

export default PerfilPage;
