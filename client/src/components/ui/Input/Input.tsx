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
  fileName?: string | null;
  useVerticalLabelErrorStyle?: boolean;
}

interface FileNameContainerProps {
  fileName: string | null | undefined;
}

interface LabelProps extends InputProps {
  isInputTypeFile: boolean;
}

/**
 *
 * @param label Label text for input field.
 * @param error Error text for input field.
 * @param id represents label "for" and input "id" field.
 * @param parentClassName className for the parent `div` element that wraps `label` and `input` elements. If none is provided, default styling will be used.
 * @param labelClassName className for label element's styling. If none is provided, default or provided `className`'s value will be used.
 * @param inputClassName className for input element's styling. If none is provided, default or provided `className`'s value will be used.
 * @param fileName only for inputs with type `file`. This is used to show the file's name after uploading a file.
 * @param useVerticalLabelErrorStyle To either use vertical styling or horizontal styling to show error.
 * **Vertical styling** would put the label on top of the error in two different rows and **horizontal styling** (which is also deafult) would put the label and error side by side in a single row.
 *
 * `true` value will use vertical styling.
 * @ Other **input** field attributes can be provided as well if needed. Currently, attributes for label field is not available.
 */
export default function Input({
  label,
  error,
  id,
  parentClassName,
  labelClassName,
  inputClassName,
  fileName,
  useVerticalLabelErrorStyle,
  ...attributes
}: InputProps) {
  const isLoading = useUIStore((state) => state.isLoading);
  const { type, ...restAttributes } = { ...attributes };
  const isPasswordField: boolean = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;
  const isInputTypeFile = type === "file" && true;

  function togglePasswordVisible(e: React.MouseEvent): void {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  const baseInputClass: string = `bg-black/[0.5] text-white p-2 border-2 border-white/[0.5] rounded-border duration-200 disabled:cursor-not-allowed focus:border-[#1bddf3]/[0.7] focus:outline-none focus:ring-0`;

  return (
    <div className={parentClassName ?? `relative flex flex-col gap-2`}>
      {isInputTypeFile && <FileNameContainer fileName={fileName} />}
      <Label
        id={id}
        isInputTypeFile={isInputTypeFile}
        labelClassName={labelClassName}
        error={error}
        label={label}
        useVerticalLabelErrorStyle={useVerticalLabelErrorStyle}
      />
      <input
        className={`${isInputTypeFile ? "hidden" : baseInputClass} ${inputClassName ?? null} ${
          error ? "border-2 border-red-800 focus:border-red-600" : null
        }`}
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

/**
 * @description Renders label element
 */
function Label({ id, isInputTypeFile, labelClassName, error, label, useVerticalLabelErrorStyle }: LabelProps): React.ReactNode {
  const fileInputStyle: string =
    "cursor-pointer border-2 border-white/[0.5] p-2 rounded-border bg-black/[0.5] text-white hover:border-[#1bddf3]/[0.7] duration-200 text-center w-[50%] self-center";
  return (
    <>
      <label
        htmlFor={id}
        className={`font-semibold text-[14px] uppercase ${isInputTypeFile && fileInputStyle} ${labelClassName ?? null} ${
          error ? "text-red-600" : "text-white"
        }`}>
        {useVerticalLabelErrorStyle === true ? (
          <div className="flex flex-col">
            <span>{label}</span>
            <span>{error && <ErrorMessage message={error} isInputFieldError={false} className="normal-case" />}</span>
          </div>
        ) : (
          <>
            {label} {error && <ErrorMessage message={error} isInputFieldError={true} className="normal-case" />}
          </>
        )}
      </label>
    </>
  );
}

/**
 * @description Component only used when a file is uploaded via input type `file`. It displays the uploaded file name.
 * @param fileName Name of the uploaded file.
 */
function FileNameContainer({ fileName }: FileNameContainerProps): React.ReactNode {
  function truncateString(filename: string, maxLength: number = 30): string {
    if (filename.length <= maxLength) return filename;

    const startingIndexOfExtension = filename.lastIndexOf("."); // Extensions starts with dot
    const name = filename.slice(0, startingIndexOfExtension);
    const extension = filename.slice(startingIndexOfExtension);

    const stringToDisplay = maxLength - extension.length - 3;
    const start = Math.ceil(stringToDisplay / 2);
    const end = Math.floor(stringToDisplay / 2);

    return `${name.slice(0, start)}...${name.slice(name.length - end)}${extension}`;
  }
  return (
    fileName && (
      <span className="block truncate max-w-[256px] overflow-hidden text-white self-center mt-2">
        {fileName && truncateString(fileName)}
      </span>
    )
  );
}
