import axios from "axios";
import { GENERAL_ERROR_KEY } from "./constants";

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

export function applyFieldErrors<T extends { [K in keyof T]: string | undefined }>(
  fieldErrors: Partial<T>,
  setError: (field: keyof T, message: string) => void
): void {
  for (const field in fieldErrors) {
    const key = field as keyof T;
    setError(key, fieldErrors[key]!);
  }
}
