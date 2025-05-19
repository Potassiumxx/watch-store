import * as React from "react";
import { registerUser } from "../../../services/api/authAPI";
import { RegisterErrors, useAuthStore } from "../../../store/authStore";
import { applyFieldErrors, errorHandler } from "../../../utils/errorHandler";
import Input from "../Input/Input";
import { validateRegisterForm } from "../../../utils/validateForm";
import useFormError from "../../../hooks/useFormError";
import { DirtyFieldState } from "../../../types/form";
import { ErrorMessage } from "../Error/ErrorMessage";

export function RegisterForm() {
  const registerEmail = useAuthStore((state) => state.registerEmail);
  const registerPassword = useAuthStore((state) => state.registerPassword);
  const registerUsername = useAuthStore((state) => state.registerUsername);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);
  const setRegisterUsername = useAuthStore((state) => state.setRegisterUsername);

  const setRegisterError = useAuthStore((state) => state.setRegisterError);
  const regiserErrorMsg = useAuthStore((state) => state.registerErrors);

  const clearRegisterErrors = useAuthStore((state) => state.clearRegisterErrors);

  const [isUsernameFocused, setIsUsernameFocused] = React.useState<boolean>(false);

  const initialDirtyFieldState: DirtyFieldState = {
    email: false,
    password: false,
    username: false,
  };

  const { dirtyField, setGeneralError, generalError, isValidationError, handleFormAPIError } =
    useFormError(initialDirtyFieldState);

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setGeneralError(null);

    const validationError = validateRegisterForm(registerEmail, registerPassword, registerUsername);
    if (isValidationError(validationError, setRegisterError)) return;

    try {
      const data = await registerUser({ registerEmail, registerPassword, registerUsername });
      console.log("Login Success: " + data);
    } catch (error: unknown) {
      console.log("Login Error: " + error);
      const fieldErrorMessage = handleFormAPIError(error);
      applyFieldErrors<RegisterErrors>(fieldErrorMessage, setRegisterError);
    }

    clearRegisterErrors();
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleRegisterFormSubmit}>
      <div>
        <Input
          type="name"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          error={regiserErrorMsg.username}
          label="Username"
          id="register-username"
        />
        {
          <div
            className={`${
              isUsernameFocused ? "opacity-100 h-4 mt-1" : "opacity-0 h-0"
            } overflow-hidden transition-all duration-200 text-[13px] text-white`}>
            <span>Please only use numbers, letters, underscore (_) or hyphen (-)</span>
          </div>
        }
      </div>
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

      {generalError && <ErrorMessage message={generalError} />}
    </form>
  );
}
