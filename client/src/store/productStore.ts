import { create } from "zustand";
import {
  ProductFormStringFields,
  ProductFormFileField,
  ProductStringFormValidationReturnType,
  ProductFileFormValidationReturnType,
} from "../types/productType";

interface ProductStore extends ProductFormStringFields, ProductFormFileField {
  productStringErrorFields: Partial<ProductStringFormValidationReturnType>;
  productFileErrorFields: { productImage?: string };

  setProductName: (name: string) => void;
  setProductPrice: (price: string) => void;
  setProductCategory: (category: string) => void;
  setProductDescription: (description: string) => void;
  setProductImage: (image: File | null) => void;

  setProductStringFormError: (inputField: keyof ProductStringFormValidationReturnType, message: string) => void;
  setProductFileFormError: (inputField: keyof ProductFileFormValidationReturnType, message: string) => void;

  clearProductStringFormError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  productName: "",
  productPrice: "",
  productCategory: "",
  productDescription: "",
  productImage: null,

  productStringErrorFields: {},
  productFileErrorFields: {},

  setProductName: (name) => set({ productName: name }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductCategory: (category) => set({ productCategory: category }),
  setProductDescription: (description) => set({ productDescription: description }),
  setProductImage: (image) => set({ productImage: image }),

  setProductStringFormError: (inputField, message) =>
    set((state) => ({
      productStringErrorFields: { ...state.productStringErrorFields, [inputField]: message },
    })),

  setProductFileFormError: (inputField, message) => {
    set(() => ({
      productFileErrorFields: { [inputField]: message },
    }));
  },

  clearProductStringFormError: () => set({ productStringErrorFields: {} }),
}));
