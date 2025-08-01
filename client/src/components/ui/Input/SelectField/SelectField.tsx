import { BaseFormFieldProps } from "../../../../types/form";

interface SelectFieldProps extends BaseFormFieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {

}

export default function SelectField({ id, error, ...attributes }: SelectFieldProps) {
  return (
    <select
      id={id} {...attributes}
      className={`formElementDefaultStyling ${error ? "formElementErrorStyling" : null}`}
    >

    </select>
  )
}
