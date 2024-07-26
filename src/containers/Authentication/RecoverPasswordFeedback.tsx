import Image from "next/image";
import Link from "next/link";

export const RecoverPasswordFeedback = () => {
  return (
    <div className="my-4 flex flex-col items-center">
      <Image
        src="/recover-password.svg"
        width={172}
        height={167}
        alt="Ilustração de recuperar minha senha"
      />
      <h3 className="font-bold text-xl my-4">Senha alterada com sucesso!</h3>
      <Link href="/login">Voltar para login</Link>
    </div>
  );
};

export default RecoverPasswordFeedback;
