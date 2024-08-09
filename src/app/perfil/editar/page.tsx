import Link from "@/components/Link";
import EditProfileForm from "@/containers/Authentication/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditarPerfilPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Editar perfil</span>
      <EditProfileForm user={session.user} />
      <Link href="/perfil" className="my-4">
        Cancelar
      </Link>
    </article>
  );
};

export default EditarPerfilPage;
