import { BaseFormFieldProps } from "../../../types/form";
import Label from "../Label/Label";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id">, BaseFormFieldProps {}

export default function Textarea({ id, label, error, useVerticalLabelErrorStyle }: TextareaProps) {
  return (
    <div>
      <Label id={id} label={label} error={error} useVerticalLabelErrorStyle={useVerticalLabelErrorStyle} />
      <textarea />
    </div>
  );
}
