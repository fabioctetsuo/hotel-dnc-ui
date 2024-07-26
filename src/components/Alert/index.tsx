type AlertProps = {
  type: "success" | "danger";
};

const getAlertStyle = (type: string): string =>
  ({
    success: "bg-main-brand-green-300 text-black",
    danger: "bg-red-400 text-black",
  }[type] || "bg-main-brand-green-300 text-black");

const defaultStyles =
  "w-full flex justify-center  py-2 px-4 rounded-lg my-4 text-black font-medium";

export const Alert = ({ type }: AlertProps) => {
  return (
    <span className={`${defaultStyles} ${getAlertStyle(type)}`}>
      Usuario cadastrado com sucesso
    </span>
  );
};

export default Alert;
