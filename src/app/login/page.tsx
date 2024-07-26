import { NextPage } from "next";
import Link from "@/components/Link";
import LoginForm from "@/containers/Authentication/LoginForm";
import Alert from "@/components/Alert";

type SearchParams = {
  query: string;
  page: string;
  signup: string;
};

const LoginPage: NextPage<{ searchParams: SearchParams }> = ({
  searchParams,
}) => {
  const { signup } = searchParams;

  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>

      {signup === "success" && (
        <Alert type="success">Usuario cadastrado com sucesso</Alert>
      )}

      <h3 className="w-full text-left text-xl pt-4">Bem vindo ao Nest Away</h3>
      <LoginForm />
      <span className="my-2">ou</span>
      <Link href="/cadastrar" className="my-2">
        Cadastre-se
      </Link>
      <Link href="/">Esqueci minha senha</Link>
    </article>
  );
};

export default LoginPage;
