import * as React from "react";
import { useAuthStore } from "../../../../store/authStore";
import { loginUser } from "../../../../services/api/authAPI";
import Input from "../../Input/Input";
import { validateLoginForm } from "../../../../utils/validateAuthForm";
import { ErrorMessage } from "../../Error/ErrorMessage";
import { LoginFields, LoginAndRegisterResponse } from "../../../../types/authType";
import { DirtyFieldState } from "../../../../types/form";
import useForm from "../../../../hooks/useForm";
import Form from "../../Form/Form";
import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import { useUIStore } from "../../../../store/uiStore";
import FormFieldWrapper from "../../FormFieldWrapper/FormFieldWrapper";

export default function LoginForm() {
  const loginEmail = useAuthStore((state) => state.loginEmail);
  const loginPassword = useAuthStore((state) => state.loginPassword);
  const securityCode = useAuthStore((state) => state.securityCode);

  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setLoginPassword = useAuthStore((state) => state.setLoginPassword);
  const setSecurityCode = useAuthStore((state) => state.setSecurityCode);

  const loginErrorFields = useAuthStore((state) => state.loginErrorFields);
  const setLoginError = useAuthStore((state) => state.setLoginError);

  const clearLoginErrors = useAuthStore((state) => state.clearLoginErrors);

  const isLoading = useUIStore((state) => state.isLoading);

  const [hasForgotPassword, setHasForgotPassword] = React.useState<boolean>(false);

  const initialDirtyFieldState: DirtyFieldState<LoginFields> = {
    email: false,
    password: false,
    securityCode: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange, handleSuccessfulResponse } =
    useForm<DirtyFieldState<LoginFields>>(initialDirtyFieldState);

  function handleLoginFieldOnChange(
    fieldKey: keyof LoginFields,
    setter: (value: string) => void
  ) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      handleFieldOnChange<LoginFields>({
        fieldKey,
        newValue,
        allFormValues: {
          email: loginEmail,
          password: loginPassword,
          securityCode: securityCode,
        },
        formValueSetter: setter,
        validateFunction: (fields) => validateLoginForm(fields, { isForgotPassword: hasForgotPassword }),
        setFieldErrorFunction: setLoginError,
        clearErrorsFunction: clearLoginErrors,
        dirtyField,
      });
    };
  }

  async function handleLoginFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    clearLoginErrors();

    const validationError = validateLoginForm(
      { email: loginEmail, password: loginPassword, securityCode: securityCode },
      { isForgotPassword: hasForgotPassword }
    );

    console.log(validationError);

    if (isValidationError<LoginFields>(validationError, setLoginError)) return;

    const response = await handleFormSubmit<LoginFields, LoginAndRegisterResponse>({
      apiCall: () => loginUser({ loginEmail, loginPassword }),
      setError: setLoginError,
    });

    if (response) {
      await handleSuccessfulResponse(response);
    }
  }

  function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setHasForgotPassword(true);
  }

  return (
    <Form handleFormSubmit={handleLoginFormSubmit}>
      <FormFieldWrapper error={loginErrorFields.email} label="Email" id="login-email" labelClassName="flex">
        <Input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={handleLoginFieldOnChange("email", setLoginEmail)}
          error={loginErrorFields.email}
          id="login-email"
        />
      </FormFieldWrapper>
      {!hasForgotPassword ?
        (
          <FormFieldWrapper error={loginErrorFields.password} label="Password" id="login-password" labelClassName="flex">
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={handleLoginFieldOnChange("password", setLoginPassword)}
              error={loginErrorFields.password}
              id="login-password"
            />
          </FormFieldWrapper>
        ) : (
          <FormFieldWrapper error={loginErrorFields.securityCode} label="Security Code" id="security-code" labelClassName="flex whitespace-nowrap">
            <Input
              type="password"
              placeholder="Security Code"
              value={securityCode}
              onChange={handleLoginFieldOnChange("securityCode", setSecurityCode)}
              error={loginErrorFields.securityCode}
              id="security-code"
            />
          </FormFieldWrapper>
        )
      }
      <Button
        textValue={isLoading ? <Loader /> : "Sign In"}
        className="formButtonStyle"
        disabled={isLoading}
        data-testid="login-submit-btn"
      />
      <div className="flex justify-center">
        <button onClick={handleForgotPassword}>
          <div className="group flex gap-2 items-end text-[14px]">
            <span className="group-hover:underline underline-offset-4 text-[#1bddf3]">Forgot password</span>
          </div>
        </button>
      </div>

      {generalError && <ErrorMessage message={generalError} />}
    </Form>
  );
}
