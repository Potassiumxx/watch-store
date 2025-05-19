import * as React from "react";
import useDirtyField from "./useDirtyField";
import { ACTION_TYPES, GENERAL_ERROR_KEY } from "../utils/constants";
import { applyFieldErrors, errorHandler } from "../utils/errorHandler";

export default function useFormError<T extends { [key: string]: boolean }>(initialState: T) {
  const [generalError, setGeneralError] = React.useState<string | null>();
  const [dirtyField, dispatchDirtyFieldReducer] = useDirtyField<T>(initialState);

  /**
   * Handles errors like networks and server errors, no route/API found errors, etc. related to backend connection
   */
  function handleFormAPIError(error: unknown): Record<string, string> {
    const errorMessage = errorHandler(error);
    if (GENERAL_ERROR_KEY in errorMessage) {
      setGeneralError(errorMessage[GENERAL_ERROR_KEY]);
      return errorMessage;
    }
    return errorMessage;
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

  return {
    generalError,
    setGeneralError,
    dirtyField,
    dispatchDirtyFieldReducer,
    handleFormAPIError,
    isValidationError,
  };
}
