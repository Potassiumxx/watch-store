import * as React from "react";
import useDirtyField from "./useDirtyField";
import { ACTION_TYPES, GENERAL_ERROR_KEY } from "../utils/constants";
import { applyFieldErrors, errorHandler } from "../utils/errorHandler";
import { APIErrorReturnType } from "../types/form";
// import { FormAPIData } from "../types/form";

interface HandleFormSubmitParameter<V> {
  apiCall: () => Promise<unknown>;
  setError: (field: keyof V, message: string) => void;
}

export default function useFormError<T extends { [key: string]: boolean }>(initialState: T) {
  const [generalError, setGeneralError] = React.useState<string | null>();
  const [dirtyField, dispatchDirtyFieldReducer] = useDirtyField<T>(initialState);

  /**
   * Handles errors like networks and server errors, no route/API found errors, etc. related to backend connection
   */
  function handleFormAPIError<V>(error: unknown): APIErrorReturnType<V> {
    const errorMessage = errorHandler(error);
    if (GENERAL_ERROR_KEY in errorMessage) {
      setGeneralError(errorMessage[GENERAL_ERROR_KEY]);
      return errorMessage as APIErrorReturnType<V>;
    }
    return errorMessage as APIErrorReturnType<V>;
  }

  // Used 'V' instead of 'T' for generic type so that it doesn't get confusing since there's a 'T' in parent too
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

  async function handleFormSubmit<V extends { [K in keyof V]: string | undefined }>({
    apiCall,
    setError,
  }: HandleFormSubmitParameter<V>): Promise<void> {
    setGeneralError(null);
    try {
      const data = await apiCall();
      dispatchDirtyFieldReducer({ type: "RESET_ALL" });
      console.log(data);
    } catch (error) {
      console.log(error);
      const fieldErrorMessage = handleFormAPIError<V>(error);
      console.log(fieldErrorMessage);
      applyFieldErrors<V>(fieldErrorMessage, setError);
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
  };
}
