import { create } from "zustand";

interface SideBarStore {
  showUserMenu: boolean;
  showCart: boolean;
  setShowUserMenu: (showUserMenu: boolean) => void;
  setShowCart: (showCart: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;

  showSuccessfulCheckoutPage: boolean;
  setShowSuccessfulCheckoutPage: (show: boolean) => void;

  showUpdateProductForm: boolean;
  setShowUpdateProductForm: (show: boolean) => void;
}

export const useUIStore = create<SideBarStore>((set) => ({
  showUserMenu: false,
  showCart: false,
  setShowUserMenu: (showUserMenu) => set({ showUserMenu: showUserMenu }),
  setShowCart: (showCart) => set({ showCart: showCart }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  navbarHeight: 0,
  setNavbarHeight: (height) => set({ navbarHeight: height }),

  showSuccessfulCheckoutPage: false,
  setShowSuccessfulCheckoutPage: (show) => set({ showSuccessfulCheckoutPage: show }),

  showUpdateProductForm: false,
  setShowUpdateProductForm: (show) => set({ showUpdateProductForm: show }),
}));
