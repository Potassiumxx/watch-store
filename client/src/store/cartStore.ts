import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
  category: string;
  availableStock: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) => {
    const existingItem = get().cartItems.find((i) => i.id === item.id);
    if (existingItem && existingItem.quantity >= existingItem.availableStock) return;

    let updatedCart;
    if (existingItem) {
      updatedCart = get().cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: Math.min(i.quantity + item.quantity, item.availableStock) } : i
      );
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imagePath: item.imagePath,
        category: item.category,
        availableStock: item.availableStock,
      };
      updatedCart = [...get().cartItems, newItem];
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
    const updatedCart = get().cartItems.map((item) => {
      if (item.id === id) {
        const maxQuantity = item.availableStock;
        const safeQuantity = Math.min(quantity, maxQuantity);
        return { ...item, quantity: safeQuantity };
      }
      return item;
    });
    set({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cart");
  },
}));
