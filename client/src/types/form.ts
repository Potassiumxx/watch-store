// type definition for forms that uses dirty fields
import { GENERAL_ERROR_KEY } from "../utils/constants";

export interface DirtyFieldState {
  [key: string]: boolean;
}

export type APIErrorReturnType<T> = T & {
  [GENERAL_ERROR_KEY]?: string;
};
