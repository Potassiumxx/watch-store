import { ReactNode } from "react";
import Loader from "../../../components/ui/Loader/Loader";

interface ProfileContentContainerProps {
  children: ReactNode;
  title: string;
  isLoading?: boolean;
}

/**
 *
 * @param title Title of the profile page's content. Example: "My Account", "Orders", etc.
 * @param isLoading Loading state of the content. **If the content to be displayed has to be fetched from server, provide the loading state.**
 * @returns
 */
export default function ProfileContentContainer({ children, title, isLoading }: ProfileContentContainerProps) {
  return (
    <div className="flex flex-col items-center font-semibold px-4 md:component-x-axis-padding pb-3 w-full">
      <h1 className="text-white text-3xl md:text-4xl pt-4">{title}</h1>
      {isLoading ? (
        <Loader size={20} className="m-auto border-white mt-40" />
      ) : (
        <div className="flex justify-center mt-5 md:mt-14 w-full min-h-dvh">{children}</div>
      )}
    </div>
  );
}
