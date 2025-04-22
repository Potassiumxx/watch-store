/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { RxCross1 } from "react-icons/rx";

type UserMenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function UserMenu({ isVisible, onClose }: UserMenuProps) {
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [registerUsername, setRegisterUsername] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  React.useEffect(() => {
    // User's email will not be removed when the form is switched
    if (loginEmail !== "") setRegisterEmail(loginEmail);
    if (registerEmail !== "") setLoginEmail(registerEmail);
  }, [isLoginMode]);

  React.useEffect(() => {
    // Clear password fields if the form is closed. For security reasons.
    if (loginPassword !== "") setLoginPassword("");
    if (registerPassword !== "") setRegisterPassword("");
  }, [isVisible]);

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
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 rounded"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
                Sign In
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-4 text-black">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">Username</label>
                <input
                  type="name"
                  placeholder="Username"
                  className="border p-2 rounded"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 rounded"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
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
