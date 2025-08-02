interface SuccessMessageProps {
  message: string;
  className?: string;
}

export default function SuccessMessage({ message, className }: SuccessMessageProps) {
  return (
    <span className={`text-[14px] text-green-400 text-center font-semibold ${className}`}>{message}</span>
  )
}
