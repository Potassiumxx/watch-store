import { create } from "zustand";

interface UserStore {
  globalUsername: string;
  setGlobalUsername: (globalUsername: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  globalUsername: "",
  setGlobalUsername: (globalUsername) => set({ globalUsername: globalUsername }),
}));
