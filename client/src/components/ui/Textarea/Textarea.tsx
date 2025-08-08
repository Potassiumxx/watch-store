import * as React from "react";
import { BaseFormFieldProps } from "../../../types/form";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id">, BaseFormFieldProps { }

export default function Textarea({ id, error, onChange, ...attributes }: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = `${textareaElement.scrollHeight}px`;
    }

    // Tell the parent component about the change. This makes sure the onChange event is also handled/called after the onInput event. Otherwise, the onChange event would never be called and only onInput event would be called.
    onChange?.(e);
  }

  return (
    <div>
      <textarea
        id={id}
        ref={textareaRef}
        className={`formElementDefaultStyling resize-none min-h-16 max-h-52 ${error ? "formElementErrorStyling" : null}`}
        onInput={handleInput}
        {...attributes}
      />
    </div>
  );
}
