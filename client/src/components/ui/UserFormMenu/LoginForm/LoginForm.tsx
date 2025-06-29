import * as React from "react";
import { useAuthStore } from "../../../../store/authStore";
import { loginUser } from "../../../../services/api/authAPI";
import Input from "../../Input/Input";
import { validateLoginForm } from "../../../../utils/validateForm";
import { ErrorMessage } from "../../Error/ErrorMessage";
import { DirtyFieldState, LoginFields, LoginAndRegisterResponse } from "../../../../types/form";
import useForm from "../../../../hooks/useForm";
import Form from "../../Form/Form";
import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import { useUIStore } from "../../../../store/uiStore";

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);

  const loginErrorFields = useAuthStore((state) => state.loginErrorFields);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);

  const isLoading = useUIStore((state) => state.isLoading);

  const initialDirtyFieldState: DirtyFieldState<LoginFields> = {
    email: false,
    password: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange, handleSuccessfulResponse } =
    useForm<DirtyFieldState<LoginFields>>(initialDirtyFieldState);

  function handleLoginEmailOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setLoginEmail(email);

    handleFieldOnChange<LoginFields>({
      fieldKey: "email",
      newValue: email,
      allFormValues: { email: loginEmail, password: loginPassword },
      formValueSetter: setLoginEmail,
      validateFunction: validateLoginForm,
      setFieldErrorFunction: setLoginError,
      clearErrorsFunction: clearLoginErrors,
      dirtyField: dirtyField,
    });
  }

  function handleLoginPasswordOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;

    handleFieldOnChange<LoginFields>({
      fieldKey: "password",
      newValue: password,
      allFormValues: { email: loginEmail, password: loginPassword },
      formValueSetter: setLoginPassword,
      validateFunction: validateLoginForm,
      setFieldErrorFunction: setLoginError,
      clearErrorsFunction: clearLoginErrors,
      dirtyField: dirtyField,
    });
  }

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    clearLoginErrors();

    const validationError = validateLoginForm({ email: loginEmail, password: loginPassword });

    if (isValidationError<LoginFields>(validationError, setLoginError)) return;

    const response = await handleFormSubmit<LoginFields, LoginAndRegisterResponse>({
      apiCall: () => loginUser({ loginEmail, loginPassword }),
      setError: setLoginError,
    });

    if (response) {
      await handleSuccessfulResponse(response);
    }
  }

  return (
    <Form handleFormSubmit={handleLoginFormSubmit}>
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
      <Button
        textValue={isLoading ? <Loader /> : "Sign In"}
        className="formButtonStyle"
        disabled={isLoading}
        data-testid="login-submit-btn"
      />

      {generalError && <ErrorMessage message={generalError} />}
    </Form>
  );
}
