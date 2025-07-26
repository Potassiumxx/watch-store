import * as React from "react";
import { useUIStore } from "../../../store/uiStore";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { BaseFormFieldProps } from "../../../types/form";
import { useProductStore } from "../../../store/productStore";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">, BaseFormFieldProps {
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

interface FileNameContainerProps {
  fileName: string | null | undefined;
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
export default function Input({ id, error, parentClassName, inputClassName, ...attributes }: InputProps) {
  const isLoading = useUIStore((state) => state.isLoading);
  const productFileName = useProductStore.getState().productFileName;

  const { type, ...restAttributes } = { ...attributes };
  const isPasswordField: boolean = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;
  const isInputTypeFile = type === "file" && true;

  function togglePasswordVisible(e: React.MouseEvent): void {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className={parentClassName ?? `relative flex flex-col gap-2`}>
      {isInputTypeFile && <FileNameContainer fileName={productFileName} />}
      <div className="w-full">
        <input
          className={`${isInputTypeFile ? "hidden" : "formElementDefaultStyling"} ${inputClassName ?? null} ${error ? "formElementErrorStyling" : null
            }`}
          id={id}
          autoComplete="off"
          disabled={isLoading}
          type={inputType}
          {...restAttributes}
        />
      </div>
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
