import { getReservationById } from "@/app/api/reservations/actions";
import DetailContainer from "@/components/DetailContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getStatusDescription } from "@/helpers/dictionary/status";
import { ReservationType } from "../../../../types/reservation";
import DetailRow from "@/components/DetailContainer/DetailRow";
import { getFormattedPrice } from "@/helpers/getFormattedPrice";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import UserDetail from "./UserDetail";
import BackButton from "./BackButton";

type ParamsType = {
  id: string;
};

type PageProps = {
  params: ParamsType;
};

const DetalhesReservaPage = async ({ params }: PageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservation: ReservationType = await getReservationById(
    Number(params.id)
  );
  const { hotel } = reservation;

  return (
    <DetailContainer
      title={`Sua reserva na ${hotel.name}`}
      image={{
        src: hotel.image ?? "/default-hotel.jpg",
        alt: `Foto do hotel ${hotel.name}`,
      }}
      previousPage="/reservas"
      asideContainer={{
        title: "Informações da estadia",
        children: (
          <div>
            <DetailRow
              title="Status"
              description={getStatusDescription(reservation.status)}
              className="mt-2"
            />
            <DetailRow
              title="Código de confirmação"
              description={`${reservation.id}`}
              className="mt-2"
            />
            <DetailRow
              title="Valor total"
              description={getFormattedPrice(Math.abs(reservation.total))}
              className="mt-2"
            />
            <DetailRow
              title="Check-in"
              description={getFormattedDate(reservation.checkIn)}
              className="mt-2"
            />
            <DetailRow
              title="Check-out"
              description={getFormattedDate(reservation.checkOut)}
              className="mt-2"
            />
            <hr className="my-10" />
            <BackButton hotel={reservation.hotel} />
          </div>
        ),
      }}
    >
      <>
        <UserDetail reservation={reservation} />
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

export default DetalhesReservaPage;
