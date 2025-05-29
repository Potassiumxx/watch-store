import { useUIStore } from "../../../store/uiStore";
import { ErrorMessage } from "../Error/ErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  label?: string;
}

export default function Input({ label, error, id, className, ...attributes }: InputProps) {
  const isLoading = useUIStore((state) => state.isLoading);

  const baseInputClass: string = `bg-black/[0.5] text-white p-2 border-2 border-white/[0.5] rounded-border duration-200 disabled:cursor-not-allowed ${
    error && "border-2 border-red-700"
  } focus:border-[#1bddf3]/[0.7] focus:outline-none focus:ring-0`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`font-semibold text-[14px] uppercase ${error ? "text-red-600" : "text-white"}`}>
        {label} {error && <ErrorMessage message={error} isInputFieldError={true} className="normal-case" />}
      </label>
      <input
        className={`${baseInputClass} ${className} ${error && "border-2 border-red-800 focus:border-red-600"}`}
        id={id}
        autoComplete="off"
        disabled={isLoading}
        {...attributes}
      />
    </div>
  );
}
