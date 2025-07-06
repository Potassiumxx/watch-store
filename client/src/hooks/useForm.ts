import * as React from "react";
import useDirtyField from "./useDirtyField";
import { ACTION_TYPES, GENERAL_ERROR_KEY } from "../utils/constants";
import { applyFieldErrors, errorHandler } from "../utils/errorHandler";
import { APIErrorReturnType } from "../types/form";
import { LoginAndRegisterResponse } from "../types/authType";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";
import { useUserStore } from "../store/userStore";

interface HandleFormSubmitParameter<V, R> {
  apiCall: () => Promise<R>;
  setError: (field: keyof V, message: string) => void;
}

interface handleFieldOnChangeParamter<InputFieldType> {
  fieldKey: keyof InputFieldType;
  newValue: string;
  allFormValues: InputFieldType;
  formValueSetter: (value: string) => void;
  validateFunction: (fields: InputFieldType) => Partial<InputFieldType>;
  setFieldErrorFunction: (inputField: keyof InputFieldType, errorMessage: string) => void;
  clearErrorsFunction: () => void;
  dirtyField: { [K in keyof InputFieldType]: boolean };
}

/**
 * Custom hook that contains form's error, submit and its field's onChange handling.
 *
 * @param initialState Initial state of form in **object** with keys as **string** and values as **boolean**.
 * @returns
 */
export default function useForm<T extends { [key: string]: boolean }>(initialState: T) {
  const [generalError, setGeneralError] = React.useState<string | null>();
  const [dirtyField, dispatchDirtyFieldReducer] = useDirtyField<T>(initialState);

  const userSignedIn = useAuthStore((state) => state.userSignedIn);

  const setShowUserMenu = useUIStore((state) => state.setShowUserMenu);
  const setIsLoading = useUIStore((state) => state.setIsLoading);

  const setGlobalUsername = useUserStore((state) => state.setGlobalUsername);
  const setGlobalEmail = useUserStore((state) => state.setGlobalEmail);

  // Used 'V' instead of 'T' for generic type from now on so that it doesn't get confusing since there's a 'T' in parent too

  /**
   * Handles networks and server errors, no route/API found errors, etc. related to backend connection
   *
   * @template V  The shape of the form field data (e.g., LoginFields, RegisterFields, etc.)
   * @returns Basically object, with `GENERAL_ERROR_KEY` key and `errorMessage` message.
   */
  function handleFormAPIError<V>(error: unknown): APIErrorReturnType<V> {
    const errorMessage = errorHandler(error);
    if (GENERAL_ERROR_KEY in errorMessage) {
      setGeneralError(errorMessage[GENERAL_ERROR_KEY]);
      return errorMessage as APIErrorReturnType<V>;
    }
    return errorMessage as APIErrorReturnType<V>;
  }

  /**
   * Handles form validation error handling.
   *
   * @template V The shape of the form field data (e.g., LoginFields, RegisterFields).
   * @param validationError An object of type V containing field names and their error messages.
   * @param setError Function to set errors for the form of type V, called only if errors exist.
   * @returns True if there were validation errors, otherwise false.
   */
  function isValidationError<V extends { [K in keyof V]: string | undefined }>(
    validationError: V,
    setError: (field: keyof V, message: string) => void
  ): boolean {
    if (Object.keys(validationError).length > 0) {
      dispatchDirtyFieldReducer({ type: ACTION_TYPES.SET_ALL_DIRTY });
      applyFieldErrors<V>(validationError, setError);
      return true;
    }
    return false;
  }

  /**
   * Handles authentication after successfully submitting the form
   *
   * @template V  The shape of the form field data (e.g., LoginFields, RegisterFields, etc.)
   * @template R The return shape of the form field data (e,g, LoginResponse, RegiserResponse, etc.)
   * @param apiCall Function that sends data to the backend and returns response from the backend.
   * @param setError Function to set errors for the form of type V, called only if errors exist.
   * @returns Promise<void>
   */
  async function handleFormSubmit<V extends { [K in keyof V]: string | undefined }, R>({
    apiCall,
    setError,
  }: HandleFormSubmitParameter<V, R>): Promise<R | undefined> {
    setGeneralError(null);
    setIsLoading(true);
    try {
      const data = await apiCall();
      dispatchDirtyFieldReducer({ type: "RESET_ALL" });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      const fieldErrorMessage = handleFormAPIError<V>(error);
      console.log(fieldErrorMessage);
      applyFieldErrors<V>(fieldErrorMessage, setError);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Handles field-level updates and conditional validation for form inputs.
   *
   * This function is primarily used for "dirty field" validation:
   * - It runs live field-level validation **only after** a form has already failed validation once.
   *
   * @template InputFieldType The shape of the form field data (e.g., LoginFields, RegisterFields, etc).
   * @param fieldKey Key of InputFieldType (e.g., "email", "password", etc).
   * @param newValue Value that was changed (e.g., email, password) which is supposed to be updated.
   * @param allFormValues An object with all fields and values of type `InputFieldType` (e.g., {email: "..", password: ".."}).
   * @param formValueSetter Function to set value of individual form field (e.g., setLoginEmail, setRegisterEmail, etc).
   * @param validateFunction Function to validate form (e.g., validateLoginForm, validateRegisterForm, etc).
   * @param setFieldErrorFunction Function to set error for form fields (e.g., setLoginError, setRegisterError, etc).
   * @param clearErrorsFunction Function to clear any errors in login form after a successfull validation
   * @param dirtyField Object to indicate which field has been set with "dirty" (for validation)
   * @returns
   */
  function handleFieldOnChange<InputFieldType extends { [K in keyof InputFieldType]: string | undefined }>({
    fieldKey,
    newValue,
    allFormValues,
    formValueSetter,
    validateFunction,
    setFieldErrorFunction,
    clearErrorsFunction,
    dirtyField,
  }: handleFieldOnChangeParamter<InputFieldType>): void {
    formValueSetter(newValue);
    if (dirtyField[fieldKey]) {
      const updatedFormValue = { ...allFormValues, [fieldKey]: newValue };

      const validationError = validateFunction(updatedFormValue);

      // If the validation is successfull
      if (!(fieldKey in validationError)) {
        clearErrorsFunction();
      }

      applyFieldErrors<InputFieldType>(validationError, setFieldErrorFunction);
    }
  }

  /**
   * Handles the logic after successful response from the backend after login or register is successful.
   * @param response Response sent from the backend. May include object with keys and values or undefined.
   */
  async function handleSuccessfulResponse(response: LoginAndRegisterResponse): Promise<void> {
    if (response) {
      localStorage.setItem("token", response.token);

      userSignedIn();
      setShowUserMenu(false);
      setGlobalUsername(localStorage.getItem("username") || "Where is the username?");
      setGlobalEmail(localStorage.getItem("email") || "No Email, visit your local police department");
    }
  }

  return {
    generalError,
    setGeneralError,
    dirtyField,
    dispatchDirtyFieldReducer,
    handleFormAPIError,
    isValidationError,
    handleFormSubmit,
    handleFieldOnChange,
    handleSuccessfulResponse,
  };
}
