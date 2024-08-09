type RadioOption = {
  label: string;
  id: string;
  value: "ADMIN" | "USER";
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
};

export const RadioGroup = ({ name, options }: RadioGroupProps) => {
  return (
    <fieldset>
      <legend>Você deseja anunciar hospedagens?</legend>
      <div className="flex">
        {options.map(({ label, id, value }) => (
          <div className="flex items-center me-4" key={id}>
            <input
              id={id}
              type="radio"
              value={value}
              name={name}
              required
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={id}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
