import axios from "axios";
import { GENERAL_ERROR_KEY } from "./constants";

/**
 * Handles errors returned from the backend or network issues.
 *
 * @param error - The error object received, typically from an API call.
 * @returns An object where each key is a form field (or general key) and each value is the corresponding error message.
 * - If the error is a network issue, a general error message is returned.
 * - If the backend returns field-level authentication errors (e.g., { email: "Invalid" }), they are passed through the way they were sent from backend (as object).
 */
export function errorHandler(error: unknown): Record<string, string> {
  if (axios.isAxiosError(error)) {
    console.log(error);
    if (error.code == "ERR_NETWORK" || error.message == "Network Error") {
      return { [GENERAL_ERROR_KEY]: "Unable to connect to server, please try again later." };
    }

    if (typeof error.response?.data == "object" && "errors" in error.response.data) return error.response.data.errors;

    return { [GENERAL_ERROR_KEY]: error.response?.data ?? "Unknown error from server." };
  } else {
    return { [GENERAL_ERROR_KEY]: "Something went wrong. Please try again later." };
  }
}

/**
 * Applies field-level error messages to form state.
 *
 * @template T - The shape of the form's input fields.
 * @param fieldErrors - A partial object of form field names mapped to their corresponding error messages.
 * @param setError - A function that sets an error message for a given field of type T.
 *
 * This function is typically used after validation or API calls that return field-specific errors.
 */
export function applyFieldErrors<T extends { [K in keyof T]: string | undefined }>(
  fieldErrors: Partial<T>,
  setError: (field: keyof T, message: string) => void
): void {
  for (const field in fieldErrors) {
    const key = field as keyof T;
    setError(key, fieldErrors[key]!);
  }
}
