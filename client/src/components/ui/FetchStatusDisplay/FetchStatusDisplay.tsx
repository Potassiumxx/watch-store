import { ReactNode } from "react";
import Loader from "../Loader/Loader";

interface FetchStatusDisplayProps {
  isLoading: boolean;
  error: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
  loadingIconSize?: number;
}

export default function FetchStatusDisplay({
  isLoading,
  error,
  isEmpty = false,
  emptyMessage = "No data available.",
  children,
  loadingIconSize = 50
}: FetchStatusDisplayProps) {
  if (isLoading) {
    return <Loader className="border-white w-full m-auto mt-40 border-8" size={loadingIconSize} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-white text-3xl">{error}</h1>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex justify-center items-center mt-40">
        <h1 className="text-white text-3xl">{emptyMessage}</h1>
      </div>
    );
  }

  return <>{children}</>;
}
