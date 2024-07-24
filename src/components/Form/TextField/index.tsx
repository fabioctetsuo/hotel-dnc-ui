import React from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextField = ({
  id,
  label,
  type = "text",
  className,
  ...props
}: TextFieldProps) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-label={label}
        placeholder={label}
        className="border border-light-grey-600 rounded-lg w-full px-4 py-2"
        {...props}
      />
    </div>
  );
};

export default TextField;
