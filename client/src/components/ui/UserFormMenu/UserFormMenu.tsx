/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useAuthStore } from "../../../store/authStore";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useUIStore } from "../../../store/uiStore";

// interface UserMenuProps {
//   isVisible: boolean;
//   // onClose: () => void;
// }

export default function UserMenu() {
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

  const isLoading = useUIStore((state) => state.isLoading);
  const showUserMenu = useUIStore((state) => state.showUserMenu);

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

    clearLoginErrors();
    clearRegisterErrors();
  }, [showUserMenu, isLoginMode]);

  return (
    <>
      <SidePanelContainer panelTitle={isLoginMode ? "Sign in" : "Sign Up"}>
        {isLoginMode ? <LoginForm /> : <RegisterForm />}
        <div className="flex justify-center" data-testid="user-menu">
          <button onClick={() => setIsLoginMode(!isLoginMode)} disabled={isLoading} className="disabled:cursor-not-allowed">
            <div className="group flex gap-2 items-end text-[14px]">
              <span className="">{isLoginMode ? "Need an Account?" : "Already have an account?"}</span>
              <span className={`text-[#1bddf3] ${!isLoading && "group-hover:underline underline-offset-4"}`}>
                {isLoginMode ? "Sign Up" : "Sign In"}
              </span>
            </div>
          </button>
        </div>
      </SidePanelContainer>
    </>
  );
}
