interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size = 5, className }: LoaderProps) {
  const pixelSize = size * 4; // Tailwind's spacing scale: 1 = 0.25rem = 4px
  return (
    <div
      aria-label="Loading"
      data-testid="loader"
      style={{
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        borderTopColor: "transparent",
      }}
      className={`animate-spin bg-transparent rounded-full border-4 border-black ${className}`}
    />
  );
}
