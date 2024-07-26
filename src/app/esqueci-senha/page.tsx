import Link from "@/components/Link";
import ForgotPasswordForm from "@/containers/Authentication/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Esqueci minha senha</span>
      <ForgotPasswordForm />
      <span className="my-2">ou</span>
      <Link href="/login" className="my-2">
        Cancelar
      </Link>
    </article>
  );
};

export default ForgotPasswordPage;
