import * as React from "react";
import { useUIStore } from "../../../store/uiStore";
import { ErrorMessage } from "../Error/ErrorMessage";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  label?: string;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

/**
 *
 * @param label Label text for input field.
 * @param error Error text for input field.
 * @param id represents label "for" and input "id" field.
 * @param parentClassName className for the parent `div` element that wraps `label` and `input` elements. If none is provided, default styling will be used.
 * @param labelClassName className for label element's styling. If none is provided, default or provided `className`'s value will be used.
 * @param inputClassName className for input element's styling. If none is provided, default or provided `className`'s value will be used.
 *
 * @ Other **input** field attributes can be provided as well if needed. Currently, attributes for label field is not available.
 */

export default function Input({ label, error, id, parentClassName, labelClassName, inputClassName, ...attributes }: InputProps) {
  const isLoading = useUIStore((state) => state.isLoading);
  const { type, ...restAttributes } = { ...attributes };
  const isPasswordField: boolean = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;

  function togglePasswordVisible(e: React.MouseEvent): void {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  const baseInputClass: string = `bg-black/[0.5] text-white p-2 border-2 border-white/[0.5] rounded-border duration-200 disabled:cursor-not-allowed focus:border-[#1bddf3]/[0.7] focus:outline-none focus:ring-0`;

  return (
    <div className={parentClassName ?? `relative flex flex-col gap-2`}>
      <label
        htmlFor={id}
        className={`font-semibold text-[14px] uppercase ${labelClassName ?? null} ${error ? "text-red-600" : "text-white"}`}>
        {label} {error && <ErrorMessage message={error} isInputFieldError={true} className="normal-case" />}
      </label>
      <input
        className={`${baseInputClass} ${inputClassName ?? null} ${error ? "border-2 border-red-800 focus:border-red-600" : null}`}
        id={id}
        autoComplete="off"
        disabled={isLoading}
        type={inputType}
        {...restAttributes}
      />
      {isPasswordField && (
        <button
          className="text-white absolute right-2 bottom-2"
          onClick={togglePasswordVisible}
          type="button"
          data-testid="togglePasswordVisibility">
          {isPasswordVisible ? <VscEyeClosed size={22} /> : <VscEye size={22} />}
        </button>
      )}
    </div>
  );
}
