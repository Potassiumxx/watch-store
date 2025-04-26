/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { loginUser, registerUser } from "../../../services/api/authAPI";
import SidePanel from "../SidePanel/SidePanel";
import Backdrop from "../Backdrop/Backdrop";

type UserMenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

function LoginForm() {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await loginUser({ loginEmail, loginPassword });
      console.log("Login Success: " + data);
    } catch (error) {
      console.log("Login Error: " + error);
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleLoginFormSubmit}>
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
  );
}

function RegisterForm() {
  const [registerUsername, setRegisterUsername] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await registerUser({ registerEmail, registerPassword, registerUsername });
      console.log("Login Success: " + data);
    } catch (error) {
      console.log("Login Error: " + error);
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleRegisterFormSubmit}>
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
  );
}

export default function UserMenu({ isVisible, onClose }: UserMenuProps) {
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);

  // Commented out the useEffect code for now. Will use Zustand to manage states.

  // React.useEffect(() => {
  //   // User's email will not be removed when the form is switched
  //   if (loginEmail !== "") setRegisterEmail(loginEmail);
  //   if (registerEmail !== "") setLoginEmail(registerEmail);
  // }, [isLoginMode]);

  // React.useEffect(() => {
  //   // Clear password fields if the form is closed. For security reasons.
  //   if (loginPassword !== "") setLoginPassword("");
  //   if (registerPassword !== "") setRegisterPassword("");
  // }, [isVisible]);

  return (
    <>
      <Backdrop onClose={onClose} isVisible={isVisible} />

      <SidePanel isLoginMode={isLoginMode} isVisible={isVisible} onClose={onClose}>
        {isLoginMode ? <LoginForm /> : <RegisterForm />}
        <div className="flex justify-center">
          <button onClick={() => setIsLoginMode(!isLoginMode)}>
            <div className="group flex gap-2 items-end text-[14px]">
              <span className="">{isLoginMode ? "Need an Account?" : "Already have an account?"}</span>
              <span className="text-[#1bddf3] group-hover:underline underline-offset-4">
                {isLoginMode ? "Sign Un" : "Sign In"}
              </span>
            </div>
          </button>
        </div>
      </SidePanel>
    </>
  );
}
