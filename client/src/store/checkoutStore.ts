import { create } from "zustand";
import { CartItem, CheckoutFormFields, CheckoutItem } from "../types/cartAndCheckoutType";

interface CheckoutStore extends CheckoutFormFields {
  checkoutItems: CheckoutItem[];
  setCheckoutItems: (cartItems: CartItem[]) => void;

  setDropLocation: (dropLocation: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setCardNumber: (cardNumber: string) => void;
  setExpiry: (expiry: string) => void;
  setCvv: (cvv: string) => void;

  checkoutFormErrorFields: Partial<CheckoutFormFields>;

  setCheckoutFormError: (inputField: keyof CheckoutFormFields, message: string) => void;
  clearCheckoutFormError: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutItems: [],
  setCheckoutItems: (cartItems) => set({ checkoutItems: cartItems }),

  dropLocation: "",
  phoneNumber: "",
  cardNumber: "",
  expiry: "",
  cvv: "",

  setDropLocation: (dropLocation) => set({ dropLocation: dropLocation }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber }),
  setCardNumber: (cardNumber) => set({ cardNumber: cardNumber }),
  setExpiry: (expiry) => set({ expiry: expiry }),
  setCvv: (cvv) => set({ cvv: cvv }),

  checkoutFormErrorFields: {},

  setCheckoutFormError: (inputField, message) =>
    set((state) => ({
      checkoutFormErrorFields: { ...state.checkoutFormErrorFields, [inputField]: message },
    })),

  clearCheckoutFormError: () => set({ checkoutFormErrorFields: {} }),
}));
