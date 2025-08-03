interface SuccessMessageProps {
  message: string;
  className?: string;
}

export default function SuccessMessage({ message, className }: SuccessMessageProps) {
  return (
    <div className="w-full relative">
      <span className={`absolute w-full text-[14px] text-green-400 text-center font-semibold ${className}`}>{message}</span>
    </div>
  )
}
