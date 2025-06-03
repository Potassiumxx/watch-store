import { create } from "zustand";
import { LoginFields, RegisterFields } from "../types/form";

interface AuthStore {
  loginEmail: string;
  loginPassword: string;

  registerEmail: string;
  registerPassword: string;
  registerUsername: string;

  loginErrorFields: LoginFields;
  registerErrorFields: RegisterFields;

  isUserSignedIn: boolean;

  isJWTChecked: boolean;

  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;

  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (email: string) => void;
  setRegisterUsername: (email: string) => void;

  setLoginError: (inputField: keyof LoginFields, message: string) => void;
  setRegisterError: (inputField: keyof RegisterFields, message: string) => void;

  userSignedIn: () => void;
  userSignedOut: () => void;

  setIsJWTChecked: (isJWTChecked: boolean) => void;

  clearLoginErrors: () => void;
  clearRegisterErrors: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginEmail: "",
  loginPassword: "",

  registerEmail: "",
  registerPassword: "",
  registerUsername: "",

  loginErrorFields: {},
  registerErrorFields: {},

  isUserSignedIn: false,

  isJWTChecked: false,

  setLoginEmail: (email) => set({ loginEmail: email }),
  setLoginPassword: (password) => set({ loginPassword: password }),

  setRegisterEmail: (email) => set({ registerEmail: email }),
  setRegisterPassword: (password) => set({ registerPassword: password }),
  setRegisterUsername: (username) => set({ registerUsername: username }),

  setLoginError: (inputField, message) =>
    set((state) => ({
      loginErrorFields: { ...state.loginErrorFields, [inputField]: message },
    })),

  setRegisterError: (inputField, message) =>
    set((state) => ({
      registerErrorFields: { ...state.registerErrorFields, [inputField]: message },
    })),

  userSignedIn: () => set({ isUserSignedIn: true }),
  userSignedOut: () => set({ isUserSignedIn: false }),

  setIsJWTChecked: (isJWTChecked) => set({ isJWTChecked: isJWTChecked }),

  clearLoginErrors: () => set({ loginErrorFields: {} }),
  clearRegisterErrors: () => set({ registerErrorFields: {} }),
}));
