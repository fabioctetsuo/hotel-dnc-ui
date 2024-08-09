"use client";
import { getFormattedDetailedDate } from "@/helpers/getFormattedDate";
import {
  ReservationStatusType,
  ReservationType,
} from "../../../types/reservation";
import Button from "@/components/Button";
import Image from "next/image";
import DetailRow from "../DetailContainer/DetailRow";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";
import { updateReservationStatus } from "@/app/api/reservations/route";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ReservationOwnerListItemProps = {
  reservation: ReservationType;
};

export const ReservationOwnerListItem = ({
  reservation,
}: ReservationOwnerListItemProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReservationStatus =
    (id: number, status: ReservationStatusType) => async () => {
      try {
        setLoading(true);
        await updateReservationStatus(id, status);
        router.push(`/reservas/${id}`);
      } catch (error) {
        setLoading(false);
      }
    };

  return (
    <>
      <div className="flex w-full mt-5 md:mt-0">
        <div className="max-w-32 h-32">
          <Image
            src={reservation.user.avatar ?? "/default-shadow-profile.jpg"}
            alt={`Foto do ${reservation.hotel.name}`}
            width={500}
            height={500}
            className="rounded-lg h-full object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-between ml-4">
          <DetailRow
            title="Solicitante"
            description={reservation.user.name}
            className="mt-1"
          />
          <DetailRow
            title="Valor"
            description={getFormattedPrice(Math.abs(reservation.total))}
            className="mt-1"
          />
          <div className="my-1">
            <span>{`${getFormattedDetailedDate(
              reservation.checkIn
            )} - ${getFormattedDetailedDate(reservation.checkOut)}`}</span>
          </div>
          {reservation.status === "PENDING" && (
            <div className="flex">
              <Button
                onClick={handleReservationStatus(reservation.id, "APPROVED")}
                disabled={loading}
              >
                Aprovar
              </Button>
              <Button
                onClick={handleReservationStatus(reservation.id, "CANCELLED")}
                disabled={loading}
                appearance="secondary"
              >
                Negar
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationOwnerListItem;
