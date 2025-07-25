import { create } from "zustand";

interface UserStore {
  globalUsername: string;
  setGlobalUsername: (globalUsername: string) => void;
  globalEmail: string;
  setGlobalEmail: (globalEmail: string) => void;
  role: string;
  setRole: (role: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  globalUsername: "",
  setGlobalUsername: (globalUsername) => set({ globalUsername: globalUsername }),

  globalEmail: "",
  setGlobalEmail: (globalEmail) => set({ globalEmail: globalEmail }),

  role: "",
  setRole: (role) => set({ role: role }),
}));
