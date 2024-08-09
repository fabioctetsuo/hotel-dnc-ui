import TextField from "@/components/Form/TextField";
import { NumericFormat } from "react-number-format";

const MaskedInput = ({ error, label, ...props }: any) => (
  <NumericFormat
    customInput={TextField}
    label={label}
    error={error}
    prefix="R$ "
    decimalScale={2}
    decimalSeparator=","
    thousandSeparator="."
    {...props}
  />
);

export default MaskedInput;
