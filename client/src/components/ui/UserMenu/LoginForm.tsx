import * as React from "react";
import { useAuthStore } from "../../../store/authStore";
import { loginUser } from "../../../services/api/authAPI";
import { errorHandler, applyFieldErrors } from "../../../utils/errorHandler";
import { LoginErrors } from "../../../store/authStore";
import Input from "../Input/Input";
import { validateLoginForm } from "../../../utils/validateForm";
import { ACTION_TYPES, GENERAL_ERROR_KEY } from "../../../utils/constants";
import { ErrorMessage } from "../Error/ErrorMessage";
import useDirtyField from "../../../hooks/useDirtyField";

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorMsg = useAuthStore((state) => state.loginErrors);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);

  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const [dirtyField, dispatchDirtyFieldReducer] = useDirtyField();

  function handleLoginEmailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmailInput = event.target.value;
    setLoginEmail(newEmailInput);
    console.log(dirtyField);

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
    setGeneralError(null);

    const validationError = validateLoginForm(loginEmail, loginPassword);

    // if (validationError.email) dispatchDirtyFieldReducer({ type: "SET_DIRTY", field: "email" });
    // if (validationError.password) dispatchDirtyFieldReducer({ type: "SET_DIRTY", field: "password" });

    if (Object.keys(validationError).length > 0) {
      dispatchDirtyFieldReducer({ type: ACTION_TYPES.SET_ALL_DIRTY });
      console.log(dirtyField);
      return applyFieldErrors<LoginErrors>(validationError, setLoginError);
    }

    try {
      const data = await loginUser({ loginEmail, loginPassword });
      dispatchDirtyFieldReducer({ type: ACTION_TYPES.RESET_ALL });
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
