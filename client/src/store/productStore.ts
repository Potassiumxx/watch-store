import { create } from "zustand";
import {
  ProductFormStringFields,
  ProductFormFileField,
  ProductStringFormValidationReturnType,
  ProductFileFormValidationReturnType,
  ProductCategoryFormFields,
} from "../types/productType";

interface ProductStore extends ProductFormStringFields, ProductFormFileField, ProductCategoryFormFields {
  productStringErrorFields: Partial<ProductStringFormValidationReturnType>;
  productFileName: string;
  productFileErrorFields: { productImage?: string };

  setProductName: (name: string) => void;
  setProductPrice: (price: string) => void;
  setProductCategory: (category: string) => void;
  setProductDescription: (description: string) => void;
  setProductQuantity: (quantity: string) => void;
  setProductImage: (image: File | null) => void;
  setNewProductCategory: (newCategory: string) => void;

  setProductStringFormError: (inputField: keyof ProductStringFormValidationReturnType, message: string) => void;
  setProductFileFormError: (inputField: keyof ProductFileFormValidationReturnType, message: string) => void;
  setProductFileName: (fileName: string) => void;

  clearProductFormFieldsValues: () => void;
  clearProductStringFormError: () => void;
  clearProductFileFormError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  productName: "",
  productPrice: "",
  productCategory: "",
  productDescription: "",
  productQuantity: "",
  productImage: null,
  productFileName: "",
  newProductCategory: "",

  productStringErrorFields: {},
  productFileErrorFields: {},

  setProductName: (name) => set({ productName: name }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductCategory: (category) => set({ productCategory: category }),
  setProductDescription: (description) => set({ productDescription: description }),
  setProductQuantity: (quantity) => set({ productQuantity: quantity }),
  setProductImage: (image) => set({ productImage: image }),
  setNewProductCategory: (newCategory) => set({ newProductCategory: newCategory }),

  setProductStringFormError: (inputField, message) =>
    set((state) => ({
      productStringErrorFields: { ...state.productStringErrorFields, [inputField]: message },
    })),

  setProductFileFormError: (inputField, message) => {
    set(() => ({
      productFileErrorFields: { [inputField]: message },
    }));
  },

  setProductFileName: (fileName) => set({ productFileName: fileName }),

  clearProductFormFieldsValues: () =>
    set({
      productName: "",
      productPrice: "",
      productCategory: "",
      productDescription: "",
      productImage: null,
    }),
  clearProductStringFormError: () => set({ productStringErrorFields: {} }),
  clearProductFileFormError: () => set({ productFileErrorFields: {} }),
}));
