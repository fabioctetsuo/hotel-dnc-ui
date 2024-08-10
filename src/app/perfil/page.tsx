import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProfile } from "@/app/api/users/actions";
import Link from "@/components/Link";
import ReservationListItem from "@/components/ReservationListItem";
import DetailContainer from "@/components/DetailContainer";
import DetailRow from "@/components/DetailContainer/DetailRow";
import { Profile } from "../../../types/user";
import HotelListItem from "@/components/HotelListItem";

type CommonProps = {
  user: Profile;
};

const RecentReservation = ({ user }: CommonProps) => {
  return (
    <>
      {user.lastReservation ? (
        <ReservationListItem reservation={user.lastReservation} />
      ) : (
        <div>Nao ha reservas ainda</div>
      )}

      <Link href="/reservas" className="block mt-10">
        Ver todas as reservas
      </Link>
    </>
  );
};

const MyHotels = ({ user }: CommonProps) => {
  const allHotels = user.hotels ?? [];
  const recentHotels = [...allHotels].splice(0, 2);
  return (
    <>
      {recentHotels ? (
        recentHotels.map((hotel) => (
          <div key={hotel.id} className="mt-5 first:mt-0">
            <HotelListItem hotel={hotel} />
          </div>
        ))
      ) : (
        <div>Nao ha hospedagens cadastradas</div>
      )}

      <Link href="/minhas-hospedagens" className="block mt-10">
        Ver todas as hospedagens
      </Link>
    </>
  );
};

const PerfilPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = await getProfile();

  const asideContainer =
    user.role === "USER"
      ? {
          title: "Reserva mais recente",
          children: <RecentReservation user={user} />,
        }
      : {
          title: "Minhas hospedagens",
          children: <MyHotels user={user} />,
        };

  return (
    <DetailContainer title="Meu perfil" asideContainer={asideContainer}>
      <>
        <div className="mt-4 flex flex-col justify-center items-center">
          <Image
            src={user.avatar ?? "/default-shadow-profile.jpg"}
            alt={`Foto de perfil do anfitriao ${user.name}`}
            width={300}
            height={300}
            className="rounded-full w-36 h-36 object-cover"
          />
          <div className="flex flex-col mt-4 justify-center">
            <span>
              Na DNC hotel desde {new Date(user.createdAt).getFullYear()}
            </span>
          </div>
        </div>
        <hr className="my-6" />
        <DetailRow title="Nome" description={user.name} className="mt-2" />
        <DetailRow title="E-mail" description={user.email} className="mt-2" />
        <div className="w-full mt-10 ">
          <Link href="/perfil/editar" className="block">
            Editar perfil
          </Link>
        </div>
      </>
    </DetailContainer>
  );
};

export default PerfilPage;
