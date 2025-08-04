import { BaseFormFieldProps } from "../../../types/form";
import { ErrorMessage } from "../Error/ErrorMessage";

interface LabelProps extends BaseFormFieldProps {
  label: string;
  isInputTypeFile?: boolean;
  labelClassName?: string;
}

export default function Label({
  id,
  labelClassName,
  error,
  label,
  isInputTypeFile = false,
  useVerticalLabelErrorStyle = false,
}: LabelProps): React.ReactNode {
  const fileInputStyle: string =
    "cursor-pointer border-2 border-white/[0.5] p-2 rounded-border bg-black/[0.5] text-white hover:border-[#1bddf3]/[0.7] duration-200 text-center w-full self-center";
  return (
    <>
      <label
        htmlFor={id}
        className={`font-semibold text-[14px] uppercase ${isInputTypeFile && fileInputStyle} ${labelClassName ?? null} ${error ? "text-red-600" : "text-white"
          }`}>
        {
          <>
            {label}
            {error && !useVerticalLabelErrorStyle && (
              <ErrorMessage message={error} isInputFieldError={true} className="normal-case" />
            )}
          </>
        }
      </label>
    </>
  );
}
