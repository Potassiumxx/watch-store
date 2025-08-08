import { create } from "zustand";

interface NavbarStore {
  searchedValue: string;
  setSearchedValue: (searchedValue: string) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  searchedValue: "",
  setSearchedValue: (searchedValue) => set({ searchedValue: searchedValue }),
}));
