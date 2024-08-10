import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getHotelById } from "@/app/api/hotels/actions";
import Link from "@/components/Link";
import BookingHotelForm from "@/containers/Hotels/BookingHotelForm";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";
import { HotelType } from "../../../../types/hotel";
import DetailContainer from "@/components/DetailContainer";

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
    <DetailContainer
      title={hotel.name}
      image={{
        src: hotel.image ? hotel.image : "/default-hotel.jpg",
        alt: `Foto do hotel ${hotel.name}`,
      }}
      asideContainer={{
        title: <>{getFormattedPrice(hotel.price)}&nbsp;noite</>,
        children: <BookingHotelForm hotel={hotel} />,
      }}
    >
      <>
        <div className="mt-4 flex">
          <Image
            src={hotel.owner.avatar ?? "/default-shadow-profile.jpg"}
            alt={`Foto de perfil do anfitriao ${hotel.owner.name}`}
            width={56}
            height={56}
            className="rounded-full w-14 h-14 object-cover"
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
      </>
    </DetailContainer>
  );
};

export default HotelsPage;
