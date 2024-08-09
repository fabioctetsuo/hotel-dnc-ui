import Image from "next/image";
import Link from "next/link";
import DetailRow from "../DetailContainer/DetailRow";
import { HotelType } from "../../../types/hotel";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";

type HotelListItemProps = {
  hotel: HotelType;
};

export const HotelListItem = ({ hotel }: HotelListItemProps) => {
  return (
    <Link
      href={`/minhas-hospedagens/${hotel.id}/reservas`}
      className="flex w-full mt-5 md:mt-0"
    >
      <Image
        src={hotel.image ?? "/default-hotel.jpg"}
        alt={`Foto do ${hotel.name}`}
        width={300}
        height={300}
        className="rounded-lg w-32 h-32 object-cover"
      />
      <div className="w-full flex flex-col justify-between ml-4">
        <b>{hotel.name}</b>
        <div>
          <DetailRow
            title="Endereço"
            description={hotel.address}
            className="mt-4"
          />
          <DetailRow
            title="Preço"
            description={getFormattedPrice(hotel.price)}
            className="mt-4"
          />
        </div>
      </div>
    </Link>
  );
};

export default HotelListItem;
