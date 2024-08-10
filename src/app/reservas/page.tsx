import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Pagination from "@/components/Pagination";
import { getHotels } from "@/app/api/hotels/actions";
import { HotelType } from "../../../types/hotel";
import HotelCard from "@/containers/Hotels/HotelCard";
import { getReservationsByUser } from "../api/reservations/actions";
import ReservationListItem from "@/components/ReservationListItem";
import { STATUS } from "@/helpers/dictionary/status";
import { ReservationType } from "../../../types/reservation";

type GetHotelsType = {
  total: number;
  page: number;
  per_page: number;
  data: HotelType[];
};

type ReducedReservations = {
  pending: ReservationType[];
  approved: ReservationType[];
  cancelled: ReservationType[];
};

const ReservasPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservations = await getReservationsByUser();

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
      <h1 className="font-bold text-4xl">Minhas reservas</h1>
      <span className="flex text-2xl font-bold mt-12">Próximas reservas</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <ReservationListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas anteriores</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <ReservationListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas canceladas</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {cancelled.map((reservation) => (
          <ReservationListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
    </div>
  );
};

export default ReservasPage;
