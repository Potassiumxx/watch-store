/**
 * Represents shape of product form fields that stores string values only.
 */
export interface ProductFormStringFields {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  productQuantity: string;
}

/**
 * Represents shape of product form fields that stores files only.
 */
export interface ProductFormFileField {
  productImage: File | null;
}

/**
 * Represents shape of product form fields and their validation error message's return type.
 *
 * If there's a validation error, this interface represents the error message's type, which is usually string .
 */

export type ProductStringFormValidationReturnType = Partial<ProductFormStringFields>;

export type ProductFileFormValidationReturnType = {
  productImage?: string;
};

export interface ProductCategoryFormFields {
  newProductCategory: string;
}

export type ProductFormFields = ProductFormStringFields & ProductFormFileField;

export interface ProductFormResponse {
  message: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  imagePath: string;
}

export interface CategoryDTO {
  id: number;
  categoryName: string;
  productCount: number;
}

export interface ProductStore extends ProductFormStringFields, ProductFormFileField {
  productID?: string;
  productStringErrorFields: Partial<ProductStringFormValidationReturnType>;
  productFileName: string;
  productFileErrorFields: { productImage?: string };

  setProductID?: (id: string) => void;
  setProductName: (name: string) => void;
  setProductPrice: (price: string) => void;
  setProductCategory: (category: string) => void;
  setProductDescription: (description: string) => void;
  setProductQuantity: (quantity: string) => void;
  setProductImage: (image: File | null) => void;

  setProductStringFormError: (inputField: keyof ProductStringFormValidationReturnType, message: string) => void;
  setProductFileFormError: (inputField: keyof ProductFileFormValidationReturnType, message: string) => void;
  setProductFileName: (fileName: string) => void;

  clearProductStringFormError: () => void;
  clearProductFileFormError: () => void;
}
