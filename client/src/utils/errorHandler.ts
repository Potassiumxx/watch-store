import axios from "axios";

export function errorHandler(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code == "ERR_NETWORK" || error.message == "Network Error") {
      return "Unable to connect to server, please try again later.";
    }
    return error.response?.data ?? "Unknown error from server.";
  } else {
    return "Something went wrong. Please try again later.";
  }
}
