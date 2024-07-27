import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getHotelById } from "@/app/api/hotels/route";
import Link from "@/components/Link";
import BookingHotelForm from "@/containers/Hotels/BookingHotelForm";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";

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

const HotelsPage = async ({ params }: PageProps) => {
  const session = await getServerSession();

  if (!session?.user) redirect("/login");

  const hotel: HotelType = await getHotelById(Number(params.id));

  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section className="w-full">
        <Link href="/">Voltar</Link>
      </section>
      <div className="relative w-full h-80 mt-2">
        <Image
          quality={100}
          src={hotel.image ? hotel.image : "/default-hotel.jpg"}
          alt={`Foto do hotel ${hotel.name}`}
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <section className="flex mt-2">
        <article className="w-full">
          <h1 className="font-bold text-4xl">{hotel.name}</h1>
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
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{hotel.address}</span>
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Sobre este espaço</h3>
            <span className="mt-4">{hotel.description}</span>
          </div>
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl ml-4 p-8 flex flex-col">
          <span className="flex text-2xl font-light">
            <b className="font-bold">{getFormattedPrice(hotel.price)}</b>
            &nbsp;noite
          </span>
          <BookingHotelForm hotel={hotel} />
        </article>
      </section>
    </div>
  );
};

export default HotelsPage;
