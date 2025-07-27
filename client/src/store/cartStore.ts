import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) => {
    const existing = get().cartItems.find((i) => i.id === item.id);
    let updatedCart;
    if (existing) {
      updatedCart = get().cartItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      updatedCart = [...get().cartItems, item];
    }
    set({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  removeFromCart: (id) => {
    const updatedCart = get().cartItems.filter((item) => item.id !== id);
    set({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  updateQuantity: (id, quantity) => {
    const updatedCart = get().cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
    set({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cart");
  },
}));
