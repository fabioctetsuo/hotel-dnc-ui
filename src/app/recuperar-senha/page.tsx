import RecoverPasswordForm from "@/containers/Authentication/RecoverPasswordForm";

const RecoverPasswordPage = () => {
  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Esqueci minha senha</span>
      <RecoverPasswordForm />
    </article>
  );
};

export default RecoverPasswordPage;
