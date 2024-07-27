import Image from "next/image";
import { HotelType } from "../../../types/hotel";
import Link from "next/link";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";

type HotelCardProps = {
  hotel: HotelType;
};

export const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <Link href={`/hotel/${hotel.id}`}>
      <article className="flex flex-col">
        <div className="w-64 h-64">
          <Image
            src={hotel.image ? hotel.image : "/default-hotel.jpg"}
            width={250}
            height={250}
            quality={100}
            alt=""
            className="object-cover rounded-3xl"
          />
        </div>
        <h3 className="font-bold mt-2">{hotel.name}</h3>
        <span className="mt-2">{hotel.owner.name}</span>
        <span className="mt-2">
          <b>{getFormattedPrice(hotel.price)}</b> noite
        </span>
      </article>
    </Link>
  );
};

export default HotelCard;
