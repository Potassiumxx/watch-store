// type definition for forms that uses dirty fields
import { GENERAL_ERROR_KEY } from "../utils/constants";

interface FormFieldStructure {
  [key: string]: string;
}

export interface DirtyFieldState {
  [key: string]: boolean;
}

export type APIErrorReturnType<T> = T & {
  [GENERAL_ERROR_KEY]?: string;
};

export interface LoginFields extends Partial<FormFieldStructure> {
  email?: string;
  password?: string;
}

export interface RegisterField extends Partial<LoginFields> {
  username?: string;
}
