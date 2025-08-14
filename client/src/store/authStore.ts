import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginFields, RegisterFields } from "../types/authType";

interface AuthStore {
  loginEmail: string;
  loginPassword: string;

  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
  securityCode: string;

  loginErrorFields: LoginFields;
  registerErrorFields: RegisterFields;

  isUserSignedIn: boolean;

  isJWTChecked: boolean;

  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;

  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (email: string) => void;
  setRegisterUsername: (email: string) => void;
  setSecurityCode: (securityCode: string) => void;

  setLoginError: (inputField: keyof LoginFields, message: string) => void;
  setRegisterError: (inputField: keyof RegisterFields, message: string) => void;

  userSignedIn: () => void;
  userSignedOut: () => void;

  setIsJWTChecked: (isJWTChecked: boolean) => void;

  clearLoginErrors: () => void;
  clearRegisterErrors: () => void;

  clearAllValues: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      loginEmail: "",
      loginPassword: "",

      registerEmail: "",
      registerPassword: "",
      registerUsername: "",
      securityCode: "",

      loginErrorFields: {},
      registerErrorFields: {},

      isUserSignedIn: false,

      isJWTChecked: false,

      setLoginEmail: (email) => set({ loginEmail: email }),
      setLoginPassword: (password) => set({ loginPassword: password }),

      setRegisterEmail: (email) => set({ registerEmail: email }),
      setRegisterPassword: (password) => set({ registerPassword: password }),
      setRegisterUsername: (username) => set({ registerUsername: username }),
      setSecurityCode: (securityCode) => set({ securityCode: securityCode }),

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

      clearAllValues: () =>
        set({
          loginEmail: "",
          loginPassword: "",

          registerEmail: "",
          registerPassword: "",
          registerUsername: "",
          securityCode: "",

          loginErrorFields: {},
          registerErrorFields: {},
        }),
    }),
    {
      name: "user",
      partialize: (state) => ({
        isUserSignedIn: state.isUserSignedIn,
      }),
    }
  )
);
