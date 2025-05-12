/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useAuthStore } from "../../../store/authStore";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface UserMenuProps {
  isVisible: boolean;
  onClose: () => void;
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
