import { getStatusDescription } from "@/helpers/dictionary/status";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { ReservationType } from "../../../types/reservation";
import Image from "next/image";
import Link from "next/link";
import DetailRow from "../DetailContainer/DetailRow";

type ReservationListItemProps = {
  reservation: ReservationType;
};

export const ReservationListItem = ({
  reservation,
}: ReservationListItemProps) => {
  return (
    <Link
      href={`/reservas/${reservation.id}`}
      className="flex w-full mt-5 md:mt-0"
    >
      <Image
        src={reservation.hotel.image ?? "/default-hotel.jpg"}
        alt={`Foto do ${reservation.hotel.name}`}
        width={300}
        height={300}
        className="rounded-lg w-32 h-32 object-cover"
      />
      <div className="w-full flex flex-col justify-between ml-4">
        <b>{reservation.hotel.name}</b>
        <div>
          <DetailRow
            title="Status"
            description={getStatusDescription(reservation.status)}
            className="mt-1"
          />
          <DetailRow
            title="Check-in"
            description={getFormattedDate(reservation.checkIn)}
            className="mt-1"
          />
          <DetailRow
            title="Check-out"
            description={getFormattedDate(reservation.checkOut)}
            className="mt-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default ReservationListItem;
