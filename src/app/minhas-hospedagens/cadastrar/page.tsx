import Link from "@/components/Link";
import CreateHotelForm from "@/containers/Hotels/CreateHotelForm";

const CadastrarPage = () => {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Cadastrar hospedagem</span>
      <CreateHotelForm />
      <Link href="/minhas-hospedagens" className="my-2">
        Cancelar
      </Link>
    </article>
  );
};

export default CadastrarPage;
