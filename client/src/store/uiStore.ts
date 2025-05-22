import { create } from "zustand";

interface SideBarStore {
  showUserMenu: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
}

export const useSideBarStore = create<SideBarStore>((set) => ({
  showUserMenu: false,
  setShowUserMenu: (showUserMenu) => set({ showUserMenu: showUserMenu }),
}));
