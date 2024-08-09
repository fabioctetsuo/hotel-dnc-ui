"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { deleteCookies } from "@/app/api/auth/signup/route";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const session = useSession();
  const user = session.data?.user;

  const headerStyle = user ? "justify-between px-20" : "justify-center px-0";
  const menuStyle = showMenu ? "" : "sr-only";

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      deleteCookies();
      setShowMenu(false);
    });
  };

  return (
    <header
      className={`w-full flex py-5 border-b border-b-light-grey-400 ${headerStyle}`}
    >
      <Link href="/">
        <Image
          src="/logo-dnc.png"
          alt="Next Away logo"
          width={80}
          height={30}
        />
      </Link>
      {user && (
        <div>
          <div
            className="flex border border-light-grey-400 py-1 px-2 rounded-full cursor-pointer"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <Image src="/burger-icon.svg" alt="Menu" width={33} height={33} />
            <Image
              src={user.avatar ?? "/default-shadow-profile.jpg"}
              alt="Menu"
              width={33}
              height={33}
              className="rounded-full w-9 h-9 object-cover ml-2"
            />
          </div>
          {showMenu && (
            <nav
              className={`absolute px-8 py-6 bg-white rounded-2xl shadow-lg right-10 mt-2 ${menuStyle}`}
            >
              <ul className="font-medium">
                <li>
                  <Link href="/perfil">Meu perfil</Link>
                </li>
                <li className="mt-4">
                  <Link href="/reservas">Minhas reservas</Link>
                </li>
                <hr className="my-4" />
                <li>
                  <Button
                    appearance="secondary"
                    className="text-left py-0 px-0"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
