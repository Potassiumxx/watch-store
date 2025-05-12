import axios from "axios";

export function errorHandler(error: unknown): Record<string, string> {
  if (axios.isAxiosError(error)) {
    console.log(error);
    if (error.code == "ERR_NETWORK" || error.message == "Network Error") {
      return { message: "Unable to connect to server, please try again later." };
    }

    if (typeof error.response?.data == "object" && "errors" in error.response.data) return error.response.data.errors;

    return { message: error.response?.data ?? "Unknown error from server." };
  } else {
    return { message: "Something went wrong. Please try again later." };
  }
}
