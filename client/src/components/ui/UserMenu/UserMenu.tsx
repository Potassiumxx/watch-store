/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { loginUser, registerUser } from "../../../services/api/authAPI";
import Backdrop from "../Backdrop/Backdrop";
import { useAuthStore } from "../../../store/authStore";
import { errorHandler } from "../../../utils/errorHandler";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import Input from "../Input/Input";

type UserMenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorMsg = useAuthStore((state) => state.loginErrors);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await loginUser({ loginEmail, loginPassword });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);
      setLoginError("email", errorHandler(error));
      setLoginError("password", errorHandler(error));
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleLoginFormSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        error={loginErrorMsg.email}
        label="Email"
        id="login-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        error={loginErrorMsg.password}
        label="Password"
        id="login-password"
      />
      <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
        Sign In
      </button>
    </form>
  );
}

function RegisterForm() {
  const registerEmail = useAuthStore((state) => state.registerEmail);
  const registerPassword = useAuthStore((state) => state.registerPassword);
  const registerUsername = useAuthStore((state) => state.registerUsername);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);
  const setRegisterUsername = useAuthStore((state) => state.setRegisterUsername);

  const setRegisterError = useAuthStore((state) => state.setRegisterError);
  const regiserErrorMsg = useAuthStore((state) => state.registerErrors);

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await registerUser({ registerEmail, registerPassword, registerUsername });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);
      setRegisterError("email", errorHandler(error));
      setRegisterError("password", errorHandler(error));
      setRegisterError("username", errorHandler(error));
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleRegisterFormSubmit}>
      <Input
        type="name"
        placeholder="Username"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)}
        error={regiserErrorMsg.username}
        label="Username"
        id="register-username"
      />
      <Input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        error={regiserErrorMsg.email}
        label="Email"
        id="register-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        error={regiserErrorMsg.password}
        label="Password"
        id="register-password"
      />
      <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default function UserMenu({ isVisible, onClose }: UserMenuProps) {
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);

  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const registerEmail = useAuthStore((state) => state.registerEmail);
  const registerPassword = useAuthStore((state) => state.registerPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);
  const clearRegisterErrors = useAuthStore((state) => state.clearRegisterErrors);

  // Commented out the useEffect code for now. Will use Zustand to manage states.

  React.useEffect(() => {
    // User's email will not be removed when the form is switched
    if (loginEmail !== "") setRegisterEmail(loginEmail);
    if (registerEmail !== "") setLoginEmail(registerEmail);

    clearLoginErrors();
    clearRegisterErrors();
  }, [isLoginMode]);

  React.useEffect(() => {
    // Clear password fields if the form is closed or switched. For security reasons.
    if (loginPassword !== "") setLoginPassword("");
    if (registerPassword !== "") setRegisterPassword("");
  }, [isVisible, isLoginMode]);

  return (
    <>
      <Backdrop onClose={onClose} isVisible={isVisible} />

      <SidePanelContainer isLoginMode={isLoginMode} isVisible={isVisible} onClose={onClose}>
        {isLoginMode ? <LoginForm /> : <RegisterForm />}
        <div className="flex justify-center">
          <button onClick={() => setIsLoginMode(!isLoginMode)}>
            <div className="group flex gap-2 items-end text-[14px]">
              <span className="">{isLoginMode ? "Need an Account?" : "Already have an account?"}</span>
              <span className="text-[#1bddf3] group-hover:underline underline-offset-4">
                {isLoginMode ? "Sign Up" : "Sign In"}
              </span>
            </div>
          </button>
        </div>
      </SidePanelContainer>
    </>
  );
}
