import { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";

type SidePanelProps = {
  children: ReactNode;
  isVisible: boolean;
  isLoginMode?: boolean; // For login and register only
  onClose: () => void;
};

export default function SidePanel({ children, isVisible, isLoginMode, onClose }: SidePanelProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[420px] bg-[#1a1a1a] text-white z-50 shadow-lg transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}>
      <div className="flex w-full border-b-white border-b-2">
        <h1 className="text-2xl my-2 mx-6">{isLoginMode ? "Sign In" : "Sign Up"}</h1>
        <button className="right-0 absolute mx-6 my-2 hover:text-red-500 duration-150" onClick={onClose}>
          <RxCross1 size={25} />
        </button>
      </div>
      {children}
    </div>
  );
}
