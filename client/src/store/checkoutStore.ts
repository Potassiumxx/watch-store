import { create } from "zustand";
import { CartItem, CheckoutItem } from "../types/cartAndCheckoutType";

interface CheckoutStore {
  checkoutItems: CheckoutItem[];
  setCheckoutItems: (cartItems: CartItem[]) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutItems: [],
  setCheckoutItems: (cartItems) => set({ checkoutItems: cartItems }),
}));
