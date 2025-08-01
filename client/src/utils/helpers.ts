import axios from "axios";

export function isEmpty(value?: string): boolean {
  return !value?.trim();
}

export function fetchErrorCatcher(error: unknown, setErrorFunc: (error: string) => void): void {
  if (axios.isAxiosError(error)) {
    console.log(error.code ?? "ERR_NETWORK");
    setErrorFunc("A network error occured. Check your internet or try again later.");
  } else {
    console.log("Unknown error", error);
    setErrorFunc("An unexpected error occured. Could be a problem from the server, try again later.");
  }
}
