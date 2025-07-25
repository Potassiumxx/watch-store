import { create } from "zustand";

interface SideBarStore {
  showUserMenu: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
}

export const useUIStore = create<SideBarStore>((set) => ({
  showUserMenu: false,
  setShowUserMenu: (showUserMenu) => set({ showUserMenu: showUserMenu }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  navbarHeight: 0,
  setNavbarHeight: (height) => set({ navbarHeight: height }),
}));
