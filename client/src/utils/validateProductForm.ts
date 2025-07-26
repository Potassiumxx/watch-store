import { DirtyFieldState } from "../types/form";
import {
  ProductFormStringFields,
  ProductStringFormValidationReturnType,
  ProductFileFormValidationReturnType,
  ProductFormFields,
  ProductFormFileField,
} from "../types/productType";

import { isEmpty } from "./helpers";

export const initialProductDirtyFieldState: DirtyFieldState<ProductFormFields> = {
  productName: false,
  productPrice: false,
  productCategory: false,
  productDescription: false,
  productQuantity: false,
  productImage: false,
};

interface ValidateFileFieldProps {
  file: File | null | undefined;
  fileName: string;
  fieldName: keyof ProductFormFileField;
}

/**
 * Only validate string form fields which means it only takes these arguments:
 *
 * **This function does not validate file fields**
 *
 * @param productName
 * @param productPrice
 * @param productCategory
 * @param productDescription
 *
 * @returns Object with error message for the `ProductFormStringFields` type.
 */

export function validateProductFormStringFields({
  productName,
  productPrice,
  productCategory,
  productDescription,
  productQuantity,
}: ProductFormStringFields): Partial<ProductStringFormValidationReturnType> {
  const errors: Partial<ProductFormStringFields> = {};

  if (isEmpty(productName)) errors.productName = "This field cannot be empty";

  if (isEmpty(productPrice)) {
    errors.productPrice = "This field cannot be empty";
  } else if (isNaN(parseFloat(productPrice))) {
    errors.productPrice = "Price has to be a valid number";
  } else if (parseFloat(productPrice) < 0) {
    errors.productPrice = "Price has to be a positive value";
  }

  if (isEmpty(productCategory)) errors.productCategory = "This field cannot be empty";
  if (isEmpty(productDescription)) errors.productDescription = "This field cannot be empty";

  if (isEmpty(productQuantity)) {
    errors.productQuantity = "This field cannot be empty";
  } else if (isNaN(parseFloat(productQuantity))) {
    errors.productQuantity = "Quantity has to be a valid number";
  } else if (parseFloat(productQuantity) <= 0) {
    errors.productQuantity = "Quantity has to be a greater than zero";
  }

  return errors;
}

/**
 * Only validates file fields.
 *
 * @param file File to be validated.
 * @param message Error message to be displayed.
 *
 * @returns Object with error message for file field only.
 */

export function validateFileField({
  file,
  fileName,
  fieldName,
}: ValidateFileFieldProps): Partial<ProductFileFormValidationReturnType> {
  if (!file && !fileName) return { [fieldName]: "Image must be uploaded" };
  return {};
}
