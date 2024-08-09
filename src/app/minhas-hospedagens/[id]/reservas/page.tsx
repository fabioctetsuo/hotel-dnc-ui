import ReservationOwnerListItem from "@/components/ReservationListItem/Owner";
import { getReservationsByHotel } from "@/app/api/reservations/route";
import { getHotelById } from "@/app/api/hotels/route";
import { STATUS } from "@/helpers/dictionary/status";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReservationType } from "../../../../../types/reservation";
type ReducedReservations = {
  pending: ReservationType[];
  approved: ReservationType[];
  cancelled: ReservationType[];
};

type ParamsType = {
  id: string;
};

type PageProps = {
  params: ParamsType;
};

const ReservasPage = async ({ params }: PageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  console.log({ session });

  const hotel = await getHotelById(Number(params.id));
  const reservations = await getReservationsByHotel(hotel);

  const { pending, approved, cancelled } =
    reservations.reduce<ReducedReservations>(
      (prev, current: ReservationType) => {
        if (current.status === STATUS.PENDING) {
          return { ...prev, pending: [...prev.pending, current] };
        } else if (current.status === STATUS.APPROVED) {
          return { ...prev, approved: [...prev.approved, current] };
        } else if (current.status === STATUS.CANCELLED) {
          return { ...prev, cancelled: [...prev.cancelled, current] };
        }
        return prev;
      },
      { pending: [], approved: [], cancelled: [] }
    );

  return (
    <div className="py-20">
      <h1 className="font-bold text-4xl">{hotel.name}</h1>
      <span className="flex text-2xl font-bold mt-12">
        Solicitações de reservas
      </span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas aprovadas</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas canceladas</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {cancelled.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
    </div>
  );
};

export default ReservasPage;
