import * as React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  className?: string;
}

export default function Form({ children, handleFormSubmit, className, ...attributes }: FormProps) {
  const defaultClassName = "flex flex-col gap-4 text-black p-2 md:p-6";

  return (
    <form
      className={`${defaultClassName} ${className}`}
      onSubmit={handleFormSubmit}
      noValidate
      {...attributes}
      data-testid="form">
      {children}
    </form>
  );
}
