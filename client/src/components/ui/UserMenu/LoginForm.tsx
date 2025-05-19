import * as React from "react";
import { useAuthStore } from "../../../store/authStore";
import { loginUser } from "../../../services/api/authAPI";
import { applyFieldErrors } from "../../../utils/errorHandler";
import Input from "../Input/Input";
import { validateLoginForm } from "../../../utils/validateForm";
import { ErrorMessage } from "../Error/ErrorMessage";
import { DirtyFieldState, LoginFields } from "../../../types/form";
import useFormError from "../../../hooks/useFormError";

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorFields = useAuthStore((state) => state.loginErrorFields);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);

  const initialDirtyFieldState: DirtyFieldState = {
    email: false,
    password: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit } = useFormError<DirtyFieldState>(initialDirtyFieldState);

  function handleLoginEmailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmailInput = event.target.value;
    setLoginEmail(newEmailInput);

    if (dirtyField.email) {
      const validationError = validateLoginForm(newEmailInput, loginPassword);

      // If the validation is correct
      if (Object.keys(validationError).indexOf("email") === -1) {
        clearLoginErrors();
      }
      applyFieldErrors<LoginFields>(validationError, setLoginError);
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
      applyFieldErrors<LoginFields>(validationError, setLoginError);
    }
  }

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateLoginForm(loginEmail, loginPassword);

    if (isValidationError<LoginFields>(validationError, setLoginError)) return;

    await handleFormSubmit<LoginFields>({ apiCall: () => loginUser({ loginEmail, loginPassword }), setError: setLoginError });
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleLoginFormSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => handleLoginEmailOnChange(e)}
        error={loginErrorFields.email}
        label="Email"
        id="login-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => handleLoginPasswordOnChange(e)}
        error={loginErrorFields.password}
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
