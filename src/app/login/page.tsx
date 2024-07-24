import Link from "@/components/Link";
import LoginForm from "@/containers/Authentication/LoginForm";

const LoginPage = () => {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <h3 className="w-full text-left text-xl pt-4">Bem vindo ao Nest Away</h3>
      <LoginForm />
      <span className="my-2">ou</span>
      <Link href="/" className="my-2">
        Cadastre-se
      </Link>
      <Link href="/">Esqueci minha senha</Link>
    </article>
  );
};

export default LoginPage;
