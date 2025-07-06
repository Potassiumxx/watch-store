// type definition for forms that uses dirty fields
import { GENERAL_ERROR_KEY } from "../utils/constants";

/**
 * Represents the "dirty" state of form fields used in validation.
 *
 * - Each key is a field name (as a string), and the value is a boolean indicating whether the field has been interacted with.
 * - This type is intentionally generic and flexible, allowing it to be used with any form shape.
 */
export type DirtyFieldState<T> = {
  [key in keyof T]: boolean;
};

/**
 * Represents the shape of API error responses for forms.
 * - Contains field-specific errors of type `T` (e.g., email, password).
 * - May also include a general error message under the `[GENERAL_ERROR_KEY]` key (e.g., for network or unknown server errors).
 */
export type APIErrorReturnType<T> = T & {
  [GENERAL_ERROR_KEY]?: string;
};

export interface LoginFields {
  email?: string;
  password?: string;
}

export interface RegisterFields extends Partial<LoginFields> {
  username?: string;
}

export interface DecodedJWT {
  /**
   * **sub is 'id' of the user**
   */
  sub: string;
  email: string;
  username: string;
}

export interface LoginAndRegisterResponse {
  token: string;
}

/**
 * Represents shape of product form fields that stores string values only.
 */
export interface ProductFormStringFields {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
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

export type ProductFormFields = ProductFormStringFields & ProductFormFileField;

export interface ProductFormResponse {
  message: string;
}
