import * as React from "react";
import { BaseFormFieldProps } from "../../../types/form";
import { ErrorMessage } from "../Error/ErrorMessage";
import Label from "../Label/Label";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

interface FormFieldWrapperProps extends BaseFormFieldProps {
  children: React.ReactNode;
  label: string;
  labelClassName?: string;
  errorStyleClass?: string;
  isInputTypeFile?: boolean;
  positionRow?: boolean;
  onSuccessMessage?: string | null;
}

export default function FormFieldWrapper({
  children,
  error,
  label,
  id,
  labelClassName,
  errorStyleClass,
  onSuccessMessage,
  positionRow = false,
  isInputTypeFile = false,
  useVerticalLabelErrorStyle = false,
}: FormFieldWrapperProps) {
  return (
    <>
      <div className={positionRow ? "grid grid-cols-[1fr_2.5fr] gap-10 items-center" : "relative flex flex-col gap-2"}>
        <Label
          id={id}
          label={label}
          error={error}
          useVerticalLabelErrorStyle={useVerticalLabelErrorStyle}
          isInputTypeFile={isInputTypeFile}
          labelClassName={labelClassName}
        />
        <div className="w-full">
          {children}
          {error && useVerticalLabelErrorStyle && (
            <div className={`flex flex-col ml-2 h-0 ${errorStyleClass}`}>
              <span>{error && <ErrorMessage message={error} isInputFieldError={false} className="normal-case" />}</span>
            </div>
          )}
        </div>
      </div>
      {onSuccessMessage && <SuccessMessage message={onSuccessMessage} />}
    </>
  );
}
