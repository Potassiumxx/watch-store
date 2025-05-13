import { ErrorMessage } from "../Error/ErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  label?: string;
}

export default function Input({ label, error, id, className, ...attributes }: InputProps) {
  const baseInputClass: string = `bg-black/[0.5] text-white p-2 border-2 border-white/[0.5] rounded-border duration-200 ${
    error && "border-2 border-red-700"
  } focus:border-[#1bddf3]/[0.7] focus:outline-none focus:ring-0`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`font-semibold text-[13px] uppercase ${error ? "text-red-600" : "text-white"}`}>
        {label} {error && <ErrorMessage message={error} isInputFieldError={true} className="normal-case" />}
      </label>
      <input className={`${baseInputClass} ${className}`} id={id} autoComplete="off" {...attributes} />
    </div>
  );
}
