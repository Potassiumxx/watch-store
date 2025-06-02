interface ErrorMessageProps {
  message: string;
  className?: string;
  isInputFieldError?: boolean;
}

export function ErrorMessage({ message, isInputFieldError, className }: ErrorMessageProps) {
  return (
    <span className={`text-red-600 text-[14px] font-semibold text-center w-full ${className}`} data-testid="error">
      {isInputFieldError ? "- " + message : message}
    </span>
  );
}
