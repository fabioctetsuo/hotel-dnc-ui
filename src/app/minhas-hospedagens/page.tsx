import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getHotelByOwner } from "@/app/api/hotels/actions";
import { HotelType } from "../../../types/hotel";
import { ReservationType } from "../../../types/reservation";
import HotelListItem from "@/components/HotelListItem";
import Link from "@/components/Link";

const MinhasHospedagens = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotels = await getHotelByOwner();

  return (
    <div className="py-20">
      <section className="w-full my-4">
        <Link href="/perfil">Voltar</Link>
      </section>
      <h1 className="font-bold text-4xl">Minhas hospedagens</h1>
      <section className="flex justify-end my-8">
        <Link href="/minhas-hospedagens/cadastrar">Nova hospedagem</Link>
      </section>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 mt-4">
        {hotels.map((hotel) => (
          <HotelListItem hotel={hotel} key={hotel.id} />
        ))}
      </section>
    </div>
  );
};

export default MinhasHospedagens;
