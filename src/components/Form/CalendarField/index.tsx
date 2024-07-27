type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
};

export function CalendarField({
  label,
  id,
  name,
  error,
  min,
  className,
  ...props
}: TextFieldProps) {
  const defaultStyle =
    "border border-light-grey-600 rounded-lg w-full px-4 py-2";
  const errorStyle = "border-red-500";

  return (
    <div className={`${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="date"
        aria-label={label}
        min={min}
        className={`${defaultStyle} ${error ? errorStyle : ""}`}
        {...props}
      />
    </div>
  );
}

export default CalendarField;
