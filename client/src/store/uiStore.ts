import { create } from "zustand";

interface SideBarStore {
  showUserMenu: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUIStore = create<SideBarStore>((set) => ({
  showUserMenu: false,
  setShowUserMenu: (showUserMenu) => set({ showUserMenu: showUserMenu }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}));
