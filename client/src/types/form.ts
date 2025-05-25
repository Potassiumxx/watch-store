// type definition for forms that uses dirty fields
import { GENERAL_ERROR_KEY } from "../utils/constants";

/**
 * Represents the "dirty" state of form fields used in validation.
 *
 * - Each key is a field name (as a string), and the value is a boolean indicating whether the field has been interacted with.
 * - This interface is intentionally generic and flexible, allowing it to be used with any form shape.
 */
export interface DirtyFieldState {
  [key: string]: boolean;
}

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

export interface LoginResponse {
  id: number;
  email: string;
  username: string;
}
