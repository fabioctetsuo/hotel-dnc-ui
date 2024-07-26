import React from "react";

type Appearance = "primary" | "secondary";

type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: Appearance;
};

const getClassNamesByType = (type: Appearance) =>
  ({
    primary:
      "bg-main-brand-green-500 text-white hover:bg-main-brand-green-600 active:bg-main-brand-green-700 focus:outline-none focus:ring focus:ring-main-brand-green-300",
    secondary:
      "bg-white border-none text-main-brand-green-500 hover:bg-snow-white active:bg-snow-white focus:outline-none focus:ring focus:ring-main-brand-green-300",
  }[type]);

export const Button = ({
  children,
  onClick,
  appearance = "primary",
  className,
  disabled,
}: ButtonTypes) => {
  const commonStyles =
    "py-2 px-6 w-full border-none rounded-lg font-medium disabled:bg-slate-300 disabled:cursor-not-allowed";
  const apperanceStyles = getClassNamesByType(appearance);

  return (
    <button
      onClick={onClick}
      className={`${commonStyles} ${apperanceStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
