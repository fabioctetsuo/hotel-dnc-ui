"use client";
import Link from "@/components/Link";
import { useSession } from "next-auth/react";
import { HotelType } from "../../../../types/hotel";

type BackButtonProps = {
  hotel: HotelType;
};

const BackButton = ({ hotel }: BackButtonProps) => {
  const { data } = useSession();

  return (
    <Link
      href={
        data?.user.role === "USER"
          ? "/reservas"
          : `/minhas-hospedagens/${hotel.id}/reservas`
      }
      className="block"
    >
      Voltar para minhas reservas
    </Link>
  );
};

export default BackButton;
