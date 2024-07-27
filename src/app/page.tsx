import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Pagination from "@/components/Pagination";
import { getHotels } from "@/app/api/hotels/route";
import { HotelType } from "../../types/hotel";
import HotelCard from "@/containers/Hotels/HotelCard";

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
      <section className="grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 sm:px-20 md:grid-cols-3 lg:grid-cols-4 xl:px-48 xl:grid-cols-5 mt-20">
        {data.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
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
