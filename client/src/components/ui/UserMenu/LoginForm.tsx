import * as React from "react";
import { useAuthStore } from "../../../store/authStore";
import { loginUser } from "../../../services/api/authAPI";
import { errorHandler, applyFieldErrors } from "../../../utils/errorHandler";
import { LoginErrors } from "../../../store/authStore";
import Input from "../Input/Input";
import { validateLoginForm } from "../../../utils/validateForm";
import { GENERAL_ERROR_KEY } from "../../../utils/constants";
import { ErrorMessage } from "../Error/ErrorMessage";

interface DirtyFieldState {
  email: boolean;
  password: boolean;
}

type DirtyFieldAction =
  | {
      type: "SET_DIRTY";
      field: keyof DirtyFieldState;
    }
  | { type: "SET_ALL_DIRTY" }
  | { type: "RESET_ALL" };

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorMsg = useAuthStore((state) => state.loginErrors);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);

  const [generalError, setGeneralError] = React.useState<string>("");

  const [dirtyField, dispatchDirtyField] = React.useReducer(dirtyFieldReducer, {
    email: false,
    password: false,
  });

  function dirtyFieldReducer(state: DirtyFieldState, action: DirtyFieldAction): DirtyFieldState {
    switch (action.type) {
      case "SET_DIRTY":
        return { ...state, [action.field]: true };
      case "SET_ALL_DIRTY":
        return { email: true, password: true };
      case "RESET_ALL":
        return { email: false, password: false };
      default:
        return state;
    }
  }

  function handleLoginEmailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmailInput = event.target.value;
    setLoginEmail(newEmailInput);

    if (dirtyField.email) {
      const validationError = validateLoginForm(newEmailInput, loginPassword);

      // If the validation is correct
      if (Object.keys(validationError).indexOf("email") === -1) {
        clearLoginErrors();
      }
      applyFieldErrors<LoginErrors>(validationError, setLoginError);
    }
  }

  function handleLoginPasswordOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newPasswordInput = event.target.value;
    setLoginPassword(newPasswordInput);

    if (dirtyField.password) {
      const validationError = validateLoginForm(loginEmail, newPasswordInput);

      // If the validation is correct
      if (Object.keys(validationError).indexOf("password") === -1) {
        clearLoginErrors();
      }
      applyFieldErrors<LoginErrors>(validationError, setLoginError);
    }
  }

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateLoginForm(loginEmail, loginPassword);

    // if (validationError.email) dispatchDirtyField({ type: "SET_DIRTY", field: "email" });
    // if (validationError.password) dispatchDirtyField({ type: "SET_DIRTY", field: "password" });

    if (Object.keys(validationError).length > 0) {
      dispatchDirtyField({ type: "SET_ALL_DIRTY" });
      return applyFieldErrors<LoginErrors>(validationError, setLoginError);
    }

    try {
      const data = await loginUser({ loginEmail, loginPassword });
      dispatchDirtyField({ type: "RESET_ALL" });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);

      const errorMessage = errorHandler(error);
      if (GENERAL_ERROR_KEY in errorMessage) {
        return setGeneralError(errorMessage[GENERAL_ERROR_KEY]);
      }

      applyFieldErrors<LoginErrors>(errorMessage, setLoginError);
    }
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleLoginFormSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => handleLoginEmailOnChange(e)}
        error={loginErrorMsg.email}
        label="Email"
        id="login-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => handleLoginPasswordOnChange(e)}
        error={loginErrorMsg.password}
        label="Password"
        id="login-password"
      />
      <button type="submit" className="bg-[#1bddf3] text-black py-2 rounded">
        Sign In
      </button>

      {generalError && <ErrorMessage message={generalError} />}
    </form>
  );
}
