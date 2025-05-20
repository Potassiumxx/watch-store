import * as React from "react";
import { registerUser } from "../../../services/api/authAPI";
import { useAuthStore } from "../../../store/authStore";
import Input from "../Input/Input";
import { validateRegisterForm } from "../../../utils/validateForm";
import useFormError from "../../../hooks/useForm";
import { DirtyFieldState, RegisterFields } from "../../../types/form";
import { ErrorMessage } from "../Error/ErrorMessage";

export function RegisterForm() {
  const registerEmail = useAuthStore((state) => state.registerEmail);
  const registerPassword = useAuthStore((state) => state.registerPassword);
  const registerUsername = useAuthStore((state) => state.registerUsername);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);
  const setRegisterUsername = useAuthStore((state) => state.setRegisterUsername);

  const setRegisterError = useAuthStore((state) => state.setRegisterError);
  const regiserErrorFields = useAuthStore((state) => state.registerErrorFields);

  const clearRegisterErrors = useAuthStore((state) => state.clearRegisterErrors);

  const [isUsernameFocused, setIsUsernameFocused] = React.useState<boolean>(false);

  const initialDirtyFieldState: DirtyFieldState = {
    email: false,
    password: false,
    username: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange } =
    useFormError(initialDirtyFieldState);

  function handleRegisterUsernameOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const username = event.target.value;

    handleFieldOnChange<RegisterFields>({
      fieldKey: "username",
      newValue: username,
      allFormValues: { email: registerEmail, password: registerPassword, username: registerUsername },
      formValueSetter: setRegisterUsername,
      validateFunction: validateRegisterForm,
      setFieldErrorFunction: setRegisterError,
      clearErrorsFunction: clearRegisterErrors,
      dirtyField: dirtyField,
    });
  }

  function handleRegisterEmailOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const email = event.target.value;

    handleFieldOnChange<RegisterFields>({
      fieldKey: "email",
      newValue: email,
      allFormValues: { email: registerEmail, password: registerPassword, username: registerUsername },
      formValueSetter: setRegisterEmail,
      validateFunction: validateRegisterForm,
      setFieldErrorFunction: setRegisterError,
      clearErrorsFunction: clearRegisterErrors,
      dirtyField: dirtyField,
    });
  }

  function handleRegisterPasswordOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const password = event.target.value;

    handleFieldOnChange<RegisterFields>({
      fieldKey: "password",
      newValue: password,
      allFormValues: { email: registerEmail, password: registerPassword, username: registerUsername },
      formValueSetter: setRegisterPassword,
      validateFunction: validateRegisterForm,
      setFieldErrorFunction: setRegisterError,
      clearErrorsFunction: clearRegisterErrors,
      dirtyField: dirtyField,
    });
  }

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateRegisterForm({
      email: registerEmail,
      password: registerPassword,
      username: registerUsername,
    });

    if (isValidationError<RegisterFields>(validationError, setRegisterError)) return;

    await handleFormSubmit<RegisterFields>({
      apiCall: () => registerUser({ registerEmail, registerPassword, registerUsername }),
      setError: setRegisterError,
    });
  }

  return (
    <form className="flex flex-col gap-4 text-black p-6" onSubmit={handleRegisterFormSubmit}>
      <div>
        <Input
          type="name"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => handleRegisterUsernameOnChange(e)}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          error={regiserErrorFields.username}
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
        onChange={(e) => handleRegisterEmailOnChange(e)}
        error={regiserErrorFields.email}
        label="Email"
        id="register-email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => handleRegisterPasswordOnChange(e)}
        error={regiserErrorFields.password}
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
