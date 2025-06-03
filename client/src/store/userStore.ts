import { create } from "zustand";

interface UserStore {
  globalUsername: string;
  setGlobalUsername: (globalUsername: string) => void;
  globalEmail: string;
  setGlobalEmail: (globalEmail: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  globalUsername: "",
  setGlobalUsername: (globalUsername) => set({ globalUsername: globalUsername }),

  globalEmail: "",
  setGlobalEmail: (globalEmail) => set({ globalEmail: globalEmail }),
}));
