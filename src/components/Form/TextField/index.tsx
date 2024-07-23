import React from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextField = ({ id, label }: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={id} hidden>
        {label}
      </label>
      <input
        id={id}
        type="text"
        aria-label={label}
        placeholder={label}
        className="border border-light-grey-600 rounded-lg w-full px-4 py-2"
      />
    </div>
  );
};

export default TextField;
