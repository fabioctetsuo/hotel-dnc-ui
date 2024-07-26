import Link from "@/components/Link";
import SignupForm from "@/containers/Authentication/SignupForm";

const LoginPage = () => {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <SignupForm />
      <span className="my-2">ou</span>
      <Link href="/" className="my-2">
        Já possuo cadastro
      </Link>
    </article>
  );
};

export default LoginPage;
