import { create } from "zustand";

interface LoginErrors {
  email?: string;
  password?: string;
}

interface RegisterErrors {
  email?: string;
  password?: string;
  username?: string;
}

interface AuthStore {
  loginEmail: string;
  loginPassword: string;

  registerEmail: string;
  registerPassword: string;
  registerUsername: string;

  loginErrors: LoginErrors;
  registerErrors: RegisterErrors;

  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;

  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (email: string) => void;
  setRegisterUsername: (email: string) => void;

  setLoginError: (inputField: keyof LoginErrors, message: string) => void;
  setRegisterError: (inputField: keyof RegisterErrors, message: string) => void;

  clearLoginErrors: () => void;
  clearRegisterErrors: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginEmail: "",
  loginPassword: "",

  registerEmail: "",
  registerPassword: "",
  registerUsername: "",

  loginErrors: {},
  registerErrors: {},

  setLoginEmail: (email) => set({ loginEmail: email }),
  setLoginPassword: (password) => set({ loginPassword: password }),

  setRegisterEmail: (email) => set({ registerEmail: email }),
  setRegisterPassword: (password) => set({ registerPassword: password }),
  setRegisterUsername: (username) => set({ registerUsername: username }),

  setLoginError: (inputField, message) =>
    set((state) => ({
      loginErrors: { ...state.loginErrors, [inputField]: message },
    })),

  setRegisterError: (inputField, message) =>
    set((state) => ({
      registerErrors: { ...state.registerErrors, [inputField]: message },
    })),

  clearLoginErrors: () => set({ loginErrors: {} }),
  clearRegisterErrors: () => set({ registerErrors: {} }),
}));
