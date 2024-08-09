"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ReservationType } from "../../../../types/reservation";
import { useEffect, useState } from "react";

type UserDetailProps = {
  reservation: ReservationType;
};

const UserDetail = ({ reservation }: UserDetailProps) => {
  const [showUserDetail, setShowUserDetail] = useState(false);
  const { data } = useSession();
  const user =
    data?.user.role === "USER" ? reservation.hotel.owner : reservation.user;

  useEffect(() => {
    if (data?.user?.role) setShowUserDetail(true);
  }, [data?.user?.role]);

  if (!showUserDetail) {
    return (
      <div className="max-w-sm w-full mt-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-300 h-14 w-14"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex">
      <Image
        src={user.avatar ?? "/default-shadow-profile.jpg"}
        alt={`Foto de perfil do anfitriao ${user.name}`}
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="flex flex-col ml-2 justify-center">
        <b>
          {data?.user.role === "USER" ? "Anfitriã(o)" : "Hóspede"}: {user.name}
        </b>
        <span>Desde {new Date(user.createdAt).getFullYear()}</span>
      </div>
    </div>
  );
};

export default UserDetail;
