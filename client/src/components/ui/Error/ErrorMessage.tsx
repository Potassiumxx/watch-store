interface ErrorMessageProps {
  message: string;
  className?: string;
  isInputFieldError?: boolean;
}

export function ErrorMessage({ message, isInputFieldError, className }: ErrorMessageProps) {
  return (
    <div className="w-full relative">
      <span className={`text-red-600 text-[14px] font-semibold text-center w-full ${className}`} data-testid="error">
        {isInputFieldError ? <span className="flex"><Dash />  {message}</span> : message}
      </span>
    </div>
  );
}

function Dash() {
  return <span className="mx-1">-</span>
}
