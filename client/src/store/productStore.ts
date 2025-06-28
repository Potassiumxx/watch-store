import { create } from "zustand";
import { ProductFormFields } from "../types/form";

interface ProductStore {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  productImage: string;

  productErrorFields: Partial<ProductFormFields>;

  setProductName: (name: string) => void;
  setProductPrice: (price: string) => void;
  setProductCategory: (category: string) => void;
  setProductDescription: (description: string) => void;
  setProductImage: (image: string) => void;

  setProductFormError: (inputField: keyof ProductFormFields, message: string) => void;

  clearProductFormError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  productName: "",
  productPrice: "",
  productCategory: "",
  productDescription: "",
  productImage: "",

  productErrorFields: {},

  setProductName: (name) => set({ productName: name }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductCategory: (category) => set({ productCategory: category }),
  setProductDescription: (description) => set({ productDescription: description }),
  setProductImage: (image) => set({ productImage: image }),

  setProductFormError: (inputField, message) =>
    set((state) => ({
      productErrorFields: { ...state.productErrorFields, [inputField]: message },
    })),

  clearProductFormError: () => set({ productErrorFields: {} }),
}));
