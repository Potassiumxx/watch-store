import { create } from "zustand";
import {
  ProductFormStringFields,
  ProductFormFileField,
  ProductStringFormValidationReturnType,
  ProductFileFormValidationReturnType,
  ProductCategoryFormFields,
  ProductFormFields,
} from "../types/productType";

interface ProductStore extends ProductFormStringFields, ProductFormFileField, ProductCategoryFormFields {
  productID?: string;

  productStringErrorFields: Partial<ProductStringFormValidationReturnType>;
  productFileName: string;
  productFileErrorFields: { productImage?: string };

  setFieldValue: <K extends keyof ProductFormFields>(field: K, value: ProductFormFields[K]) => void;

  setProductStringFormError: (inputField: keyof ProductStringFormValidationReturnType, message: string) => void;
  setProductFileFormError: (inputField: keyof ProductFileFormValidationReturnType, message: string) => void;
  setProductFileName: (fileName: string) => void;

  clearProductFormFieldsValues: () => void;
  clearProductStringFormError: () => void;
  clearProductFileFormError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  productID: "",
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

  setFieldValue: (field, value) => set({ [field]: value }),

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
