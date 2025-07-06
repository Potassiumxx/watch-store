import {
  ProductFormStringFields,
  ProductStringFormValidationReturnType,
  ProductFileFormValidationReturnType,
} from "../types/form";

import { isEmpty } from "./helpers";

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

export function validateAddProductForm({
  productName,
  productPrice,
  productCategory,
  productDescription,
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

export function validateFileField(
  file: File | null | undefined,
  fieldName: string
): Partial<ProductFileFormValidationReturnType> {
  if (!file) return { [fieldName]: "Image must be uploaded" };
  return {};
}
