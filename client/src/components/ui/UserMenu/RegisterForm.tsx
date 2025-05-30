import * as React from "react";
import { registerUser } from "../../../services/api/authAPI";
import { useAuthStore } from "../../../store/authStore";
import Input from "../Input/Input";
import { validateRegisterForm } from "../../../utils/validateForm";
import useFormError from "../../../hooks/useForm";
import { DirtyFieldState, LoginAndRegisterResponse, RegisterFields } from "../../../types/form";
import { ErrorMessage } from "../Error/ErrorMessage";
import Form from "../Form/Form";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { useUIStore } from "../../../store/uiStore";

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

  const isLoading = useUIStore((state) => state.isLoading);

  const [isUsernameFocused, setIsUsernameFocused] = React.useState<boolean>(false);

  const initialDirtyFieldState: DirtyFieldState = {
    email: false,
    password: false,
    username: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange, handleSuccessfulResponse } =
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

    const response = await handleFormSubmit<RegisterFields, LoginAndRegisterResponse>({
      apiCall: () => registerUser({ registerEmail, registerPassword, registerUsername }),
      setError: setRegisterError,
    });

    if (response) {
      console.log(response);
      await handleSuccessfulResponse(response);
    }
  }

  return (
    <Form handleFormSubmit={handleRegisterFormSubmit}>
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
            } overflow-hidden transition-all duration-200 text-[13px] text-white}`}>
            <span className={`font-semibold ${regiserErrorFields.username ? "text-red-600" : "text-white"}`}>
              Please only use numbers, letters, underscore (_) or hyphen (-)
            </span>
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
      <Button textValue={isLoading ? <Loader /> : "Sign Up"} className="formButtonStyle" disabled={isLoading} />

      {generalError && <ErrorMessage message={generalError} />}
    </Form>
  );
}
