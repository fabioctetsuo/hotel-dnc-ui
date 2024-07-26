import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <Link href="/teste">ir para pagina de teste</Link>
      </div>
    </main>
  );
}
