import * as React from "react";
import { RxCross1 } from "react-icons/rx";

type UserMenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function UserMenu({ isVisible, onClose }: UserMenuProps) {
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "bg-black/40 opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#1a1a1a] text-white z-50 shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex w-full border-b-white border-b-2">
          <h1 className="text-2xl my-2 mx-6">{isLoginMode ? "Sign In" : "Sign Up"}</h1>
          <button className="right-0 absolute mx-6 my-2 hover:text-red-500 duration-150" onClick={onClose}>
            <RxCross1 size={25} />
          </button>
        </div>

        <div className="p-6">
          {isLoginMode ? (
            <form className="flex flex-col gap-4 text-black">
              <input type="email" placeholder="Email" className="border p-2 rounded" />
              <input type="password" placeholder="Password" className="border p-2 rounded" />
              <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
                Sign In
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4 text-black">
              <input type="text" placeholder="Username" className="border p-2 rounded" />
              <input type="email" placeholder="Email" className="border p-2 rounded" />
              <input type="password" placeholder="Password" className="border p-2 rounded" />
              <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
                Sign Up
              </button>
            </form>
          )}
        </div>
        <div className="flex justify-center">
          <button onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? (
              <div className="group flex gap-2 items-end text-[14px]">
                <span className="">Need an Account?</span>
                <span className="text-[#1bddf3] group-hover:underline underline-offset-4">Sign Up</span>
              </div>
            ) : (
              <div className="group flex gap-2 items-end text-[14px]">
                <span className="">Already have an account?</span>
                <span className="text-[#1bddf3] group-hover:underline underline-offset-4">Sign In</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
