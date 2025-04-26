import { create } from "zustand";

type AuthStore = {
  loginEmail: string;
  loginPassword: string;
  errorMessage: string;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setErrorMessage: (message: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  loginEmail: "",
  loginPassword: "",
  errorMessage: "",

  setLoginEmail: (email) => set({ loginEmail: email }),
  setLoginPassword: (password) => set({ loginPassword: password }),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
