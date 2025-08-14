import * as React from "react";
import { useAuthStore } from "../../../../store/authStore";
import { registerUser } from "../../../../services/api/auth/authAPI";
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
  const securityCode = useAuthStore((state) => state.securityCode);

  const setRegisterEmail = useAuthStore((state) => state.setRegisterEmail);
  const setRegisterPassword = useAuthStore((state) => state.setRegisterPassword);
  const setRegisterUsername = useAuthStore((state) => state.setRegisterUsername);
  const setSecurityCode = useAuthStore((state) => state.setSecurityCode);

  const setRegisterError = useAuthStore((state) => state.setRegisterError);
  const regiserErrorFields = useAuthStore((state) => state.registerErrorFields);

  const clearRegisterErrors = useAuthStore((state) => state.clearRegisterErrors);

  const isLoading = useUIStore((state) => state.isLoading);

  const [isUsernameFocused, setIsUsernameFocused] = React.useState<boolean>(false);
  const [isSecurityCodeFocused, setIsSecurityCodeFocused] = React.useState<boolean>(false);

  const initialDirtyFieldState: DirtyFieldState<RegisterFields> = {
    email: false,
    password: false,
    username: false,
    securityCode: false,
  };

  const { dirtyField, generalError, isValidationError, handleFormSubmit, handleFieldOnChange, handleSuccessfulResponse } =
    useForm<DirtyFieldState<RegisterFields>>(initialDirtyFieldState);

  function handleRegisterFieldOnChange(
    fieldKey: keyof RegisterFields,
    setter: (value: string) => void
  ) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      handleFieldOnChange<RegisterFields>({
        fieldKey,
        newValue,
        allFormValues: {
          email: registerEmail,
          password: registerPassword,
          username: registerUsername,
          securityCode: securityCode,
        },
        formValueSetter: setter,
        validateFunction: validateRegisterForm,
        setFieldErrorFunction: setRegisterError,
        clearErrorsFunction: clearRegisterErrors,
        dirtyField,
      });
    };
  }

  async function handleRegisterFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateRegisterForm({
      email: registerEmail,
      password: registerPassword,
      username: registerUsername,
      securityCode: securityCode,
    });

    if (isValidationError<RegisterFields>(validationError, setRegisterError)) return;

    const response = await handleFormSubmit<RegisterFields, LoginAndRegisterResponse>({
      apiCall: () => registerUser({ registerEmail, registerPassword, registerUsername, securityCode }),
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
            onChange={handleRegisterFieldOnChange("username", setRegisterUsername)}
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
          onChange={handleRegisterFieldOnChange("email", setRegisterEmail)}
          error={regiserErrorFields.email}
          id="register-email"
        />
      </FormFieldWrapper>
      <FormFieldWrapper error={regiserErrorFields.password} label="Password" id="register-password" labelClassName="flex">
        <Input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={handleRegisterFieldOnChange("password", setRegisterPassword)}
          error={regiserErrorFields.password}
          id="register-password"
        />
      </FormFieldWrapper>
      <div>
        <FormFieldWrapper error={regiserErrorFields.securityCode} label="Security Code" id="security-code" labelClassName="flex whitespace-nowrap">
          <Input
            type="password"
            placeholder="Security Code"
            value={securityCode}
            onChange={handleRegisterFieldOnChange("securityCode", setSecurityCode)}
            onFocus={() => setIsSecurityCodeFocused(true)}
            onBlur={() => setIsSecurityCodeFocused(false)}
            error={regiserErrorFields.securityCode}
            id="security-code"
          />
        </FormFieldWrapper>
        {
          <div
            className={`${isSecurityCodeFocused ? "opacity-100 h-full" : "opacity-0 h-0"
              } overflow-hidden transition-all duration-200 text-[13px] text-white}`}>
            <div className={`font-semibold text-white flex flex-col`}>
              <span>- Use this code to reset your password if forgotten.</span>
              <span>- Keep it secret and don’t share with anyone.</span>
            </div>
          </div>
        }
      </div>
      <Button textValue={isLoading ? <Loader /> : "Sign Up"} className="formButtonStyle" disabled={isLoading} />

      {generalError && <ErrorMessage message={generalError} className="text-center w-full" />}
    </Form>
  );
}
