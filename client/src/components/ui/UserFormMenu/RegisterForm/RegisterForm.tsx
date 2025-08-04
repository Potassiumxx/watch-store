import * as React from "react";
import { useAuthStore } from "../../../../store/authStore";
import { registerUser } from "../../../../services/api/authAPI";
import Input from "../../Input/Input";
import { validateRegisterForm } from "../../../../utils/validateAuthForm";
import { ErrorMessage } from "../../Error/ErrorMessage";
import { RegisterFields, LoginAndRegisterResponse } from "../../../../types/authType";
import { DirtyFieldState } from "../../../../types/form";
import useForm from "../../../../hooks/useForm";
import Form from "../../Form/Form";
import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import { useUIStore } from "../../../../store/uiStore";
import FormFieldWrapper from "../../FormFieldWrapper/FormFieldWrapper";

export default function RegisterForm() {
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

  const initialDirtyFieldState: DirtyFieldState<RegisterFields> = {
    email: false,
    password: false,
    username: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange, handleSuccessfulResponse } =
    useForm<DirtyFieldState<RegisterFields>>(initialDirtyFieldState);

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
        <FormFieldWrapper error={regiserErrorFields.username} label="Username" id="register-username" labelClassName="flex">
          <Input
            type="name"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => handleRegisterUsernameOnChange(e)}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
            error={regiserErrorFields.username}
            id="register-username"
          />
        </FormFieldWrapper>
        {
          <div
            className={`${isUsernameFocused ? "opacity-100 h-4 mt-1" : "opacity-0 h-0"
              } overflow-hidden transition-all duration-200 text-[13px] text-white}`}>
            <span className={`font-semibold ${regiserErrorFields.username ? "text-red-600" : "text-white"}`}>
              Please only use numbers, letters, underscore (_) or hyphen (-)
            </span>
          </div>
        }
      </div>
      <FormFieldWrapper error={regiserErrorFields.email} label="Email" id="register-email" labelClassName="flex">
        <Input
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => handleRegisterEmailOnChange(e)}
          error={regiserErrorFields.email}
          id="register-email"
        />
      </FormFieldWrapper>
      <FormFieldWrapper error={regiserErrorFields.password} label="Password" id="register-password" labelClassName="flex">
        <Input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => handleRegisterPasswordOnChange(e)}
          error={regiserErrorFields.password}
          id="register-password"
        />
      </FormFieldWrapper>
      <Button textValue={isLoading ? <Loader /> : "Sign Up"} className="formButtonStyle" disabled={isLoading} />

      {generalError && <ErrorMessage message={generalError} />}
    </Form>
  );
}
