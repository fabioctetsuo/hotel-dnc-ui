import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Pagination from "@/components/Pagination";
import { getHotels } from "@/app/api/hotels/route";

type HotelType = {
  id: number;
  name: string;
  description: string;
  address: string;
  image?: string | null;
  price: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
    avatar: string | null;
    createdAt: string;
  };
};

type GetHotelsType = {
  total: number;
  page: number;
  per_page: number;
  data: HotelType[];
};

type SearchParams = {
  query: string;
  page: string;
};

type PageProps = {
  searchParams: SearchParams;
};

const LIMIT = 10;

const HotelsPage = async ({ searchParams }: PageProps) => {
  const session = await getServerSession();

  if (!session?.user) redirect("/login");

  const currentPage = Number(searchParams.page ?? 1);

  const { total, per_page, data }: GetHotelsType = await getHotels(
    currentPage,
    LIMIT
  );

  return (
    <div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-20">
        {data.map((hotel) => (
          <article className="flex flex-col" key={hotel.id}>
            <Image
              src={hotel.image ? hotel.image : "/default-hotel.jpg"}
              width={250}
              height={250}
              alt=""
              className="max-w-64 max-h-64 w-64 h-64 object-cover rounded-3xl"
            />
            <h3 className="font-bold mt-2">{hotel.name}</h3>
            <span className="mt-2">{hotel.owner.name}</span>
            <span className="mt-2">
              <b>R$ {hotel.price}</b> noite
            </span>
          </article>
        ))}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / per_page)}
          href="/hotels"
        />
      </section>
    </div>
  );
};

export default HotelsPage;
