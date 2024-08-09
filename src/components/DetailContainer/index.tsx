import Image from "next/image";
import Link from "@/components/Link";
import { ReactNode } from "react";

type ImageProps = {
  src: string | null;
  alt: string;
};

type DetailContainerProps = {
  image?: ImageProps;
  title: string;
  children: ReactNode;
  asideContainer: {
    title: string | ReactNode;
    children: ReactNode;
  };
  previousPage?: string;
};

const DetailContainer = ({
  image,
  title,
  children,
  asideContainer,
  previousPage,
}: DetailContainerProps) => {
  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section className="w-full">
        <Link href={previousPage ?? "/"}>Voltar</Link>
      </section>
      {image && (
        <div className="relative w-full h-80 mt-2">
          <Image
            quality={100}
            src={image.src ?? "/default-hotel.jpg"}
            alt={`${image.alt}`}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      )}
      <section className="flex flex-col mt-2 sm:flex-row">
        <article className="w-full">
          <h1 className="font-bold text-4xl">{title}</h1>
          {children}
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl ml-0 p-8 flex flex-col justify-start self-start sm:ml-10">
          <span className="flex text-2xl font-bold">
            {asideContainer.title}
          </span>
          <div className="mt-8">{asideContainer.children}</div>
        </article>
      </section>
    </div>
  );
};

export default DetailContainer;
