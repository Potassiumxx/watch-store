import { create } from "zustand";
import { ProductStore } from "../../types/productType";

export const useUpdateProductStore = create<ProductStore>((set) => ({
  productID: "",
  productName: "",
  productPrice: "",
  productCategory: "",
  productDescription: "",
  productQuantity: "",
  productImage: null,
  productFileName: "",

  productStringErrorFields: {},
  productFileErrorFields: {},

  setProductID: (id) => set({ productID: id }),
  setProductName: (name) => set({ productName: name }),
  setProductPrice: (price) => set({ productPrice: price }),
  setProductCategory: (category) => set({ productCategory: category }),
  setProductDescription: (description) => set({ productDescription: description }),
  setProductQuantity: (quantity) => set({ productQuantity: quantity }),
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

  setProductFileName: (fileName) => set({ productFileName: fileName }),

  clearProductStringFormError: () => set({ productStringErrorFields: {} }),
  clearProductFileFormError: () => set({ productFileErrorFields: {} }),
}));
